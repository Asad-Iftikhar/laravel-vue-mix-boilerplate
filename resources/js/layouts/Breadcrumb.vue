<script setup>
import { computed } from 'vue';
const props = defineProps({
  breadcrumbs: {
    type: Array,
    required: true,
  },
});

const lastBreadcrumbText = computed(() => {
  return props.breadcrumbs[props.breadcrumbs.length - 1]?.text;
});
const isLastItem = (index) => index === props.breadcrumbs.length - 1;

</script>

<template>
  <!-- Page Title -->
  <div class="pagetitle">
    <h1>{{ lastBreadcrumbText }}</h1>
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
        <li v-for="(crumb, index) in breadcrumbs" :key="crumb.text" class="breadcrumb-item" :class="{ 'active': isLastItem(index) }">
          <router-link v-if="index < breadcrumbs.length - 1" :to="crumb.link">{{ crumb.text }}</router-link>
          <span v-else>{{ crumb.text }}</span>
        </li>
      </ol>
    </nav>
  </div><!-- End Page Title -->
</template>