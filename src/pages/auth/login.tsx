// next
import NextLink from 'next/link'
// @mui
import { styled } from '@mui/material/styles'
import { Box, Card, Stack, Link, Alert, Container, Typography } from '@mui/material'
// routes
import { PATH_AUTH } from '../../routes'

// guards
import GuestGuard from '../../guards/GuestGuard'
// components

import Page from 'src/components/common/Page'
import LoginForm from 'src/section/auth/LoginForm'

// ----------------------------------------------------------------------

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

export default function Login() {
  return (
    <GuestGuard>
      <Page title="Login">
        <RootStyle>
          <Container maxWidth="sm">
            <ContentStyle>
              <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" gutterBottom>
                    Sign in to JJ
                  </Typography>
                </Box>
              </Stack>
              <Alert severity="info" sx={{ mb: 3 }}>
                Use email : <strong>demo@github.com</strong> / password :<strong> demo123</strong>
              </Alert>
              <LoginForm />

              <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" sx={{ mt: 5 }}>
                    New to JJ? {''}
                    <NextLink href={PATH_AUTH.register} passHref>
                      <Link variant="subtitle2">Create an account</Link>
                    </NextLink>
                  </Typography>
                </Box>
              </Stack>
            </ContentStyle>
          </Container>
        </RootStyle>
      </Page>
    </GuestGuard>
  )
}
