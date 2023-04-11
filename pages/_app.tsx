import '../styles/globals.css'
import 'easymde/dist/easymde.min.css'
import NextNProgress from 'nextjs-progressbar'
import Link from 'next/link'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'

import Layout from '../components/Layout'
import Custom404 from './404'
import { AppProps } from 'next/app'

const MyApp = ({ Component, pageProps } : AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <title>Next-blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NextNProgress
        height={4}
        options={{
          showSpinner: false,
        }}
      />

      <Layout>
        {pageProps.error ? (
          <div className="text-center text-2xl">
            {pageProps.error.status === 404 ? (
              <Custom404 />
            ) : (
              <>
                <h1 className="font-bold">Some error &#9785;</h1>
                <Link className="border-b-2 text-blue-500" href="/">
                  Home
                </Link>
              </>
            )}
          </div>
        ) : (
          <Component {...pageProps} />
        )}
      </Layout>
    </SessionProvider>
  )
}

export default MyApp
