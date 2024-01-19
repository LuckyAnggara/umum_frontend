import axios from 'axios'
// import { useAuthStore } from '@/stores/auth'

export const axiosIns = axios.create({
  // baseURL: 'http://127.0.0.1:8000',
  baseURL: 'http://192.168.16.128:8000',
  withCredentials: true,
  // withXSRFToken: true,
  // baseURL: "https://www.lapkin.bbmakmur.com/api/",
  // baseURL: "http://192.168.16.128:8000/api",
})

export const authClient = axios.create({
  // baseURL: 'http://127.0.0.1:8000',
  baseURL: 'http://192.168.16.128:8000',
  withCredentials: true, // required to handle the CSRF token
})

axiosIns.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  } else {
  }
  return config
})

export default axiosIns
