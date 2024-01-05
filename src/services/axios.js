/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

import axios from 'axios'

// // Mendapatkan token CSRF dari meta tag
const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content

// // Mengatur header CSRF pada setiap permintaan
// axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

const axiosIns = axios.create({
  withCredentials: true,
  baseURL: 'http://127.0.0.1:8000/api/',
  // baseURL: "https://www.lapkin.bbmakmur.com/api/",
  // baseURL: "http://192.168.16.128:8000/api",
})

// axiosIns.interceptors.request.use((config) => {
//   const token = JSON.parse(localStorage.getItem('token'))
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//     config.headers['Content-Type'] = 'application/json'
//   }
//   return config
// })

export default axiosIns
