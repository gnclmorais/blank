<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        Blank.
      </h1>
      <h2 class="subtitle">
        Pocket
      </h2>
      <div>
        You are in the Pocket page.
        <a v-if="!loggedIn" href="/connect/getpocket" class="button">
          connect app to Pocket
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  computed: {
    loggedIn() {
      return this.$store.state.pocket.loggedIn
    }
  },
  async fetch({ store, params, $axios }) {
    const { data } = await $axios.get('/api/pocket')
    store.commit('pocket/login', data)
  }
}
</script>

<style></style>
