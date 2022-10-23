import { rest } from 'msw'
export const handlers = [
  rest.get('/api/account/user', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          user: {
            id: 1,
          },
        },
      })
    )
  }),
  rest.post('/api/account/login', async (req, res, ctx) => {
    const { email, password } = await req.json()

    const verificationReq = { email: 'demo@github.com', password: 'demo123' }

    if (email === verificationReq.email && password === verificationReq.password) {
      const user = {}
      const accessToken = ''
      return res(
        ctx.status(200),
        ctx.json({
          data: {
            accessToken,
            user,
            message: 'success Login',
          },
        })
      )
    }
    return res(
      ctx.status(401),
      ctx.json({
        data: {
          error: 'invalid login info',
        },
      })
    )
  }),
]
