import Vue from 'vue'
import Rollbar from 'vue-rollbar'

Vue.use(Rollbar, {
  accessToken: process.env.rollbarAccessToken,
  captureUncaught: true,
  captureUnhandledRejections: true,
  enabled: true,
  environment: process.env.NODE_ENV,
  payload: {
    client: {
      javascript: {
        code_version: '1.0',
        // source_map_enabled: true,
        guess_uncaught_frames: true
      }
    }
  }
})

Vue.config.errorHandler = function (err, vm, info) {
  // https://docs.rollbar.com/docs/vue-js
  Vue.rollbar.error(err)
}
