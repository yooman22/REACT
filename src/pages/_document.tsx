// libraray
import * as React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta charSet="utf-8" />
          <link rel="/manifest" href="/manifest.json" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />

          <link
            href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />

          <meta name="description" content="Next.js learning record" />
          <meta name="keywords" content="react,nextjs,study" />
          <meta name="author" content="Jinheyong.kim" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => <App {...props} />,
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
  }
}
