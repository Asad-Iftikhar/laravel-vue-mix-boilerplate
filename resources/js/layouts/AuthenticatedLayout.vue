<script setup>
import { useRoute, onBeforeRouteLeave, useRouter } from 'vue-router'

const route = useRoute();

console.log(route.matched.map((route) => {return {text : route.meta.breadcrumb, link : route.path} }));
</script>

<template>
  <header-section />

  <sidebar-section />

  <main id="main" class="main">
    <breadcrumb-section :breadcrumbs="$route.matched.map((route) => {return {text : route.meta.breadcrumb, link : route.path} })"/>
    <section>
      <!--  Load each route component    -->
      <router-view />
    </section>
  </main>
  <footer-section />
</template>
