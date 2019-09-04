<template>
  <div class="header">
    <nuxt-link to="/" class="home">
      <strong>Blank.</strong>
    </nuxt-link>
    Empty all your lists
  </div>
</template>

<style scoped>
.header {
  line-height: 6rem; /* 6 * 10px = 60px */
}

.home {
  color: inherit;
  text-decoration: none;
}
.home:hover {
  text-decoration: underline;
}
</style>
