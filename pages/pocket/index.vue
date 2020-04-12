<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <h1 class="hero-title">
          Pocket
        </h1>
        <a href="https://getpocket.com">getpocket.com →</a>
      </div>
    </section>

    <section class="">
      <div>
        <div v-if="!loggedIn">
          <p>You need to log in first</p>
          <a
            href="/connect/getpocket"
            class="button"
            @click="updateConnectMessage"
            v-text="connectMessage"
          />
        </div>
        <div v-else-if="loading">
          <p class="u-margin-bottom-0">
            Counting your unread articles from Pocket…
          </p>
          <Loader />
        </div>
        <div v-else-if="successMessage">
          <p>
            <span v-text="successMessage" />
            <br />
            Your Pocket account is now <strong>empty</strong>.
          </p>
        </div>
        <div v-else-if="errorMessage">
          <p>
            Error:
            <span v-text="errorMessage" />
          </p>
        </div>
        <div v-else>
          <p v-html="numberUnreadArticlesMessage" />
          <button
            v-show="numberUnreadArticles"
            @click="deletePockets"
            v-text="deleteMessage"
          />
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

const chunkArray = (arr, chunkSize) => {
  const results = []

  while (arr.length) results.push(arr.splice(0, chunkSize))

  return results
}

export default {
  components: {
    Loader
  },
  data() {
    return {
      pockets: {},
      loading: false,
      successMessage: undefined,
      errorMessage: undefined,
      connectMessage: 'Connect to Pocket',
      deleteMessage: 'Delete all'
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.pocket.loggedIn
    },
    numberUnreadArticles() {
      return keys(this.pockets)
    },
    numberUnreadArticlesString() {
      return pluralize(this.numberUnreadArticles, 'article')
    },
    numberUnreadArticlesMessage() {
      return this.numberUnreadArticles > 0
        ? `You have <strong>${this.numberUnreadArticlesString}</strong> on your Pocket account.`
        : 'Your account is empty.'
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
    updateConnectMessage() {
      this.connectMessage = 'Taking you to Pocket…'
    },
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
      const confirmDelete = confirm(`
        Are you sure you want to delete ${this.numberUnreadArticlesString}?
      `)
      if (!confirmDelete) return

      this.deleteMessage = 'Cleaning…'
      const items = Object.keys(this.pockets)

      // Requests _can_ be too long, so let's break our article IDs into chunks
      // and create separate requests
      const chunk = 200
      const itemSets = chunkArray(items, chunk)

      // https://css-tricks.com/why-using-reduce-to-sequentially-resolve-promises-works
      const result = itemSets.reduce(
        (accumulatorPromise, itemSet) => {
          return accumulatorPromise.then((agg) => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                Axios.post('/api/pocket/clean', { items: itemSet }).then(
                  ({ data }) => {
                    const {
                      action_errors, // eslint-disable-line camelcase
                      action_results, // eslint-disable-line camelcase
                      status
                    } = data

                    agg.actionErrors = agg.actionErrors.concat(action_errors)
                    agg.actionResults = agg.actionResults.concat(action_results)
                    agg.status = agg.status === 1 ? status : agg.status

                    resolve(agg)
                  }
                )
              }, 500)
            })
          })
        },
        Promise.resolve({
          actionErrors: [],
          actionResults: [],
          status: 1
        })
      )

      result
        .then(({ actionErrors, actionResults, status }) => {
          if (status === 1) {
            this.successMessage = `${pluralize(
              actionResults.length,
              'article'
            )} removed!`

            this.setPocketArticles({})
          } else {
            const nrRemoved = actionResults.filter((result) => result).length
            const nrErrored = actionErrors.filter((result) => result).length

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

<style></style>
