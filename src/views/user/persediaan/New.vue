<template>
  <div class="max-w-md mx-auto md:max-w-lg p-4">
    <div class="py-4 flex flex-row items-center justify-between">
      <button @click="toDashboard()" class="bg-transparent relative hover:-translate-x-1 duration-300 rounded-lg p-1.5 items-center">
        <ArrowLeftIcon class="h-5" />
      </button>
      <h5 class="items-center font-semibold uppercase py-2">Daftar Persediaan</h5>
      <button @click="toCart()" class="bg-transparent relative hover:-translate-y-1 duration-300 rounded-lg p-1.5 items-center">
        <ShoppingBagIcon class="h-8" />
        <span class="sr-only">Notifications</span>
        <div
          v-if="permintaanPersediaanStore.form.detail.length > 0"
          class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-1 -end-1 dark:border-gray-900"
        >
          {{ permintaanPersediaanStore.form.detail.length }}
        </div>
      </button>
    </div>
    <div class="flex items-center w-full my-4" autocomplete="off">
      <label for="simple-search" class="sr-only">Search</label>
      <div class="relative w-full">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <input
          @keyup="search"
          v-model="persediaanStore.filter.searchQuery"
          type="text"
          id="simple-search"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Cari data persediaan"
        />
      </div>
    </div>

    <template v-if="!persediaanStore.isLoading">
      <template v-if="persediaanStore.items.length > 0">
        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="item in persediaanStore.items"
            :key="item.id"
            @click="showModalItem(item)"
            class="p-6 cursor-pointer bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <div class="mb-4">
              <img class="w-full h-36 object-cover rounded" :src="showImage(item)" alt="Product Image" />
              <a>
                <h5 class="text-xl font-semibold mt-2 tracking-tight text-gray-900 dark:text-white">{{ item.nama }}</h5>
              </a>
            </div>
          </div>
        </div>
        <nav class="justify-end items-end flex mt-4">
          <ul class="inline-flex -space-x-px text-sm">
            <li @click="previousPage()">
              <a
                class="cursor-pointer flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >Previous</a
              >
            </li>
            <li @click="choosePage(num)" v-for="num in persediaanStore.lastPage" :key="num">
              <a
                :class="num == persediaanStore.currentPage ? 'text-blue-600 bg-blue-50' : 'text-gray-500'"
                class="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >{{ num }}</a
              >
            </li>
            <li @click="nextPage()">
              <a
                class="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >Next</a
              >
            </li>
          </ul>
        </nav>
      </template>
      <template v-else>
        <div class="w-full h-96 flex flex-col text-center text-gray-700">
          <span class="mx-auto"> Tidak ada data... </span>
        </div>
      </template>
    </template>
    <template v-else>
      <div class="w-full h-96 flex flex-col text-center text-gray-700">
        <ArrowPathIcon class="animate-spin h-6 w-6 mx-auto" />
        <span class="mx-auto"> Fetching data... </span>
      </div>
    </template>

    <div>
      <TransitionRoot appear :show="showModal" as="template">
        <Dialog as="div" @close="showModal = !showModal" class="relative z-50">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
              >
                <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 mb-2"> {{ itemShow.nama }} </DialogTitle>

                  <div class="flex items-center border-gray-100 mt-4">
                    <span class="my-2 text-sm mr-2">Jumlah</span>
                    <span class="cursor-pointer rounded-l bg-red-100 py-1 px-3.5 duration-100 hover:bg-red-500 hover:text-red-50" @click="qty--"> - </span>
                    <input class="h-8 w-8 border bg-white text-center text-xs outline-none" type="text" readonly v-model="qty" min="1" />
                    <span class="cursor-pointer rounded-r bg-blue-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50" @click="qty++"> + </span>
                  </div>
                  <button
                    type="button"
                    class="mt-4 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="addItem"
                  >
                    Tambah
                  </button>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </div>
  </div>
</template>

<script setup>
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { ArrowLeftIcon, ArrowPathIcon, ShoppingBagIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { useDebounceFn } from '@vueuse/core'
import { usePermintaanPersediaanStore } from '@/stores/permintaanPersediaan'
const permintaanPersediaanStore = usePermintaanPersediaanStore()

import { storageUrl } from '@/services/helper'
import { usePersediaanStore } from '@/stores/persediaan'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const persediaanStore = usePersediaanStore()
const showModal = ref(false)
const qty = ref(1)
const itemShow = ref({})
const router = useRouter()

function toCart() {
  router.push({ name: 'cart-permintaan-user' })
}

function toDashboard() {
  router.push({ name: 'dashboard-user' })
}

function showImage(item) {
  if (item.image == null) return 'https://placehold.co/40x40'
  const a = storageUrl + 'storage/' + item.image
  return a
}

function showModalItem(item) {
  qty.value = 1
  itemShow.value = item
  showModal.value = true
}

function addItem() {
  permintaanPersediaanStore.addCart({ item: itemShow.value, qty: qty.value })
  showModal.value = false
}

function choosePage(num) {
  persediaanStore.$patch((state) => {
    state.filter.page = num
  })
  persediaanStore.getDataUser()
}

function nextPage() {
  if (persediaanStore.filter.page == persediaanStore.lastPage) {
    return
  }

  persediaanStore.$patch((state) => {
    state.filter.page = persediaanStore.currentPage + 1
  })
  persediaanStore.getDataUser()
}

function previousPage() {
  if (persediaanStore.filter.page < 2) {
    return
  }
  persediaanStore.$patch((state) => {
    state.filter.page = persediaanStore.currentPage - 1
  })
  persediaanStore.getDataUser()
}

const search = useDebounceFn(() => {
  persediaanStore.getDataUser()
}, 500)

onMounted(() => {
  persediaanStore.getDataUser()
})
</script>
