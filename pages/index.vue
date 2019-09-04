<template>
  <section class="u-align-center">
    <logo />

    <h1 class="title u-margin-bottom-0">
      Blank.
    </h1>

    <h3 class="subtitle">
      Empty all your lists
    </h3>

    <div class="links">
      <p class="available-msg">Available integrations:</p>
      <ul class="u-ul-reset button-list">
        <li>
          <nuxt-link to="/pocket" class="button u-full-width">
            Pocket
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/pocket" class="button u-full-width">
            Pick the next one
          </nuxt-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  layout: 'landing',
  components: {
    Logo
  }
}
</script>

<style>
.title {
}

.links {
  margin-top: 5rem;
}

.available-msg {
  margin-bottom: 1rem;
}

.button-list {
  list-style-type: none;
  margin: 0 auto;
  max-width: 20rem;
}
</style>
