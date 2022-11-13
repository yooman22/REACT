export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

export type AuthUser = null | Record<string, any>
export type Token = null | string
export type AuthState = {
  isAuthenticated: boolean
  isInitialized: boolean
  user: AuthUser
  token: Token
}

export type AuthenticatedUser = {
  user: AuthUser
  accessToken: string
  refleshToken: string
}

export type JWTContextType = {
  isAuthenticated: boolean
  isInitialized: boolean
  token: string | null
  user: AuthUser
  method: 'jwt'
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, confirmPassword: string) => Promise<void>
  logout: () => Promise<void>
}
