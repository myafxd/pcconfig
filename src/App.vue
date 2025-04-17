<script setup>
import Footer from './components/Footer.vue'
import Navbar from './components/Navbar.vue'
</script>
<template>
  <Navbar></Navbar>
  <router-view /> <!--  страница -->
  <Footer></Footer>
</template>

<style scoped></style>
