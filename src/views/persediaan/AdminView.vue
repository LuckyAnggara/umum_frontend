<template>
  <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
      <!-- Start coding here -->
      <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-visible">
        <div class="flex flex-col w-2/3 md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div class="w-full flex space-x-3">
            <div class="flex items-center">
              <label for="years" class="block text-sm font-medium text-gray-900 dark:text-white mr-2">Show</label>
              <select
                v-model="persediaanStore.filter.currentLimit"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option
                  :value="limit.value"
                  :selected="persediaanStore.filter.currentLimit == limit.value ? true : false"
                  v-for="(limit, index) in mainStore.limitOptions"
                  :key="index"
                >
                  {{ limit.label }}
                </option>
              </select>
            </div>

            <div class="flex items-center w-full" autocomplete="off">
              <label for="simple-search" class="sr-only">Search</label>
              <div class="relative w-full">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewbox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  @keyup.enter="persediaanStore.getData()"
                  v-model="persediaanStore.filter.searchQuery"
                  type="text"
                  id="simple-search"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Tekan enter untuk mencari"
                />
              </div>
            </div>

            <div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <button
                @click="newProduct()"
                type="button"
                class="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                <svg class="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                </svg>
                Add product
              </button>
            </div>
          </div>
        </div>
        <div class="overflow-y-visible w-full scrollbar-thin scrollbar-track-gray-500 scrollbar-thumb-gray-700">
          <table class="lg:w-full min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-4 py-3">#</th>
                <th scope="col" class="px-4 py-3">Gambar</th>
                <th scope="col" class="px-4 py-3">Nama</th>
                <th scope="col" class="px-4 py-3">Satuan</th>
                <th scope="col" class="px-4 py-3">Saldo</th>
                <th scope="col" class="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="persediaanStore.isLoading">
                <td colspan="6" class="text-center">
                  <span class=""><ArrowPathIcon class="w-6 h-6 animate-spin mx-auto" /></span>
                </td>
              </tr>
              <tr v-else-if="!persediaanStore.isLoading && persediaanStore.items.length < 1">
                <td colspan="5" class="text-center">No Data</td>
              </tr>
              <tr
                v-else
                v-for="(item, index) in persediaanStore.items"
                :key="index"
                class="odd:bg-white odd:dark:bg-gray-900 odd:dark:border-gray-700 even:bg-gray-50 even:dark:bg-gray-800 even:dark:border-gray-700 border-b"
              >
                <!-- <td class="px-4 py-1 text-center">{{ persediaanStore.from + index }}</td> -->
                <td class="px-4 py-1">{{ persediaanStore.from + index }}</td>
                <td class="px-4 py-1"><img class="w-20 h-20" :src="showImage(item)" /></td>
                <th class="px-4 py-1">
                  {{ item.nama }}
                </th>
                <td class="px-4 py-1">{{ item.satuan ?? '-' }}</td>
                <td class="px-4 py-1">{{ item.saldo ?? 0 }}</td>

                <td class="px-4 py-1">
                  <div>
                    <Menu as="div" class="relative inline-block text-left">
                      <div>
                        <MenuButton class="hover:scale-125 ease-in-out duration-300 flex w-full rounded-md font-medium text-black dark:text-white">
                          <EllipsisVerticalIcon class="h-5 w-5 text-black dark:text-white" aria-hidden="true" />
                        </MenuButton>
                      </div>

                      <transition
                        enter-active-class="transition duration-100 ease-out"
                        enter-from-class="transform scale-95 opacity-0"
                        enter-to-class="transform scale-100 opacity-100"
                        leave-active-class="transition duration-75 ease-in"
                        leave-from-class="transform scale-100 opacity-100"
                        leave-to-class="transform scale-95 opacity-0"
                      >
                        <MenuItems
                          class="z-50 py-1 absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-gray-800 dark:text-gray-100 shadow-lg ring-1 ring-black dark:ring-gray-700 ring-opacity-5 focus:outline-none"
                        >
                          <div class="px-2 py-1">
                            <MenuItem v-for="menu in itemMenu" v-slot="{ active }" :key="menu.label">
                              <button
                                @click="menu.function(item)"
                                :class="[
                                  active ? 'bg-blue-500 text-white' : 'text-gray-900 dark:text-white',
                                  'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                                ]"
                              >
                                <component :is="menu.icon" class="w-5 h-5 mr-3" />
                                {{ menu.label }}
                              </button>
                            </MenuItem>
                          </div>
                        </MenuItems>
                      </transition>
                    </Menu>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <nav class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
          <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
            Showing
            <span class="font-semibold text-gray-900 dark:text-white">{{ persediaanStore.from }} - {{ persediaanStore.to }}</span>
            of
            <span class="font-semibold text-gray-900 dark:text-white">{{ persediaanStore.total }}</span>
          </span>
          <ul class="inline-flex items-stretch -space-x-px">
            <li>
              <a
                @click="persediaanStore.currentPage == 1 ? '' : previousPage()"
                :disabled="persediaanStore.currentPage == 1 ? true : false"
                :class="
                  persediaanStore.currentPage == 1
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer dark:hover:bg-blue-700 dark:hover:text-white hover:bg-blue-100 hover:text-gray-700'
                "
                class="w-32 px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                >Previous</a
              >
            </li>

            <li>
              <a
                @click="persediaanStore.lastPage == persediaanStore.currentPage ? '' : nextPage()"
                :class="
                  persediaanStore.lastPage == persediaanStore.currentPage
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer dark:hover:bg-blue-700 dark:hover:text-white hover:bg-blue-100 hover:text-gray-700'
                "
                class="w-32 px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                >Next {{
              }}</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <NewDrawer :show="newDrawerShow" @close="newDrawerShow = !newDrawerShow" @submit="newStore" @fileChange="uploadFile" />
    <DetailDrawer :show="detailDrawerShow" @close="detailDrawerShow = !detailDrawerShow" @submit="update" @fileChange="uploadFileEdit" />

    <DeleteDialog :show="confirmDialog" @submit="deleteData" @close="confirmDialog = !confirmDialog" />
  </section>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import HeadlessMenu from '@/components/menu/HeadlessMenu.vue'
import NewDrawer from './NewDrawer.vue'
import DeleteDialog from '@/components/DeleteDialog.vue'

import { usePersediaanStore } from '@/stores/persediaan'
import { useMainStore } from '@/stores/main'

import { computed, onMounted, ref } from 'vue'
import { EllipsisVerticalIcon, DocumentTextIcon, ArrowPathIcon, TrashIcon, PlusIcon, FunnelIcon, Bars4Icon, ArchiveBoxIcon } from '@heroicons/vue/24/outline'
import { toast } from 'vue3-toastify'

import { storageUrl } from '@/services/helper'
import DetailDrawer from './DetailDrawer.vue'

const persediaanStore = usePersediaanStore()
const mainStore = useMainStore()

const newDrawerShow = ref(false)
const confirmDialog = ref(false)
const detailDrawerShow = ref(false)
const deleteId = ref(0)

const file = ref(null)

const itemMenu = [
  {
    function: detail,
    label: 'Detail',
    icon: DocumentTextIcon,
  },
  {
    function: onDelete,
    label: 'Hapus',
    icon: TrashIcon,
  },
]

function onDelete(item) {
  deleteId.value = item.id
  confirmDialog.value = true
}

function newProduct() {
  detailDrawerShow.value = false
  newDrawerShow.value = true
}
function detail(item) {
  persediaanStore.show(item)
  newDrawerShow.value = false
  detailDrawerShow.value = true
}

function nextPage() {
  persediaanStore.filter.page = persediaanStore.currentPage + 1
  persediaanStore.getData()
}

function previousPage() {
  persediaanStore.filter.page = persediaanStore.currentPage - 1
  persediaanStore.getData()
}

function uploadFile(event) {
  file.value = event
}

function uploadFileEdit(event) {
  file.value = event
}

async function deleteData() {
  confirmDialog.value = false
  const id = toast.loading('Hapus data...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })

  const success = await persediaanStore.destroy(deleteId.value)
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
  file.value = null
}

async function newStore() {
  const id = toast.loading('Membuat data baru...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })

  const success = await persediaanStore.store({ uploadFile: file.value })
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
    newDrawerShow.value = !newDrawerShow.value
    persediaanStore.getData()
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

async function update() {
  const id = toast.loading('Update data...', {
    position: toast.POSITION.BOTTOM_CENTER,
    type: 'info',
    isLoading: true,
  })

  const success = await persediaanStore.update({ uploadFile: file.value })
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
    persediaanStore.getData()
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

function showImage(item) {
  if (item.image == null) return 'https://placehold.co/40x40'
  const a = storageUrl + 'storage/' + item.image
  return a
}

onMounted(() => {
  persediaanStore.getData()
})
</script>
