import { defineStore } from 'pinia'
import { authClient, axiosIns } from '@/services/axios'
import axios from 'axios'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useAuthStore = defineStore('auth', {
  state: () => ({
    /* User */
    user: null,
    form: {
      nip: '1',
      password: '123456',
    },
    isLoading: false,
  }),
  getters: {
    userData(state) {
      return state.user
    },
    guest() {
      const storageItem = window.localStorage.getItem('guest')
      if (!storageItem) return false
      if (storageItem === 'isGuest') return true
      if (storageItem === 'isNotGuest') return false
    },
  },
  actions: {
    async login() {
      try {
        this.isLoading = true
        const resp = await axiosIns.post('/api/login', this.form)
        if (resp.status == 201) {
          localStorage.setItem('token', resp.data.token)
          axiosIns.defaults.headers.common['Authorization'] = `Bearer ${resp.data.token}`
          toast.success('Login sukses', {
            timeout: 3000,
          })
          return true
        }
      } catch (error) {
        console.info(error)
        toast.error(error.message, {
          timeout: 3000,
        })
        return false
      } finally {
        this.isLoading = false
      }
    },
    async getAuthUser() {
      try {
        const respo = await axiosIns.get(`/api/auth/user`)
        this.user = respo.data
        return respo.data
      } catch (error) {
      } finally {
        this.isLoading = false
      }
      return false
    },
    async logout() {
      this.isLoading = true
      try {
        const response = await axiosIns.post(`/api/logout`)
        if (response.status == 200) {
          this.user = null
          return true
        } else {
          return false
        }
      } catch (error) {
        alert(error)
      } finally {
        this.isLoading = false
      }
    },
  },
})
