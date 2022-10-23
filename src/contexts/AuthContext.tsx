import { createContext, ReactNode, useEffect, useReducer } from 'react'
// utils
import axios from '../utils/axios'
import { isValidToken, setSession } from '../utils/jwt'
// @types
import { ActionMap, AuthState, AuthUser, JWTContextType } from '../types/auth'

const LoginTypes = {
  Initial: 'INITIALIZE',
  Login: 'LOGIN',
  Logout: 'LOGOUT',
  Register: 'REGISTER',
} as const
type LoginTypes = typeof LoginTypes[keyof typeof LoginTypes]

type JWTAuthPayload = {
  [LoginTypes.Initial]: {
    isAuthenticated: boolean
    user: AuthUser
  }
  [LoginTypes.Login]: {
    user: AuthUser
  }
  [LoginTypes.Logout]: undefined
  [LoginTypes.Register]: {
    user: AuthUser
  }
}

export type JWTActions = ActionMap<JWTAuthPayload>[keyof ActionMap<JWTAuthPayload>]

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
}

const JWTReducer = (state: AuthState, action: JWTActions) => {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
      }
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
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
        const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : ''
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken)
          const response = await axios.get('/api/account/user')

          const { user } = response.data

          dispatch({
            type: LoginTypes.Initial,
            payload: {
              isAuthenticated: true,
              user,
            },
          })
        } else {
          dispatch({
            type: LoginTypes.Initial,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          })
        }
      } catch (err) {
        console.error(err)
        dispatch({
          type: LoginTypes.Initial,
          payload: {
            isAuthenticated: false,
            user: null,
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
    const { accessToken, user } = response.data

    setSession(accessToken)

    dispatch({
      type: LoginTypes.Login,
      payload: {
        user,
      },
    })
  }

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    const response = await axios.post('/api/account/register', {
      email,
      password,
      firstName,
      lastName,
    })
    const { accessToken, user } = response.data

    localStorage.setItem('accessToken', accessToken)

    dispatch({
      type: LoginTypes.Register,
      payload: {
        user,
      },
    })
  }

  const logout = async () => {
    setSession(null)
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
