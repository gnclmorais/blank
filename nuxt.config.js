module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Lexend+Deca&display=swap'
      },
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: false,
  /*
   ** Environment variables
   */
   env: {
      rollbarAccessToken: process.env.ROLLBAR_ACCESS_TOKEN,
   },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/css/Barebones/css/normalize.css',
    '@/assets/css/Barebones/css/barebones.css',
    '@/assets/css/icomoon/style.css',
    '@/assets/css/main.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/rollbar'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  devModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  serverMiddleware: [
    // '~/api/pocket.js',
    // { path: '/pocket', handler: '~/serverMiddleware/pocket.js' }
  ],
  pageTransition: 'slide-left'
}
