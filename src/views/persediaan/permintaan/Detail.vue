<template>
  <section v-if="permintaanPersediaanStore.singleResponses == null">
    <span class="flex"><ArrowPathIcon class="mx-auto w-6 h-6 animate-spin" /></span>
  </section>
  <section v-else class="px-16 flex flex-col space-y-4 py-5 bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-row justify-between">
      <div class="flex flex-col">
        <div class="flex flex-row items-center">
          <span class="font-semibold text-3xl text-gray-600">Tiket #</span>
          <span class="font-semibold text-3xl text-gray-600">{{ permintaanPersediaanStore.singleResponses.tiket }}</span>
          <div class="ml-2">
            <span
              v-if="permintaanPersediaanStore.singleResponses.status == 'ORDER'"
              class="bg-blue-100 text-blue-800 text-md font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
              >{{ permintaanPersediaanStore.singleResponses.status }}</span
            >
            <span
              v-else-if="permintaanPersediaanStore.singleResponses.status == 'DONE'"
              class="bg-green-100 text-green-800 text-md font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
              >{{ permintaanPersediaanStore.singleResponses.status }}</span
            >
            <span
              v-else-if="permintaanPersediaanStore.singleResponses.status == 'PROCESS'"
              class="bg-green-100 text-orange-800 text-md font-medium px-2.5 py-0.5 rounded dark:bg-orange-900 dark:text-orange-300"
              >{{ permintaanPersediaanStore.singleResponses.status }}</span
            >
            <span v-else class="bg-red-100 text-red-800 text-md font-medium px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">REJECTED</span>
          </div>
        </div>
        <span class="text-lg text-gray-400 mt-1">{{ permintaanPersediaanStore.singleResponses.created_at }}</span>
      </div>

      <div class="flex flex-row place-self-end">
        <button
          type="button"
          class="w-24 text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
        >
          Approve
        </button>

        <button
          type="button"
          class="w-24 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800"
        >
          Reject
        </button>
      </div>
    </div>

    <div class="flex flex-row space-x-8">
      <div class="w-3/4 flex flex-col space-y-8">
        <!-- Start coding here -->
        <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-visible">
          <div class="flex flex-col w-2/3 md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <span class="text-gray-700 text-xl font-semibold">Detail Permintaan</span>
          </div>
          <div class="overflow-y-visible w-full scrollbar-thin scrollbar-track-gray-500 scrollbar-thumb-gray-700">
            <table class="lg:w-full min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-4 py-3">
                    <input
                      v-model="permintaanPersediaanStore.selectAll"
                      @change="permintaanPersediaanStore.checkAll"
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </th>
                  <th scope="col" class="px-2 py-3">Barang</th>
                  <th scope="col" class="px-4 py-3">Saldo Persediaan</th>
                  <th scope="col" class="px-4 py-3">Jumlah Permintaan</th>
                  <th scope="col" class="px-4 py-3">Konfirmasi Permintaan</th>
                  <th scope="col" class="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="permintaanPersediaanStore.isLoading">
                  <td colspan="6" class="text-center">
                    <span class=""><ArrowPathIcon class="w-6 h-6 animate-spin mx-auto" /></span>
                  </td>
                </tr>
                <tr v-else-if="!permintaanPersediaanStore.isLoading && permintaanPersediaanStore.singleResponses.detail.length < 1">
                  <td colspan="6" class="text-center">No Data</td>
                </tr>
                <tr
                  v-else
                  v-for="(item, index) in permintaanPersediaanStore.detail"
                  :key="index"
                  class="odd:bg-white odd:dark:bg-gray-900 odd:dark:border-gray-700 even:bg-gray-50 even:dark:bg-gray-800 even:dark:border-gray-700 border-b"
                >
                  <td class="px-4 py-1">
                    <input
                      @change="permintaanPersediaanStore.checkSingle"
                      id="default-checkbox"
                      type="checkbox"
                      v-model="item.checked"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </td>
                  <td class="px-2 py-1">
                    <div class="flex flex-row space-x-2 items-center">
                      <img class="w-16 h-16" :src="showImage(item.persediaan)" />
                      <span class="font-bold">
                        {{ item.persediaan.nama }}
                      </span>
                    </div>
                  </td>
                  <td class="px-4 py-1">{{ item.persediaan.saldo }} {{ item.persediaan.satuan }}</td>
                  <td class="px-4 py-1">{{ item.jumlah }} {{ item.persediaan.satuan }}</td>

                  <td class="px-4 py-1">
                    <div class="flex flex-row space-x-4 items-center">
                      <input
                        v-model="item.confirm_permintaan"
                        type="number"
                        id="nama"
                        class="bg-gray-50 border w-1/3 border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                      <span>
                        {{ item.persediaan.satuan }}
                      </span>
                    </div>
                  </td>
                  <td class="px-4 py-1">
                    <span
                      v-if="item.confirm_permintaan <= item.persediaan.saldo"
                      class="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                      >STOK TERSEDIA</span
                    >

                    <span v-else class="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"
                      >STOK KURANG</span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
            <div class="w-full flex flex-row justify-end">
              <span class="font-semibold">Total </span>
              <span class="mx-4">: </span>
              <span class="font-semibold"> 10 Item </span>
            </div>
          </nav>
        </div>

        <div class="bg-white dark:bg-gray-800 relative shadow-md rounded-lg">
          <div class="flex flex-col w-2/3 md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <span class="text-gray-700 text-xl font-semibold">Activity</span>
          </div>
          <div class="p-6 mb-3">
            <ol class="relative border-s border-gray-200 dark:border-gray-700">
              <li v-for="(log, index) in permintaanPersediaanStore.singleResponses.log" :key="index" class="mb-10 ms-6">
                <span
                  class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"
                >
                  <svg
                    class="w-2.5 h-2.5 text-blue-800 dark:text-blue-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
                    />
                  </svg>
                </span>
                <h3 class="mb-1 text-lg font-semibold text-gray-900 dark:text-white">{{ log.status }}</h3>
                <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Tanggal {{ log.created_at }}</time>
                <p class="text-base font-normal text-gray-500 dark:text-gray-400">
                  {{ log.catatan }}
                </p>
                <p class="text-sm font-normal text-gray-500 dark:text-gray-400">oleh : {{ log.created_by }}</p>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <div class="w-1/4">
        <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-visible py-4 px-6">
          <div class="flex flex-col md:flex-row items-center mb-4">
            <span class="text-gray-700 text-xl font-semibold">Detail Pemohon</span>
          </div>
          <div class="flex flex-col space-y-2 mb-3">
            <div class="flex flex-col">
              <label class="font-bold">Nama</label>
              <span class="">{{ permintaanPersediaanStore.singleResponses.nama }}</span>
              <span v-if="permintaanPersediaanStore.singleResponses.nip !== ''" class="text-md font-thin text-gray-600">
                NIP <span>{{ permintaanPersediaanStore.singleResponses.nip }}</span></span
              >
            </div>
            <div class="flex flex-col">
              <label class="font-bold">Unit Pemohon</label>
              <span> {{ permintaanPersediaanStore.singleResponses.unit }}</span>
            </div>
            <div class="flex flex-col">
              <label class="font-bold">Catatan</label>
              <span> {{ permintaanPersediaanStore.singleResponses.catatan }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <DeleteDialog :show="confirmDialog" @submit="deleteData" @close="confirmDialog = !confirmDialog" />
  </section>
</template>

<script setup>
import DeleteDialog from '@/components/DeleteDialog.vue'

import { usePermintaanPersediaanStore } from '@/stores/permintaanPersediaan'

import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { toast } from 'vue3-toastify'
import { storageUrl } from '@/services/helper'
import { ArrowPathIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const permintaanPersediaanStore = usePermintaanPersediaanStore()

const tiket = computed(() => {
  return route.params.tiket ?? null
})

function showImage(item) {
  if (item.image == null) return 'https://placehold.co/40x40'
  const a = storageUrl + 'storage/' + item.image
  return a
}

onMounted(async () => {
  await permintaanPersediaanStore.show(tiket.value)
})

const confirmDialog = ref(false)

function onDelete(item) {
  deleteId.value = item.id
  confirmDialog.value = true
}

async function deleteData() {
  confirmDialog.value = false
  const id = toast.loading('Hapus data...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })

  const success = await permintaanPersediaanStore.destroy(deleteId.value)
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
    toast.done(id)
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
}

async function update() {
  const id = toast.loading('Update data...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })

  const success = await permintaanPersediaanStore.update({ uploadFile: file.value })
  console.info(success)
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
    toast.done(id)
    detailDrawerShow.value = !detailDrawerShow.value
    permintaanPersediaanStore.getData()
    file.value = null
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
    file.value = null
  }
}
</script>
