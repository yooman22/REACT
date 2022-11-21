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

  rest.get('/api/terms/sign-up', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        terms: [
          {
            id: 1,
            content: '(필수) 개인회원 약관에 동의',
            name: 'terms_individual',
            required: true,
            link: 'https://www.saramin.co.kr/zf_user/help/terms-of-service/person',
            checked: false,
          },
          {
            id: 2,
            name: 'terms_private',
            content: '(필수) 개인정보 수집 및 이용에 동의',
            required: true,
            link: 'https://www.saramin.co.kr/zf_user/help/terms-of-service/person',
            checked: false,
          },
          {
            id: 3,
            name: 'temms_gps',
            content: '(선택) 위치기반서비스 이용약관에 동의',
            required: false,
            link: 'https://www.saramin.co.kr/zf_user/help/terms-of-service/person',
            checked: false,
          },
          {
            id: 4,
            name: 'terms_marketing_email',
            content: '(선택) 마케팅 정보 수신 동의 - 이메일',
            required: false,
            link: 'https://www.saramin.co.kr/zf_user/help/terms-of-service/person',
            checked: false,
          },
          {
            id: 5,
            name: 'terms_marketing_sms',
            content: '(선택) 마케팅 정보 수신 동의 - SMS/MMS',
            required: false,
            link: 'https://www.saramin.co.kr/zf_user/help/terms-of-service/person',
            checked: false,
          },
        ],
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
