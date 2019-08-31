<template>
  <el-container>
    <el-main>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <logo />

          <h1 class="title">
            Blank.
          </h1>

          <h2 class="subtitle">
            Empty all your lists.
          </h2>

          <div class="links">
            <nuxt-link to="/pocket">
              <el-button>Pocket</el-button>
            </nuxt-link>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
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
