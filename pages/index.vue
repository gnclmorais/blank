<template>
  <section class="">
    <h1 class="title brand u-margin-bottom-0">
      Blank.
    </h1>

    <h3 class="subtitle">
      Empty all your lists
    </h3>

    <br />

    <p>
      Lost the hold on your digital lists?
      <br />
      Clean them up and start again.
    </p>

    <div class="links">
      <p class="available-msg">Available integrations:</p>
      <ul class="u-ul-reset button-list">
        <li>
          <nuxt-link to="/pocket" class="button">
            <i class="icon-get-pocket" />
            Pocket
          </nuxt-link>
        </li>
        <li>
          <a href="airtable" class="button" target="_blank">
            <i class="icon-comment" />
            Pick the next one
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      airtable: 'https://airtable.com/shrKTzukHagJMNFmZ'
    }
  },
  transition: 'slide-right'
}
</script>

<style>
.title {
  margin-top: 5rem;
}

.subtitle {
  opacity: 0.5;
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
