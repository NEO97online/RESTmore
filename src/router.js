const createEndpointHandler = require('./endpoint')

/**
 * Attaches a router to an Express app, after configuring endpoint handlers.
 */
function attachRouter(app, router) {
  for (const [method, endpoints] of Object.entries(router.api)) {
    for (const [endpoint, config] of Object.entries(endpoints)) {
      const handler = createEndpointHandler(config)
      app[method](endpoint, handler)
    }
  }
}

/**
 * Creates a router for handling requests.
 */
function createRouter() {
  const api = {}

  const handler = method => {
    api[method] = {}
    return (endpoint, options) => {
      api[method][endpoint] = options
    }
  }

  return {
    api,
    get: handler('get'),
    post: handler('post'),
    put: handler('put'),
    patch: handler('patch'),
    delete: handler('delete'),
    head: handler('head'),
    options: handler('options')
  }
}

module.exports = { createRouter, attachRouter }

