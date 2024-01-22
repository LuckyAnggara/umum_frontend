/* eslint-disable no-unused-vars */
import { defineStore } from 'pinia'
import { axiosIns } from '@/services/axios'
import { toast } from 'vue3-toastify'
import moment from 'moment'

export const usePermintaanPersediaanStore = defineStore('permintaanPersediaan', {
  state: () => ({
    responses: null,
    singleResponses: null,
    originalSingleResponses: null,
    isUpdateLoading: false,
    isLoading: false,
    isStoreLoading: false,
    isUpdateLoading: false,
    objectStore: {},
    isDestroyLoading: false,
    selectAll: true,
    form: {
      nip: null,
      nama: null,
      unit: null,
      catatan: null,
      tanggal: moment().format('DD MMMM YYYY'),
      detail: [],
    },
    filter: {
      date: null,
      currentLimit: 10,
      searchQuery: '',
      status: '',
      page: '',
    },
  }),
  getters: {
    items(state) {
      return state.responses?.data ?? []
    },
    detail(state) {
      state.singleResponses.detail.forEach((x) => {
        x.confirm_permintaan = x.jumlah
      })
      return state.singleResponses.detail
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
    statusQuery(state) {
      if (state.filter.status == 0 || state.filter.status == null) {
        return ''
      }
      return '&status=' + state.filter.status
    },
    dateQuery(state) {
      if (state.filter.date == '' || state.filter.date == null) {
        return ''
      }
      return '&date=' + state.filter.date
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
        const response = await axiosIns.get(
          `/api/permintaan-persediaan?limit=${this.filter.currentLimit}${this.pageQuery}${this.searchQuery}${this.dateQuery}${this.statusQuery}`
        )
        this.responses = response.data.data
      } catch (error) {
        alert(error.message)
      } finally {
        this.isLoading = false
      }
      return false
    },
    async store() {
      this.isStoreLoading = true
      try {
        const response = await axiosIns.post(`/api/permintaan-persediaan`, this.form)
        if (response.status == 200) {
          return {
            status: true,
            data: response.data.data,
          }
        } else {
          return {
            status: false,
            data: null,
          }
        }
      } catch (error) {
        alert(error)
      } finally {
        this.isStoreLoading = false
      }
    },
    async show(id = '') {
      this.isLoading = true
      try {
        const response = await axiosIns.get(`/api/permintaan-persediaan/${id}`)
        this.singleResponses = JSON.parse(JSON.stringify(response.data.data))
        this.originalSingleResponses = JSON.parse(JSON.stringify(response.data.data))
      } catch (error) {
        alert(error)
      }
      this.isLoading = false
    },
    async destroy(id) {
      this.isDestroyLoading = true
      setTimeout(() => {}, 500)
      try {
        const response = await axiosIns.delete(`/api/permintaan-persediaan/${id}`)
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
    async update({ status = 'APPROVE' }) {
      let form = {
        status: status,
        detail: this.singleResponses.detail,
      }
      try {
        const response = await axiosIns.patch(`/api/permintaan-persediaan/${this.singleResponses.id}`, form)
        if (response.status == 200) {
          console.info(response)
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
    addCart({ item, qty }) {
      item.qty = qty
      if (!this.checkItem(item.id)) {
        let a = this.form.detail
        this.form.detail.push(item)
        toast.success('Item baru ditambahkan', {
          autoClose: 500,
          position: toast.POSITION.BOTTOM_CENTER,
        })
      } else {
        const b = this.form.detail.findIndex((i) => (i.id = item.id))
        this.form.detail[b].qty++
      }
    },
    removeCart(index) {
      this.form.detail.splice(index, 1)
    },
    clearCart() {
      this.form.detail = []
    },
    checkItem(id) {
      const b = this.form.detail.find((e) => e.id == id)
      if (b) {
        return true
      }
      return false
    },
    setDataPegawai(item) {
      this.form.nama = item.name
      this.form.unit = item.unit?.name
    },
    checkAll() {
      this.detail.forEach((item) => {
        item.checked = this.selectAll
      })
    },
    checkSingle() {
      this.selectAll = this.detail.every((item) => item.checked)
    },
  },
})
