/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from 'next-intl';
import {useRouter} from 'next/router';
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const getLayout = (Component as any).getLayout || ((page: React.ReactElement) => page);
  const messages = require(`../../public/locales/${router.locale}/common.json`);
  return (
    <NextIntlClientProvider
      locale={router.locale}
      timeZone="Europe/Vienna"
      messages={messages}
    >
      <SessionProvider session={pageProps.session}>
        {getLayout(<Component {...pageProps} />)}
      </SessionProvider>
    </NextIntlClientProvider>
  );
}
