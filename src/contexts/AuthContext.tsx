import { createContext, ReactNode, useEffect, useReducer } from 'react'
// utils
import axios from '../utils/axios'
import { isValidRefleshToken, setAccessToken, setAuth } from '../utils/jwt'
// @types
import { ActionMap, AuthenticatedUser, AuthState, AuthUser, JWTContextType } from '../types/auth'
import { PATH_AUTH } from 'src/routes'

const LoginTypes = {
  Initial: 'INITIALIZE',
  Login: 'LOGIN',
  Logout: 'LOGOUT',
  Register: 'REGISTER',
} as const

const AuthTypes = {
  SetToken: 'SET_TOKEN',
  GetToken: 'GET_TOKEN',
} as const

type LoginTypes = typeof LoginTypes[keyof typeof LoginTypes]
type AuthTypes = typeof AuthTypes[keyof typeof AuthTypes]

type JWTAuthPayload = {
  [LoginTypes.Initial]: {
    isAuthenticated: boolean
    user: AuthUser
    token: string | null
  }
  [LoginTypes.Login]: {
    isAuthenticated: boolean
    user: AuthUser
    token: string
  }
  [LoginTypes.Logout]: undefined

  [LoginTypes.Register]: {
    isAuthenticated: boolean
    user: AuthUser
    token: string
  }
  [AuthTypes.SetToken]: {
    token: string
  }
  [AuthTypes.GetToken]: {
    token: string
  }
}

export type JWTActions = ActionMap<JWTAuthPayload>[keyof ActionMap<JWTAuthPayload>]

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  token: null,
}

const JWTReducer = (state: AuthState, action: JWTActions) => {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
        token: action.payload.token,
      }
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      }
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      }

    case 'REGISTER':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      }
    case 'SET_TOKEN':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      }
    case 'GET_TOKEN':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      }
    default:
      return state
  }
}

const AuthContext = createContext<JWTContextType | null>(null)

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(JWTReducer, initialState)

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = typeof window !== 'undefined' ? state.token : ''

        if (accessToken) {
          const response = await axios.get('/api/account/user')
          console.log(response)
          const { user } = response.data

          dispatch({
            type: LoginTypes.Initial,
            payload: {
              isAuthenticated: true,
              user,
              token: accessToken,
            },
          })
        } else {
          const response = await axios.get('/api/auth/token')
          const { accessToken } = response.data
          console.log(accessToken, 'asdasd')
          if (accessToken) {
            setAccessToken(accessToken)
            const response = await axios.get('/api/account/user')
            const { user } = response.data
            dispatch({
              type: LoginTypes.Initial,
              payload: {
                isAuthenticated: true,
                user: user,
                token: accessToken,
              },
            })
          }
        }
      } catch (err) {
        dispatch({
          type: LoginTypes.Initial,
          payload: {
            isAuthenticated: false,
            user: null,
            token: null,
          },
        })
      }
    }

    initialize()
  }, [])
  const login = async (email: string, password: string) => {
    console.log(email, password)
    const response = await axios.post('/api/account/login', {
      email,
      password,
    })
    const { accessToken, refleshToken, user } = response.data
    console.log('login', accessToken, refleshToken)
    setAuth(accessToken, refleshToken)

    dispatch({
      type: LoginTypes.Login,
      payload: {
        isAuthenticated: true,
        user,
        token: accessToken,
      },
    })
  }

  const register = async (email: string, password: string, confirmPassword: string) => {
    const {
      data: { accessToken, refleshToken, user },
    } = await axios.post<AuthenticatedUser>('/api/account/register', {
      email,
      password,
    })
    setAuth(accessToken, refleshToken)
    dispatch({
      type: LoginTypes.Register,
      payload: {
        isAuthenticated: true,
        user,
        token: accessToken,
      },
    })
    window.location.href = PATH_AUTH.login
  }

  const logout = async () => {
    dispatch({ type: LoginTypes.Logout })
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
