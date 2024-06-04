<template>
  <component :is="layout" />
</template>

<script>
export default {
  computed: {
    layout() {
      return `layouts-${this.$route.meta.layout || "unauthenticated"}`;
    },
  },
};
</script>
