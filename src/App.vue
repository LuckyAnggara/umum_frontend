<script setup>
import LayoutAuth from '@/layouts/LayoutAuth.vue'
import LayoutGuest from '@/layouts/LayoutGuest.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const layout = computed(() => {
  if (route.meta.layout === 'layout-auth') return LayoutAuth
  return LayoutGuest
})
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
