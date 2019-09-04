<template>
  <div class="layout">
    <main>
      <nuxt />
    </main>

    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script>
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Footer
  }
}
</script>

<style>
.layout {
  margin: 0 auto;
  max-width: 1000px;
  padding-left: 20px;
  padding-right: 20px;
}
</style>
