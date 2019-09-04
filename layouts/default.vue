<template>
  <div>
    <header>
      <Header />
    </header>

    <main>
      <nuxt />
    </main>

    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style>
html,
body {
  height: 100%;
}

body {
  margin: 0;
}
</style>
