import jwtDecode from 'jwt-decode'
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
const onSilentRefresh = () => {
  axios
    .post('/silent-refresh', data)
    .then(onLoginSuccess)
    .catch((error) => {
      // ... 로그인 실패 처리
    })
}
const setAuth = (accessToken: string | null) => {
  const JWT_EXPIRY_TIME = 24 * 3600 * 1000
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken)
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`

    setTimeout(onSilentRefresh, JWT_EXPIRRY_TIME - 60000)
  } else {
    localStorage.removeItem('accessToken')
    delete axios.defaults.headers.common.Authorization
  }
}

export { isValidToken, setAuth }
