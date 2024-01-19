import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    limitOptions: [
      {
        value: '10',
        label: '10',
      },
      {
        value: '25',
        label: '25',
      },
      {
        value: '50',
        label: '50',
      },
      {
        value: '100',
        label: '100',
      },
      {
        value: '1000000',
        label: 'Semua',
      },
    ],
    statusOptions: [
      {
        value: 'ORDER',
        label: 'ORDER',
      },
      {
        value: 'PROCESS',
        label: 'PROCESS',
      },
      {
        value: 'SUCCESS',
        label: 'SUCCESS',
      },
      {
        value: 'REJECTED',
        label: 'REJECTED',
      },
      {
        value: '',
        label: 'SEMUA',
      },
    ],
    form: {
      nip: '1',
      password: '123456',
    },
    isLoading: false,
  }),
})
