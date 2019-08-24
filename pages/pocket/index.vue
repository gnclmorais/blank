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
          <button @click="deletePockets" v-show="numberUnreadArticles">
            Delete all
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Loading } from 'element-ui'
// import { Notification } from 'element-ui';
import Axios from 'axios'

import Logo from '~/components/Logo.vue'

const keys = (obj) => Object.keys(obj).length

const pluralize = (nr, str) => `${nr} ${str}${nr !== 1 ? 's' : ''}`

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
      return this.numberUnreadArticles > 0 ? `You have ${pluralize(
        this.numberUnreadArticles,
        'article'
      )} on your Pocket` : ''
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
    setPocketArticles(data) {
      this.pockets = data
      this.$store.commit('pocket/setArticles', data)
    },
    loadPocketInfo() {
      const loadingService = Loading.service({
        lock: true,
        text: 'Counting your Pocket articles…',
        spinner: 'el-icon-loading'
      })

      Axios.get('/api/pocket/retrieve')
        .then(({ data }) => this.setPocketArticles(data))
        .catch(({ response }) => {
          const errorMessage = response.data || 'Error — try again later'

          this.$notify.error({
            title: 'Error',
            message: errorMessage,
            position: 'top-left'
          })
        })
        .finally(function() {
          loadingService.close()
        })
    },
    deletePockets() {
      const items = Object.keys(this.pockets)

      Axios.post('/api/pocket/clean', { items })
        .then(({ data }) => {
          const {
            action_errors, // eslint-disable-line camelcase
            action_results, // eslint-disable-line camelcase
            status
          } = data

          if (status === 1) {
            this.$notify({
              title: 'Success',
              message: `${pluralize(action_results.length, 'article')} removed`,
              type: 'success'
            })

            this.setPocketArticles({})
          } else {
            const nrRemoved = action_results.filter((result) => result).length
            const nrErrored = action_errors.filter((result) => result).length

            this.$notify.info({
              title: 'Info',
              message: `${pluralize(
                nrRemoved,
                'article'
              )} removed but ${pluralize(
                nrErrored,
                'article'
              )} could not be removed`,
              position: 'top-left'
            })
          }
        })
        .catch(({ response }) => {
          const errorMessage = response.data || 'Error — try again later'

          this.$notify.error({
            title: 'Error',
            message: errorMessage,
            position: 'top-left'
          })
        })
    }
  }
}
</script>

<style></style>
