<template>
  <div class="antialiased bg-gray-50 dark:bg-gray-900">
    <Header />
    <SideBar />
    <Main />
    <!-- <Footer /> -->
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Main from './components/Main.vue'
import SideBar from './components/SideBar.vue'
import Footer from './components/Footer.vue'

import {
  initAccordions,
  initCarousels,
  initCollapses,
  initDials,
  initDismisses,
  initDrawers,
  initDropdowns,
  initModals,
  initPopovers,
  initTabs,
  initTooltips,
} from 'flowbite'
</script>
