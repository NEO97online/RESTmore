module.exports = {
  required: {
    test: value => value !== null && value !== undefined,
    message: param => `Missing parameter: ${param} is required.`
  },
  string: {
    test: value => typeof value === 'string' || value === undefined,
    message: param => `Invalid parameter: ${param} should be a string.`
  },
  boolean: {
    test: value => typeof value === 'boolean' || value === undefined,
    message: param => `Invalid parameter: ${param} should be a boolean.`
  },
  number: {
    test: value => typeof value === 'number' || value === undefined,
    message: param => `Invalid parameter: ${param} should be a number.`
  }
}
