/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
import axiosIns from '@/services/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    /* User */
    form: {
      nip: null,
      password: null,
    },
    isLoading: false,
  }),
  getters: {},
  actions: {
    async login() {
      this.isLoading = true
      try {
        const response = await axiosIns.post(`/login`, {
          nip: this.form.nip,
          password: this.form.password,
        })

        if (response.status == 200) {
          return true
        }
      } catch (error) {
        alert(error.message)
      } finally {
        this.isLoading = false
      }
      return false
    },
    async logout() {
      this.isLoading = true
      try {
        const response = await axiosIns.get(`/logout`)
        if (response.status == 200) {
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
    isLoggedIn() {
      const user = localStorage.getItem('userDataLawas')
      if (user) {
        this.userData = JSON.parse(user)
        return true
      }
      return false
    },
  },
})
