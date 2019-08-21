const express = require('express')
const router = express.Router()
const axios = require('axios')

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

router.get('/retrieve', async (req, res, next) => {
  axios.get('https://getpocket.com/v3/get', {
    params: {
      consumer_key: process.env.POCKET_API_KEY,
      access_token: req.session.grant.response.access_token,
      state: 'unread',
      detailType: 'simple'
    }
  })
  .then(function(pockets) {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(pockets.data.list));
  })
  .catch(function(error) {
    res.setHeader("Content-Type", "application/json");
    console.log(error);
    res.send(JSON.stringify(error));
  });
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
