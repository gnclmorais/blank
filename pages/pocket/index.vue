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
        <br />
        <a v-if="!loggedIn" href="/connect/getpocket" class="button">
          connect app to Pocket
        </a>
        <div v-else>
          <span v-text="numberUnreadArticlesMessage" />
          <button @click="deletePockets">
            Delete all
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Loading } from 'element-ui'
import Axios from 'axios'
// import { mapMutations } from 'vuex'

import Logo from '~/components/Logo.vue'

const keys = (obj) => Object.keys(obj).length

export default {
  components: {
    Logo
  },
  data() {
    return {
      pockets: {}
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.pocket.loggedIn
    },
    numberUnreadArticles() {
      return keys(this.pockets)
    },
    numberUnreadArticlesMessage() {
      return `You have ${this.numberUnreadArticles} articles on your Pocket`
    }
  },
  mounted() {
    if (this.$store.state.pocket.loggedIn) {
      if (keys(this.$store.state.pocket.articles)) {
        this.pockets = this.$store.state.pocket.articles
      } else {
        this.loadPocketInfo()
      }
    }
  },
  methods: {
    loadPocketInfo() {
      const loadingService = Loading.service({
        lock: true,
        text: 'Counting your Pocket articles…',
        spinner: 'el-icon-loading'
      })

      Axios.get('/api/pocket/retrieve')
        .then(({ config, data, headers, request, status, statusText }) => {
          this.pockets = data
          this.$store.commit('pocket/setArticles', data)
        })
        .catch(function(error) {
          console.log(error)
        })
        .finally(function() {
          loadingService.close()
        })
    },
    deletePockets() {
      const items = Object.keys(this.pockets)

      Axios.post('/api/pocket/clean', { items }).then((stuff) => {
        console.log('stuff:', stuff)
      })
    }
  }
}
</script>

<style></style>
