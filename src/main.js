import { createApp } from 'vue'
import './assets/style.css'
import App from './App.vue'
import router from './router'

import Vue3Toasity from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
// import VueQrcode from '@chenfengyuan/vue-qrcode'

import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)

app.use(Vue3Toasity, {
  theme: 'dark',
  type: 'default',
  dangerouslyHTMLString: true,
})

app.mount('#app')
