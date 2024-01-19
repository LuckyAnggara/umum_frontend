/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
import { axiosIns } from '@/services/axios'
import { useToast } from 'vue-toastification'
import { shallowRef } from 'vue'

const toast = useToast()
export const usePersediaanStore = defineStore('persediaan', {
  state: () => ({
    validNama: null,
    responses: null,
    singleResponses: {
      nama: null,
      satuan: null,
      saldo: 0,
      image: null,
    },
    originalSingleResponses: {
      nama: null,
      satuan: null,
      saldo: 0,
      image: null,
    },
    isUpdateLoading: false,
    isLoading: false,
    isStoreLoading: false,
    isUpdateLoading: false,
    isDestroyLoading: false,
    userData: null,
    upload: {
      file: null,
    },
    form: {
      nama: null,
      satuan: null,
      saldo: 0,
    },
    filter: {
      date: [],
      currentLimit: 10,
      searchQuery: '',
      page: '',
    },
  }),
  getters: {
    items(state) {
      return state.responses?.data ?? []
    },
    currentPage(state) {
      return state.responses?.current_page
    },
    pageLength(state) {
      return Math.round(state.responses?.total / state.responses?.per_page)
    },
    lastPage(state) {
      return state.responses?.last_page
    },
    from(state) {
      return state.responses?.from
    },
    to(state) {
      return state.responses?.to
    },
    total(state) {
      return state.responses?.total
    },
    dateQuery(state) {
      if (state.filter.date.length == 0 || state.filter.date.length == null) {
        return ''
      }
      return '&start-date=' + state.filter.date[0] + '&end-date=' + state.filter.date[1]
    },
    searchQuery(state) {
      if (state.filter.searchQuery == '' || state.filter.searchQuery == null) {
        return ''
      }
      return '&query=' + state.filter.searchQuery
    },
    pageQuery(state) {
      if (state.filter.page == '' || state.filter.page == null) {
        return ''
      }
      return '&page=' + state.filter.page
    },
  },
  actions: {
    async getData(page = '') {
      this.isLoading = true
      try {
        const response = await axiosIns.get(`/api/inventory?limit=${this.filter.currentLimit}${this.pageQuery}${this.searchQuery}${this.dateQuery}`)
        this.responses = response.data.data
      } catch (error) {
        alert(error.message)
      } finally {
        this.isLoading = false
      }
      return false
    },
    async getDataUser(page = '') {
      this.isLoading = true
      try {
        const response = await axiosIns.get(`/api/inventory/get?limit=${this.filter.currentLimit}${this.pageQuery}${this.searchQuery}${this.dateQuery}`)
        this.responses = response.data.data
      } catch (error) {
        alert(error.message)
      } finally {
        this.isLoading = false
      }
      return false
    },
    async store({ uploadFile = null }) {
      // if (uploadFile !== null) {
      let formData = new FormData()
      formData.append('file', uploadFile)
      formData.append('nama', this.form.nama)
      formData.append('satuan', this.form.satuan)
      formData.append('saldo', this.form.saldo)
      // }
      this.isStoreLoading = true
      try {
        const response = await axiosIns.post(`/api/inventory`, uploadFile ? formData : this.form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        if (response.status == 200) {
          return true
        } else {
          return false
        }
      } catch (error) {
        alert(error)
      } finally {
        this.isStoreLoading = false
      }
    },
    async destroy(id) {
      this.isDestroyLoading = true
      setTimeout(() => {}, 500)
      try {
        const response = await axiosIns.delete(`/api/inventory/${id}`)
        if (response.status == 200) {
          const index = this.items.findIndex((item) => item.id === id)
          this.responses.data.splice(index, 1)
          return true
        } else {
          return false
        }
      } catch (error) {
        alert(error)
      } finally {
        this.isDestroyLoading = false
      }
    },
    show(item) {
      this.singleResponses = JSON.parse(JSON.stringify(item))
      this.originalSingleResponses = JSON.parse(JSON.stringify(item))
    },
    async update({ uploadFile = null }) {
      // if (uploadFile !== null) {
      let formData = new FormData()
      formData.append('file', uploadFile)
      formData.append('_method', 'put')
      formData.append('nama', this.singleResponses.nama)
      formData.append('satuan', this.singleResponses.satuan)
      formData.append('saldo', this.singleResponses.saldo)
      // }
      this.isUpdateLoading = true
      try {
        const response = await axiosIns.post(`/api/inventory/${this.singleResponses.id}`, formData)
        if (response.status == 200) {
          return true
        } else {
          return false
        }
      } catch (error) {
        alert(error)
      } finally {
        this.isUpdateLoading = false
      }
    },
    clearForm() {
      this.form = {
        name: null,
        satuan: null,
        saldo: 0,
      }
    },
    async cekNama() {
      const response = await axiosIns.get(`/api/persediaan/cek-nama?query=${this.form.nama}`)
      this.validNama = response.data
    },
  },
})
