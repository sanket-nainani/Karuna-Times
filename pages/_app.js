import React, { useReducer } from 'react';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import Head from 'next/head';
import NProgress from 'nprogress';
import ModalNotification from '../framework/src/components/modalNotification';
import Toast from '../framework/src/components/Toast';
import MetaComponents from '../framework/src/components/MetaComponents';
import AppEffect from '../framework/src/components/AppEffect';

import '../framework/src/services/interceptorsService';
import AppContext from '../Context/appContext';
import * as AppReducer from '../reducers/appReducer';

import Footer from '../framework/src/components/footer';

import '../public/static/styles/app.scss';

const SideBar = dynamic(() => import('../framework/src/components/Sidebar'));

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', (/* url */) => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp = ({ Component, pageProps }) => {
  const [state, dispatch] = useReducer(AppReducer.reducer, AppReducer.initialState);

  const {
    sideBar: { shouldRenderSideBar }
  } = state;

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <>
        <Head>
          <meta charSet="UTF-8" />
          <meta name="fragment" content="!" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta name="Referrer-Policy" value="no-referrer | same-origin" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable = no"
          />
          <meta name="theme-color" content="#13c7cd" />
          {/* ------ Favicon(s) start ------ */}
          {/* <link rel="icon" href={`${appConfig.FABICON_URL}/favicon.ico`} />
          <link rel="icon" type="image/png" sizes="32x32" href={`${appConfig.FABICON_URL}/favicon-32x32.png`} />
          <link rel="icon" type="image/png" sizes="16x16" href={`${appConfig.FABICON_URL}/favicon-16x16.png`} />
          <link rel="apple-touch-icon" sizes="180x180" href={`${appConfig.FABICON_URL}/apple-touch-icon.png`} />
          <link rel="mask-icon" href={`${appConfig.FABICON_URL}/safari-pinned-tab.svg`} color={appConfig.PRIMARY} /> */}
          {/* ------ Favicon(s) End ------ */}
          {process.env.NEXT_PUBLIC_ENV !== 'production' ? <meta name="robots" content="noindex,nofollow" /> : null}
        </Head>
        {shouldRenderSideBar && <SideBar />}

        <Component {...pageProps} />
        <Footer />
        {/* <Chat /> */}

        <ModalNotification />
        <MetaComponents />

        <AppEffect />
        <Toast />
      </>
    </AppContext.Provider>
  );
};

export function reportWebVitals(metric) {
  console.log('webvitals metrics', metric);
}

export default MyApp;
