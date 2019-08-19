const express = require('express')
const router = express.Router()

// debug route
// TODO: Remove?
router.get('/', (req, res, next) => {
  const session = req.session
  let response

  if (session && session.grant && session.grant.response) {
    const accessToken = session.grant.response.access_token
    response = accessToken ? {
      consumerKey: process.env.POCKET_API_KEY,
      accessToken: accessToken
    } : {}
  } else {
    response = {}
  }
  res.json(response)
})

// where pocket redirects to after connecting
router.get('/callback', (request, response) => {
  response.redirect('/pocket')
})

// disconnect from pocket by destroying the session
router.get('/disconnect', (request, response) => {
  request.session.destroy(_err => {
    response.redirect('/')
  })
})

module.exports = router
