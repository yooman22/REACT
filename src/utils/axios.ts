import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL || '',
  headers: { 'Content-Type': 'application/json' },
})
axios.defaults.withCredentials = true

axios.interceptors.request.use((config) => {
  if (!config.headers) return config

  let token: string | null = null

  if (config.url === 'api/account/refleshToken') {
    token = localStorage.getItem('refreshToken')
  } else {
    token = localStorage.getItem('accessToken')
  }

  if (token !== null) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || '')
)

export default axiosInstance
