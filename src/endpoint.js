module.exports = function createEndpointHandler(config) {
  return async (xReq, xRes) => {
    // create our own req object based on the Express one
    const req = { ...xReq }

    // validate body parameters
    for (const [param, validators] of Object.entries(config.params)) {
      const value = req.body[param]
      for (const validator of Array.isArray(validators) ? validators : [validators]) {
        if (!validator.test(value)) {
          // send validation failure response
          const message = validator.message(param, value)
          xRes.status(400).json({ error: message })
          return
        }
      }
    }

    // convert responses into functions, if they aren't already
    const responses = {}
    for (const [key, resConf] of Object.entries(config.responses)) {
      if (typeof resConf === 'function') {
        responses[key] = resConf
      } else {
        responses[key] = () => resConf
      }
    }

    // pass the request and responses to the endpoint handler
    const { code, ...payload } = await config.handler(req, responses)

    xRes.status(code).json(payload)
  }
}
