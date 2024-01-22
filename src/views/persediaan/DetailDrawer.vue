<template>
  <div
    :class="show == true ? 'translate-x' : '-translate-x-full'"
    class="mt-14 fixed top-0 left-0 z-40 w-full h-screen max-w-xs p-4 overflow-y-auto bg-white dark:bg-gray-800 transition-transform"
    tabindex="-1"
    aria-labelledby="drawer-label"
    aria-hidden="true"
  >
    <h5 id="drawer-label" class="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">Detail Product</h5>
    <button
      @click="emit('close')"
      type="button"
      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
    >
      <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <span class="sr-only">Close menu</span>
    </button>
    <div>
      <div class="space-y-4">
        <div v-if="persediaanStore.validNama" class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <span class="font-medium">Opps!</span> nama produk sudah ada, apa tetap akan di lanjutkan ?.
        </div>

        <div>
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama</label>
          <input
            v-model="persediaanStore.singleResponses.nama"
            @keyup="search"
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            required=""
            placeholder="isi dengan nama produk"
          />
        </div>
        <div>
          <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Satuan</label>
          <input
            v-model="persediaanStore.singleResponses.satuan"
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            required=""
            placeholder="isi dengan satuan produk"
          />
        </div>
        <div>
          <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Saldo</label>
          <input
            readonly
            v-model="persediaanStore.singleResponses.saldo"
            type="number"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            required=""
            placeholder="isi dengan saldo awal"
          />
          <small class="text-blue-600">Saldo hanya bisa dirubah melalui menu <i>Stock Opname</i></small>
        </div>
        <div v-if="persediaanStore.singleResponses.image">
          <div class="flex justify-between items-center">
            <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
            <button
              @click="deleteImage()"
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <TrashIcon class="h-6 w-6" />
              <span class="sr-only">Close menu</span>
            </button>
          </div>
          <div class="border p-4 rounded-lg">
            <img class="w-48 h-fit mx-auto" :src="showImage" />
          </div>
        </div>

        <div v-else>
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gambar</label>
          <FilePond :allow-mutiple="false" @fileChange="fileChange" />
        </div>
      </div>
      <div class="bottom-14 left-0 flex justify-center w-full pb-4 space-x-4 sm:absolute sm:px-4 sm:mt-0">
        <button
          type="button"
          @click="emit('submit')"
          class="w-full justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <span v-if="!persediaanStore.isUpdateLoading"> Update </span>
          <span class="flex" v-else><ArrowPathIcon class="mx-auto w-6 h-6 animate-spin" /></span>
        </button>

        <button
          type="button"
          @click="reset()"
          class="w-full justify-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          <span v-if="!persediaanStore.isUpdateLoading"> Reset </span>
          <span class="flex" v-else><ArrowPathIcon class="mx-auto w-6 h-6 animate-spin" /></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePersediaanStore } from '@/stores/persediaan'
import { ArrowPathIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { useDebounceFn } from '@vueuse/core'
import FilePond from '@/components/FilePond.vue'
import { storageUrl } from '@/services/helper'
import { computed } from 'vue'
import { FunnelIcon } from '@heroicons/vue/24/solid'

const emit = defineEmits(['close', 'submit', 'fileChange'])
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  likes: Number,
})
function fileChange(event) {
  emit('fileChange', event)
}

const showImage = computed(() => {
  if (persediaanStore.singleResponses.image == null) return 'https://placehold.co/40x40'
  const a = storageUrl + 'storage/' + persediaanStore.singleResponses.image
  return a
})

function deleteImage() {
  persediaanStore.$patch((state) => {
    state.singleResponses.image = null
  })
}

function reset() {
  persediaanStore.singleResponses = JSON.parse(JSON.stringify(persediaanStore.originalSingleResponses))
}

const search = useDebounceFn(() => {
  persediaanStore.cekNama()
}, 500)

const persediaanStore = usePersediaanStore()
</script>
