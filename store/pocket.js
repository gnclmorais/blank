export const state = () => ({
  loggedIn: false,
  consumerKey: undefined,
  accessToken: undefined,
  articles: {}
})

export const mutations = {
  login(state, { consumerKey, accessToken }) {
    state.consumerKey = consumerKey
    state.accessToken = accessToken
    state.loggedIn = !!(consumerKey && accessToken)
  },
  setArticles(state, articles) {
    state.articles = articles
  }
}
