export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (!req) return
    if (!req.session.grant) return

    const accessToken = req.session.grant.response.access_token

    // if (accessToken) {
    console.log('commit')
    commit('pocket/login', {
      consumerKey: process.env.POCKET_API_KEY,
      accessToken
    })
    // }
  }
}
