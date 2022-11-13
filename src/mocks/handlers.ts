import { rest } from 'msw'
import { _accessToken, _mockUser, _refleshToken } from './auth/_user'
export const handlers = [
  rest.get('/api/auth/token', async (req, res, ctx) => {
    const { refleshToken } = req.cookies
    const isVailed = refleshToken
    const accessToken = _accessToken()
    if (isVailed) {
      return res(
        ctx.status(200),
        ctx.json({
          accessToken,
        })
      )
    }
    return res(
      ctx.status(401),
      ctx.json({
        error: 'invalid login info',
      })
    )
  }),

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
      const accessToken = _accessToken()
      const refleshToken = _refleshToken()
      const user = _mockUser()
      return res(
        ctx.status(200),
        ctx.json({
          refleshToken,
          accessToken,
          user,
          message: 'success Login',
        })
      )
    }
    return res(
      ctx.status(401),
      ctx.json({
        error: 'invalid login info',
      })
    )
  }),

  rest.post('/api/account/register', async (req, res, ctx) => {
    const { email, password } = await req.json()

    const accessToken = _accessToken()
    const refleshToken = _refleshToken()
    const user = _mockUser()
    return res(
      ctx.status(200),
      ctx.json({
        accessToken: accessToken,
        refleshToken: refleshToken,
        user: user,
        message: 'Membership successful',
      })
    )
  }),
]
