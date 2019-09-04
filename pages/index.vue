<template>
  <section class="">
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
          <nuxt-link to="/pocket" class="button">
            <i class="icon-get-pocket"></i>
            Pocket
          </nuxt-link>
        </li>
        <li>
          <a href="https://airtable.com/shrKTzukHagJMNFmZ" class="button" target="_blank">
            <i class="icon-comment"></i>
            Pick the next one
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
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
}
</style>
