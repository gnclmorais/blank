<template>
  <div>
    <section class="u-align-center hero">
      <div class="hero-body">
        <h1 class="title">
          Pocket
        </h1>
        <a href="https://getpocket.com">app.getpocket.com</a>
      </div>
    </section>

    <section class="u-align-center">
      <div>
        <div v-if="!loggedIn">
          <p class="u-margin-bottom-0">You need to log in first</p>
          <a href="/connect/getpocket" class="button">
            Connect to Pocket
          </a>
        </div>
        <div v-else-if="loading">
          <Loader />
          <p>Counting your unread articles from Pocket…</p>
        </div>
        <div v-else-if="successMessage">
          Success!
          <span v-text="successMessage" />
          No more unread articles on Pocket 😌
        </div>
        <div v-else-if="errorMessage">
          Error:
          <span v-text="errorMessage" />
        </div>
        <div v-else>
          <p class="u-margin-bottom-0" v-html="numberUnreadArticlesMessage" />
          <button @click="deletePockets" v-show="numberUnreadArticles">
            Delete all
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Axios from 'axios'

import Loader from '~/components/Loader.vue'

const keys = (obj) => Object.keys(obj).length

const pluralize = (nr, str) => `${nr} ${str}${nr !== 1 ? 's' : ''}`

export default {
  components: {
    Loader
  },
  data() {
    return {
      pockets: {},
      loading: false,
      successMessage: undefined,
      errorMessage: undefined
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
      return this.numberUnreadArticles > 0 ? `You have <strong>${pluralize(
        this.numberUnreadArticles,
        'article'
      )}</strong> on your Pocket account` : 'Your account is empty!'
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
      this.loading = true
      this.errorMessage = undefined

      Axios.get('/api/pocket/retrieve')
        .then(({ data }) => this.setPocketArticles(data))
        .catch(({ response }) => {
          this.errorMessage = response.data || 'Error — try again later'
        })
        .finally(() => {
          this.loading = false
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
            this.successMessage = `${
              pluralize(action_results.length, 'article')
            } removed`

            this.setPocketArticles({})
          } else {
            const nrRemoved = action_results.filter((result) => result).length
            const nrErrored = action_errors.filter((result) => result).length

            this.successMessage = `${pluralize(
              nrRemoved,
              'article'
            )} removed but ${pluralize(
              nrErrored,
              'article'
            )} could not be removed`
          }
        })
        .catch(({ response }) => {
          this.errorMessage = response.data || 'Error — try again later'
        })
    }
  }
}
</script>

<style>
</style>
