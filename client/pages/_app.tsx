import React, { FC } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { wrapper } from '../store';

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>ХАКАТОН</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default wrapper.withRedux(WrappedApp);
