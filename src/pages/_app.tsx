import Head from "next/head";
import type { AppProps } from 'next/app';
import {ConfigProvider} from "antd";
import {QueryClientProvider} from "@tanstack/react-query";

import {AuthProvider} from "@/shared/hooks/useAuth";

import {queryClient} from "@/app/setup/query/queryClient";
import {antdTheme} from "@/app/setup/theme/theme";

import "../app/styles/globals.css";
import "../app/styles/rewrite.css";

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta name="robots" content="index, follow"/>

      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
        rel="stylesheet"
      />
    </Head>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ConfigProvider theme={antdTheme}>
          <Component {...pageProps} />
        </ConfigProvider>
      </AuthProvider>
    </QueryClientProvider>
  </>
}
