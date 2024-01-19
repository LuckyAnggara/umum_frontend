<template>
  <div class="max-w-md mx-auto px-6 py-8 md:max-w-lg">
    <div class="flex items-center">
      <button @click="toList()" class="bg-transparent relative hover:-translate-x-1 duration-300 rounded-lg p-1.5 items-center">
        <ArrowLeftIcon class="h-5" />
      </button>
      <h2 class="ml-2 font-semibold text-gray-800 text-xl">Keranjang Permintaan</h2>
    </div>
    <div class="mt-4 bg-white rounded-lg overflow-hidden border border-gray-400">
      <div class="px-4 py-2 border-b border-gray-200">
        <h2 class="font-semibold text-gray-800">Daftar</h2>
      </div>
      <div class="flex flex-col divide-y divide-gray-200">
        <div v-for="(item, index) in permintaanPersediaanStore.form.detail" class="flex items-center py-4 px-6" :key="item.id">
          <img class="w-24 h-24 object-cover rounded" :src="showImage(item)" alt="Product Image" />
          <div class="ml-3">
            <h3 class="text-gray-900 font-semibold">{{ item.nama }}</h3>
            <div class="flex mt-4">
              <span class="cursor-pointer rounded-l bg-red-100 py-1 px-3.5 duration-100 hover:bg-red-500 hover:text-red-50" @click="item.qty--"> - </span>
              <input class="h-8 w-12 bg-white text-center text-xs border-gray-100" type="text" readonly :value="item.qty" min="1" />
              <span class="cursor-pointer rounded-r bg-blue-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50" @click="item.qty++"> + </span>

              <p class="text-gray-700 ml-2">{{ item.satuan }}</p>
            </div>
          </div>
          <button
            @click="deleteItem(index)"
            type="button"
            class="ml-auto text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            <TrashIcon class="h-6 w-6" />
            <span class="sr-only">Icon description</span>
          </button>
        </div>
      </div>
      <div class="flex items-center justify-between px-6 py-3 bg-gray-100">
        <h3 class="text-gray-900 font-semibold">Total: {{ permintaanPersediaanStore.form.detail.length }} Item</h3>
        <button
          @click="permintaanPersediaanStore.clearCart"
          class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
        >
          Clear
        </button>
      </div>
    </div>

    <form autocomplete="off" class="mt-4 bg-white rounded-lg overflow-hidden border border-gray-400" @submit.prevent="confirm()">
      <div class="px-4 py-2 border-b border-gray-200">
        <h2 class="font-semibold text-gray-800">Data</h2>
      </div>
      <div class="flex flex-col divide-y divide-gray-200">
        <div class="p-4 flex flex-col space-y-2">
          <div class="flex flex-row space-x-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <label class="">Tanggal</label>
            <span>{{ permintaanPersediaanStore.form.tanggal }}</span>
          </div>
          <div>
            <label for="nip" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">NIP</label>
            <div class="relative">
              <input
                v-model="permintaanPersediaanStore.form.nip"
                @keyup="search"
                type="text"
                id="nip"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="kosongkan jika tidak punya nip"
              />
              <button
                @click="cariPegawai"
                type="button"
                class="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-gray-700 rounded-e-lg border border-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg v-if="!cariPegawaiLoading" class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span v-else><ArrowPathIcon class="mx-auto w-4 h-4 animate-spin" /></span>
              </button>
            </div>
          </div>
          <div>
            <label for="nama" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama</label>
            <input
              v-model="permintaanPersediaanStore.form.nama"
              type="text"
              id="nama"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label for="unit" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Unit</label>
            <input
              v-model="permintaanPersediaanStore.form.unit"
              type="text"
              id="unit"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label for="catatan" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Catatan</label>
            <textarea
              v-model="permintaanPersediaanStore.form.catatan"
              type="text"
              placeholder="isikan dengan catatan untuk admin jika ada"
              id="catatan"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></textarea>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between p-3 bg-gray-100">
        <h3 class="text-gray-900 font-semibold"></h3>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Confirm
        </button>
      </div>
    </form>

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
                  <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900"> Proses Permintaan </DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">Permintaan persediaan akan di proses ke Admin pada Bagian Umum Inspektorat Jenderal</p>
                  </div>

                  <div class="mt-4 flex space-x-4">
                    <button
                      :disabled="permintaanPersediaanStore.isStoreLoading"
                      type="button"
                      class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      @click="submit"
                    >
                      <span v-if="!permintaanPersediaanStore.isStoreLoading"> Proses </span>
                      <span class="flex" v-else><ArrowPathIcon class="mx-auto w-6 h-6 animate-spin" /></span>
                    </button>

                    <button
                      :disabled="permintaanPersediaanStore.isStoreLoading"
                      type="button"
                      class="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      @click="showModal = !showModal"
                    >
                      Batal!
                    </button>
                  </div>
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
import { ArrowLeftIcon, ArrowPathIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { useDebounceFn } from '@vueuse/core'
import { usePermintaanPersediaanStore } from '@/stores/permintaanPersediaan'
import { useRoute, useRouter } from 'vue-router'
import { storageUrl } from '@/services/helper'
import { toast } from 'vue3-toastify'
import { computed, ref } from 'vue'

const permintaanPersediaanStore = usePermintaanPersediaanStore()
const showModal = ref(false)
const cariPegawaiLoading = ref(false)
const route = useRoute()

const router = useRouter()
function toList() {
  router.push({ name: 'permintaan-user' })
}

function deleteItem(index) {
  permintaanPersediaanStore.removeCart(index)
}

async function cariPegawai() {
  cariPegawaiLoading.value = true
  const id = toast.loading('Cari data...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })
  try {
    const response = await fetch(`https://lapkin.bbmakmur.com/api/employee-show/${permintaanPersediaanStore.form.nip}`)
      .then((response) => {
        response.json().then((data) => {
          if (data.success == true) {
            toast.update(id, {
              render: 'Berhasil',
              position: toast.POSITION.BOTTOM_CENTER,
              type: 'success',
              autoClose: 1000,
              closeOnClick: true,
              closeButton: true,
              isLoading: false,
            })
            permintaanPersediaanStore.setDataPegawai(data.data)
          } else {
            toast.update(id, {
              render: 'tidak dapat ditemukan',
              position: toast.POSITION.BOTTOM_CENTER,
              type: 'error',
              autoClose: 1000,
              closeOnClick: true,
              closeButton: true,
              isLoading: false,
            })
          }
        })
      })
      .catch((err) => {
        console.error(err)
        toast.update(id, {
          render: 'terjadi kesalahan',
          position: toast.POSITION.BOTTOM_CENTER,
          type: 'error',
          autoClose: 1000,
          closeOnClick: true,
          closeButton: true,
          isLoading: false,
        })
      })
  } catch (error) {
    console.error(error)
  } finally {
    cariPegawaiLoading.value = false
  }
}

function confirm() {
  if (permintaanPersediaanStore.form.detail.length > 0) {
    showModal.value = true
  } else {
    toast.error('belum ada barang yang dipilih', { autoClose: 500, position: toast.POSITION.BOTTOM_CENTER })
  }
}

async function submit() {
  const id = toast.loading('Permintaan sedang di proses...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })

  const success = await permintaanPersediaanStore.store()
  if (success.status) {
    toast.update(id, {
      render: 'Berhasil !!',
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'success',
      autoClose: 1000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
    showModal.value = !showModal.value
    console.info(success.data)
    router.push({ name: 'output-permintaan-user', params: { tiket: success.data.tiket } })
  } else {
    toast.update(id, {
      render: 'Terjadi kesalahan',
      position: toast.POSITION.BOTTOM_CENTER,
      type: 'error',
      autoClose: 1000,
      closeOnClick: true,
      closeButton: true,
      isLoading: false,
    })
  }
  toast.done(id)
}

function showImage(item) {
  if (item.image == null) return 'https://placehold.co/40x40'
  const a = storageUrl + 'storage/' + item.image
  return a
}
</script>
