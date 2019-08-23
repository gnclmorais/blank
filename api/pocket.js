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
  .then(function(pockets) {
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(pockets.data.list));
  })
  .catch(function(error) {
    res.setHeader("Content-Type", "application/json");
    console.log(error);
    next(JSON.stringify(error));
    // res.send(JSON.stringify(error));
  });
})

router.post('/clean', (req, res, next) => {
  const timestamp = Date.now()
  // const items = req.body.items
  const items = req.body.items.slice(0, 11)
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
    // res.setHeader("Content-Type", "application/json");
    // res.send(JSON.stringify(answer));
    res.send(data);
  })
  .catch(function(error) {
    res.setHeader("Content-Type", "application/json");
    console.log(error);
    next(JSON.stringify(error));
    // res.send(JSON.stringify(error));
  });
})

module.exports = router
