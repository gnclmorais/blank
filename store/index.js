export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (!req) return
    if (!req.session) return
    if (!req.session.grant) return

    commit('pocket/login', {
      consumerKey: process.env.POCKET_API_KEY,
      accessToken: req.session.grant.response.access_token
    })
  }
}
