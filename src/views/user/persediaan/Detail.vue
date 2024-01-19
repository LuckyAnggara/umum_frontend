<template>
  <section v-if="permintaanPersediaanStore.singleResponses == null">
    <span class="flex"><ArrowPathIcon class="mx-auto w-6 h-6 animate-spin" /></span>
  </section>
  <section v-else>
    <div class="max-w-md mx-auto px-6 py-8 md:max-w-lg">
      <div class="flex items-center">
        <h2 class="ml-2 font-semibold text-gray-800 text-xl">Nomor Tiket : {{ permintaanPersediaanStore.singleResponses.tiket }}</h2>
      </div>

      <div class="mt-4 bg-white rounded-lg overflow-hidden border border-gray-400">
        <div class="px-4 py-2 border-b border-gray-200 flex flex-row">
          <h2 class="font-semibold text-gray-800">Status</h2>
          <span
            v-if="permintaanPersediaanStore.singleResponses.status == 'ORDER'"
            class="ml-4 bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
            >{{ permintaanPersediaanStore.singleResponses.status }}</span
          >
          <span
            v-else-if="permintaanPersediaanStore.singleResponses.status == 'DONE'"
            class="ml-4 bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
            >{{ permintaanPersediaanStore.singleResponses.status }}</span
          >
          <span
            v-else-if="permintaanPersediaanStore.singleResponses.status == 'PROCESS'"
            class="ml-4 bg-orange-100 text-orange-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-orange-900 dark:text-orange-300"
            >{{ permintaanPersediaanStore.singleResponses.status }}</span
          >
          <span v-else class="bg-red-100 ml-4 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">REJECTED</span>
        </div>
      </div>

      <div class="mt-4 bg-white rounded-lg overflow-hidden border border-gray-400">
        <div class="px-4 py-2 border-b border-gray-200">
          <h2 class="font-semibold text-gray-800">Daftar Permintaan</h2>
        </div>
        <div class="flex flex-col divide-y divide-gray-200">
          <div v-for="(item, index) in permintaanPersediaanStore.singleResponses?.detail" class="flex items-center py-4 px-6" :key="item.id">
            <img class="w-24 h-24 object-cover rounded" :src="showImage(item.persediaan)" alt="Product Image" />
            <div class="ml-5">
              <h3 class="text-gray-900 font-semibold">{{ item.persediaan.nama }}</h3>
              <div class="flex mt-4">
                <p>{{ item.jumlah }}</p>

                <p class="text-gray-700 ml-2">{{ item.persediaan.satuan }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form autocomplete="off" class="mt-4 bg-white rounded-lg overflow-hidden border border-gray-400" @submit.prevent="confirm()">
        <div class="px-4 py-2 border-b border-gray-200">
          <h2 class="font-semibold text-gray-800">Detail Pemohon</h2>
        </div>
        <div class="flex flex-col divide-y divide-gray-200">
          <div class="p-4 flex flex-col space-y-2">
            <div class="flex flex-row space-x-2 text-sm font-medium text-gray-900 dark:text-white">
              <label class="">Tanggal</label>
              <span>{{ permintaanPersediaanStore.singleResponses.created_at }}</span>
            </div>
            <div>
              <label for="nip" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">NIP</label>

              <input
                readonly
                v-model="permintaanPersediaanStore.singleResponses.nip"
                @keyup="search"
                type="text"
                id="nip"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="kosongkan jika tidak punya nip"
              />
            </div>
            <div>
              <label for="nama" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama</label>
              <input
                readonly
                v-model="permintaanPersediaanStore.singleResponses.nama"
                type="text"
                id="nama"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label for="unit" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Unit</label>
              <input
                readonly
                v-model="permintaanPersediaanStore.singleResponses.unit"
                type="text"
                id="unit"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label for="catatan" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Catatan</label>
              <textarea
                readonly
                v-model="permintaanPersediaanStore.singleResponses.catatan"
                type="text"
                placeholder="isikan dengan catatan untuk admin jika ada"
                id="catatan"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></textarea>
            </div>
          </div>
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
                  <DialogPanel
                    class="w-full max-w-md transsingleResponses overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                  >
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
  </section>
</template>

<script setup>
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { ArrowLeftIcon, ArrowPathIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { useDebounceFn } from '@vueuse/core'
import { usePermintaanPersediaanStore } from '@/stores/permintaanPersediaan'
import { useRoute, useRouter } from 'vue-router'
import { storageUrl } from '@/services/helper'
import { toast } from 'vue3-toastify'
import { computed, onMounted, ref } from 'vue'

const permintaanPersediaanStore = usePermintaanPersediaanStore()
const showModal = ref(false)

const route = useRoute()
const router = useRouter()
function toList() {
  router.push({ name: 'permintaan-user' })
}

function deleteItem(index) {
  permintaanPersediaanStore.removeCart(index)
}

async function cariPegawai() {
  const id = toast.loading('Cari data...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })
  try {
    const response = await fetch(`https://lapkin.bbmakmur.com/api/employee-show/${permintaanPersediaanStore.singleResponses.nip}`)
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

          console.info(data)
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
  }
}

function confirm() {
  showModal.value = true
}

const id = computed(() => {
  return route.params.id ?? null
})

async function submit() {
  const id = toast.loading('Permintaan sedang di proses...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })

  const success = await permintaanPersediaanStore.store()
  if (success) {
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

onMounted(async () => {
  await permintaanPersediaanStore.show(id.value)
})
</script>
