// libraries
import jwtDecode from 'jwt-decode'
import Cookies from 'universal-cookie'
import axios from './axios'

// routes
import { PATH_AUTH } from '../routes'

const isValidRefleshToken = (refleshToken: string) => {
  if (!refleshToken) {
    return false
  }
  const decoded = jwtDecode<{ exp: number }>(refleshToken)

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

export const setRefreshToken = (refleshToken: string | null) => {
  const cookies = new Cookies()
  if (refleshToken) {
    cookies.set('refleshToken', refleshToken, { sameSite: 'strict' })
  } else {
    cookies.remove('refleshToken')
  }
}

export const setAccessToken = (accessToken: string | null) => {
  if (accessToken) {
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
  } else {
    delete axios.defaults.headers.common.Authorization
  }
}

const setAuth = (accessToken: string | null, refleshToken: string | null) => {
  //회원가입에 성공하는 경우  accessToken, relfeshToken 받는다.
  setAccessToken(accessToken)
  setRefreshToken(refleshToken)
}

export { isValidRefleshToken, setAuth }
