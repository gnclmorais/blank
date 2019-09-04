<template>
  <section>
    <logo />

    <h1 class="title">
      Blank.
    </h1>

    <h2 class="subtitle">
      Empty all your lists.
    </h2>

    <div class="links">
      <p>Available integrations:</p>
      <ul>
        <li>
          <el-link type="primary" href="/pocket">
            Pocket
            <i class="el-icon-right" />
          </el-link>
        </li>
        <li>
          <el-link type="info" href="/">
            Tell us the next integration to build
            <i class="el-icon-right" />
          </el-link>
        </li>
      </ul>
      <nuxt-link to="/pocket">
        <el-button>
          Pocket
          <i class="el-icon-right" />
        </el-button>
      </nuxt-link>
      <el-button>
        Missing an integration?
        <i class="el-icon-right" />
      </el-button>
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

</style>
