export const state = () => ({
  loggedIn: false,
  consumerKey: undefined,
  accessToken: undefined
})

export const mutations = {
  login(state, { consumerKey, accessToken }) {
    state.consumerKey = consumerKey
    state.accessToken = accessToken
    state.loggedIn = !!(consumerKey && accessToken)
  }
}

export const actions = {}
