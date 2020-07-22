const express = require('express')
const { attachRouter } = require('./router') 

function createExpressApp(...middleware) {
  const app = express()

  // inject middleware
  for (const midFn of middleware) {
    app.use(midFn)
  }

  // Handle errors thrown in requests. This should always be LAST in the middleware order.
  app.use((err, req, res, next) => {
    console.error(err.message || err.response.body.message)
    console.error(err.stack)
    res.status(500).json({ error: 'Internal server error' })
  })

  return app
}

function createService({ routers = [], middleware = [] }) {
  const app = createExpressApp(...middleware)

  for (const router of routers) {
    attachRouter(app, router)
  }

  return app
}

module.exports = { createService }

