const express = require('express')
// express-session deprecated req.secret; provide secret option server/index.js:38:5
const session = require('express-session')
const bodyParser = require('body-parser')
const MemoryStore = require('memorystore')(session)
const Grant = require('grant-express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

// Load any environment variable
require('dotenv').config()

// Set up our session storage, used by Grant
// TODO: Find a better memory storage, MemoryStore is not production ready
app.use(
  session({
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    secure: true,
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET
  })
);

// Set up Grant, our oauth library
// https://github.com/simov/grant
const grant = new Grant({
  server: {
    protocol: 'http',
    host: process.env.HOST || 'localhost:3000',
    callback: '/api/pocket/callback',
    transport: 'session'
  },
  getpocket: {
    // TODO: Get these variables
    secret: process.env.SESSION_SECRET,
    key: process.env.POCKET_API_KEY
  }
});
app.use(grant);

// app.get('/callback', function(req, res) {
//   res.send('Yup.')
// })

// //
// // Routes experiment
// // app page
// app.get('/pocket', function(request, response) {
//   // check if we have a user session and pocket authentication
//   if (request.session && request.session.grant) {
//     // if we do, great!
//     response.sendFile(__dirname + '/views/index.html');
//   } else {
//     // if we don't, redirect to 'connect to pocket' page
//     response.sendFile(__dirname + '/views/connect.html');
//   }
// });

const pocketRoutes = require('../api/pocket')
app.use('/api/pocket', pocketRoutes)

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Enable parsing and responding in json
  app.use(bodyParser.json());

  const routes = app._router.stack
    .filter((middleware) => middleware.route)
    .map((middleware) => `
      ${Object.keys(middleware.route.methods).join(', ')} -> ${middleware.route.path}
    `)
  consola.ready(JSON.stringify(routes, null, 4));

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
