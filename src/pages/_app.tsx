//react
import { ReactElement, ReactNode } from 'react'

// next
import { NextPage } from 'next'
import Head from 'next/head'
import App, { AppProps, AppContext } from 'next/app'

//redux
import { Provider as ReduxProvider } from 'react-redux'
import { store } from 'src/redux/store'
import { AuthProvider } from 'src/contexts/AuthContext'
import { QueryClient, QueryClientProvider } from 'react-query'

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../mocks')
}

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
} // nextjs component type boilerplate

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout
}

const queryClient = new QueryClient()
export default function MyApp(props: MyAppProps) {
  const { Component, pageProps } = props

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <AuthProvider>
        <ReduxProvider store={store}>
          <QueryClientProvider client={queryClient}>
            {getLayout(<Component {...pageProps} />)}
          </QueryClientProvider>
        </ReduxProvider>
      </AuthProvider>
    </>
  )
}

// ----------------------------------------------------------------------

MyApp.getInitialProps = async (context: AppContext) => {
  const appProps = await App.getInitialProps(context)

  return {
    ...appProps,
  }
}
