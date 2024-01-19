<script setup>
import { ArrowDownTrayIcon, ArrowPathIcon, ShareIcon } from '@heroicons/vue/24/outline'
import QRCodeVue3 from 'qrcode-vue3'
import { computed, onMounted, ref } from 'vue'
import html2pdf from 'html2pdf.js'
import { toast } from 'vue3-toastify'
import { useRoute } from 'vue-router'
import { usePermintaanPersediaanStore } from '@/stores/permintaanPersediaan'

function exportHTMLtoPDF() {
  let htmlElement = document.getElementById('content')

  var opt = {
    margin: 2,
    filename: 'permintaan_persediaan.pdf',
    image: { type: 'png', quality: 1 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
  }

  html2pdf().set(opt).from(htmlElement).save()
}

async function shareLink() {
  let a = window.location.href
  console.info(a)
  try {
    await navigator.clipboard?.writeText(a)
    toast.success('Link copied!', { autoClose: 500, position: toast.POSITION.BOTTOM_CENTER })

    /* Resolved - text copied to clipboard successfully */
  } catch (err) {
    toast.error(err, { autoClose: 500, position: toast.POSITION.BOTTOM_CENTER })
    /* Rejected - text failed to copy to the clipboard */
  }
}

const route = useRoute()
const permintaanPersediaanStore = usePermintaanPersediaanStore()
const data = ref('Hello world')

const tiket = computed(() => {
  return route.params.tiket ?? null
})

const detailUrl = computed(() => {
  const firstSegment = window.location.origin + '/user/persediaan/permintaan'
  return `${firstSegment}/${tiket.value}/detail`
})

onMounted(async () => {
  await permintaanPersediaanStore.show(tiket.value)
})
</script>
<template>
  <section v-if="permintaanPersediaanStore.singleResponses == null">
    <div class="h-screen">
      <span class="flex mt-24"><ArrowPathIcon class="mx-auto w-6 h-6 animate-spin" /> </span>
    </div>
  </section>
  <section v-else>
    <div class="m-auto max-w-md w-full h-full z-10 rounded-3xl" id="content">
      <div class="flex flex-col">
        <div class="bg-white relative drop-shadow-2xl rounded-3xl p-4 m-4">
          <div class="flex-none sm:flex">
            <div class="flex-auto justify-evenly">
              <div class="flex items-center justify-between">
                <div class="flex items-center my-1">
                  <span class="mr-2 rounded-full bg-white">
                    <img src="@/assets/logo_itjen.png" class="h-12 w-fit" />
                  </span>
                  <h2 class="font-medium">Nomor Tiket</h2>
                </div>
                <div class="ml-auto text-blue-900 font-bold">{{ permintaanPersediaanStore.singleResponses.tiket }}</div>
              </div>
              <div class="border-b border-dashed my-5"></div>
              <div class="flex items-center">
                <div class="mx-auto h-fit">
                  <QRCodeVue3 :value="detailUrl" />
                </div>
              </div>

              <div class="border-b border-dashed my-5 pt-5">
                <div class="absolute rounded-full w-5 h-5 bg-blue-900 -mt-2 -left-2"></div>
                <div class="absolute rounded-full w-5 h-5 bg-blue-900 -mt-2 -right-2"></div>
              </div>
              <div class="flex items-start px-5 pt-3 text-sm justify-between">
                <div class="flex flex-col">
                  <span class="">Nama</span>
                  <div class="font-semibold">{{ permintaanPersediaanStore.singleResponses.nama }}</div>
                </div>
                <div class="flex flex-col space-y-2">
                  <div class="flex flex-col">
                    <span class="">Tanggal Permintaan</span>
                    <div class="font-semibold">{{ permintaanPersediaanStore.singleResponses.created_at }}</div>
                  </div>

                  <div class="flex flex-col space-y-2">
                    <span class="">Status</span>
                    <div class="font-semibold">
                      <span
                        v-if="permintaanPersediaanStore.singleResponses.status == 'ORDER'"
                        class="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                        >{{ permintaanPersediaanStore.singleResponses.status }}</span
                      >
                      <span
                        v-else-if="permintaanPersediaanStore.singleResponses.status == 'DONE'"
                        class="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300"
                        >{{ permintaanPersediaanStore.singleResponses.status }}</span
                      >
                      <span
                        v-else-if="permintaanPersediaanStore.singleResponses.status == 'PROCESS'"
                        class="bg-orange-100 text-orange-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-orange-900 dark:text-orange-300"
                        >{{ permintaanPersediaanStore.singleResponses.status }}</span
                      >
                      <span v-else class="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300"
                        >REJECTED</span
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex flex-row py-5 justify-center text-sm">
                <button
                  @click="exportHTMLtoPDF"
                  type="button"
                  class="w-fit h-fit text-gray-700 border border-gray-700 hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:focus:ring-gray-800 dark:hover:bg-gray-500"
                >
                  <ArrowDownTrayIcon class="w-5 h-5" />
                </button>
                <button
                  @click="shareLink"
                  type="button"
                  class="w-fit h-fit text-gray-700 border border-gray-700 hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-gray-500 dark:text-gray-500 dark:hover:text-white dark:focus:ring-gray-800 dark:hover:bg-gray-500"
                >
                  <ShareIcon class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
