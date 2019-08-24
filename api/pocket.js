const express = require('express')
const router = express.Router()
const axios = require('axios')

const defaultErrorCatch = (res) => function ({ response }) {
  // https://getpocket.com/developer/docs/errors
  // 400 - Invalid request,
  //       please make sure you follow the documentation for proper syntax
  // 401 - Problem authenticating the user
  // 403 - User was authenticated,
  //       but access denied due to lack of permission or rate limiting
  // 503 - Pocket's sync server is down for scheduled maintenance.

  // TODO: Sentry error logging?

  const status = response.status
  const headers = response.headers
  const error = headers['x-error'] || 'Error — try again later'

  res.status(status).send(error)
}

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
router.get('/callback', (req, res) => {
  res.redirect('/pocket')
})

// disconnect from pocket by destroying the session
router.get('/disconnect', (req, response) => {
  req.session.destroy(_err => {
    response.redirect('/')
  })
})

router.get('/retrieve', async (req, res, next) => {
  axios.get('https://getpocket.com/v3/get', {
    params: {
      consumer_key: process.env.POCKET_API_KEY,
      access_token: req.session.grant.response.access_token,
      state: 'unread',
      detailType: 'simple',
      sort: 'oldest'
    }
  })
  .then(({ data }) => {
    res.send(data.list);
  })
  .catch(defaultErrorCatch(res));
})

router.post('/clean', (req, res, next) => {
  try {
    // TODO: Restore this in order to remove ALL articles
    // const items = req.body.items
    const items = req.body.items.slice(0, 1)
    const timestamp = Date.now()
    const actions = items.map((item) => ({
      "action": "delete",
      "item_id": item,
      "time": timestamp
    }))

    axios.post(`https://getpocket.com/v3/send?consumer_key=${
      process.env.POCKET_API_KEY
    }&access_token=${
      req.session.grant.response.access_token
    }&actions=${
      JSON.stringify(actions)
    }`)
    .then(function({ data }) {
      res.send(data);
    })
    .catch(defaultErrorCatch(res))
  } catch (err) {
    return res.status(400).send('Error — malformed request')
  }
})

module.exports = router
