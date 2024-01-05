<script setup>
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { useRoute } from 'vue-router'

const route = useRoute()

const layout = computed(() => {
  if (route.meta.layout === 'layout-authenticated') return 'layout-full'
  return 'layout-full'
})
</script>
<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
