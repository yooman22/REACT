// next
import NextLink from 'next/link'
// @mui
import { styled } from '@mui/material/styles'
import { Link, Container, Typography } from '@mui/material'

// guards
import GuestGuard from '../../guards/GuestGuard'
import Page from 'src/components/common/Page'
import RegisterForm from 'src/components/auth/RegisterForm'
import { PATH_AUTH } from 'src/routes'

import { signUpTerms } from 'src/apis/terms'
import { useQuery } from 'react-query'
import LoadingScreen from 'src/components/common/LoadingScreen'

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}))

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}))

// ----------------------------------------------------------------------

export default function Register() {
  const { isLoading, data, isError } = useQuery('repoData', signUpTerms, {
    staleTime: Infinity,
  })

  if (isLoading) {
    return <LoadingScreen />
  }
  if (isError || data === undefined) {
    return <p>is Error</p>
  }
  const serverLayout = {
    item: data,
  }
  return (
    <GuestGuard>
      <Page title="Register">
        <RootStyle>
          <Container>
            <ContentStyle>
              <RegisterForm serverLayout={serverLayout} />
              <Typography variant="body2" sx={{ mtdata: 3, textAlign: 'center' }}>
                Already have an account?{' '}
                <NextLink href={PATH_AUTH.login} passHref>
                  <Link variant="subtitle2">Login</Link>
                </NextLink>
              </Typography>
            </ContentStyle>
          </Container>
        </RootStyle>
      </Page>
    </GuestGuard>
  )
}
