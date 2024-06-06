<script>
import { computed } from 'vue'


const layout = computed(() => {
  return `layouts-${this.$route.meta.layout || "unauthenticated"}`;
})
export default {
  computed: {
    layout() {
      return `layouts-${this.$route.meta.layout || "unauthenticated"}`;
    },
  },
};
</script>
<template>
  <component :is="layout" />
</template>


