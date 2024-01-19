<template>
  <main class="p-4 md:ml-64 min-h-screen h-auto pt-20">
    <div class="mt-4 mb-2 inline-flex items-center text-2xl font-medium text-gray-800 dark:text-gray-400 ml-16">
      {{ route.meta.title }}
    </div>

    <RouterView />
  </main>
</template>

<script setup>
import { initDropdowns } from 'flowbite'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
onMounted(() => {
  initAccordions()
  initCarousels()
  initCollapses()
  initDials()
  initDismisses()
  initDrawers()
  initDropdowns()
  initModals()
  initPopovers()
  initTabs()
  initTooltips()
})
</script>
