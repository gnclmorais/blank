<template>
  <div class="header">
    <nuxt-link to="/" class="header-link brand">Blank.</nuxt-link>
    <span class="tagline">
      Empty all your lists
    </span>

    <a
      href="http://github.com/gnclmorais/blank"
      class="header-link u-pull-right"
      target="_blank"
    >
      Github.
    </a>
    <nuxt-link to="/about" class="header-link u-pull-right">
      About.
    </nuxt-link>
  </div>
</template>

<style scoped>
.header {
  line-height: 6rem; /* 6 * 10px = 60px */
}

.header-link {
  color: inherit;
  text-decoration: none;
}
.header-link:hover {
  text-decoration: underline;
}
.header-link + .header-link {
  margin-right: 2rem;
}

.tagline {
  opacity: 0.5;
}
</style>
