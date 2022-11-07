import jwtDecode from 'jwt-decode'
import Cookies from 'universal-cookie'
// routes
import { PATH_AUTH } from '../routes'
//
import axios from './axios'

const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false
  }
  const decoded = jwtDecode<{ exp: number }>(accessToken)

  const currentTime = Date.now() / 1000

  return decoded.exp > currentTime
}

const handleTokenExpired = (exp: number) => {
  // eslint-disable-next-line prefer-const
  let expiredTimer

  const currentTime = Date.now()

  const timeLeft = exp * 1000 - currentTime

  clearTimeout(expiredTimer)

  expiredTimer = setTimeout(() => {
    alert('Token expired')

    localStorage.removeItem('accessToken')

    window.location.href = PATH_AUTH.login
  }, timeLeft)
}
// const onSilentRefresh = () => {
//   axios
//     .post('/silent-refresh', data)
//     .then(onLoginSuccess)
//     .catch((error) => {
//       // ... 로그인 실패 처리
//     })
// }

export const setRefreshTokenToCookie = (refresh_token: string | null) => {
  const cookies = new Cookies()
  cookies.set('refresh_token', refresh_token, { sameSite: 'strict' })
}
const setAuth = (accessToken: string | null, refleshToken: string | null) => {
  const JWT_EXPIRY_TIME = 24 * 3600 * 1000
  const cookies = new Cookies()
  if (accessToken) {
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    setRefreshTokenToCookie(refleshToken)
  } else {
    delete axios.defaults.headers.common.Authorization

    cookies.remove('refresh_token')
  }
}

export { isValidToken, setAuth }
