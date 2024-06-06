<template>
  <header-section />

  <sidebar-section />

  <main id="main" class="main">
    <breadcrumb-section />
    <section>
      <!--  Load each route component    -->
      <router-view />
    </section>
  </main>
  <footer-section />
</template>
<script>
import Footer from "./Footer";
export default {
  components: {Footer}
}
</script>