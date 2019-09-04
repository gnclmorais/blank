<template>
  <div class="header">
    <nuxt-link to="/" class="header-link">
      <strong>Blank.</strong>
    </nuxt-link>
    <span class="u-line-through tagline">Empty all your lists</span>

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

.tagline {
  opacity: .5;
}
</style>
