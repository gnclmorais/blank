<template>
  <div class="layout">
    <header>
      <Header />
    </header>

    <main>
      <nuxt />
    </main>
  </div>
</template>

<script>
import Header from '~/components/Header.vue'

export default {
  components: {
    Header
  }
}
</script>

<style>
.layout {
  margin: 0 auto;
  max-width: 750px;
  padding-left: 20px;
  padding-right: 20px;
}
</style>
