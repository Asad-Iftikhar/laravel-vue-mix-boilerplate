<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute();

const layout = computed(() => {
  return `layouts-${route.meta.layout || "authenticated"}`;
})
</script>
<template>
  <component :is="layout" />
</template>


