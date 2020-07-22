const { createRouter, createService, valid } = require('../src')

const router = createRouter()

router.post('/users', {
  params: {
    email: [valid.string, valid.required],
    password: [valid.string, valid.required],
    firstName: valid.string,
    lastName: valid.string
  },
  responses: {
    success: {
      code: 201,
      message: 'Successfully created user.'
    },
    exists: {
      code: 400,
      message: 'A user with that email already exists!'
    }
  },
  handler: async (req, res) => {
    const { email, password, firstName, lastName } = req.body

    if (email === 'test@test.com') {
      return res.exists()
    }

    return res.success()
  }
})

const service = createService({
  routers: [router],
  middleware: [
    require('helmet')(),
    require('cors')({
      origin: ['http://localhost:3000', /\.shire.host$/],
      credentials: true
    }),
    require('cookie-parser')(),
    require('body-parser').json()
  ],
})

service.listen(3000, () => console.log('server listening on port 3000'))

