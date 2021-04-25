import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../framework/src/components/Header';
import ItemNotFound from '../framework/src/components/ItemNotFound';

function Page404() {
  return (
    <>
      <Head>
        <meta charSet="utf-8" name="robots" />
        <title>404 | Not Found</title>
      </Head>
      <Header hasShadow hasWhiteBg />
      <div className="container page-404">
        <ItemNotFound className="eight-rem-pt" text="The page you are looking for does not exist">
          <h3>Error 404</h3>
        </ItemNotFound>
        <div className="text-center">
          <Link href="/">
            <a href="/" className="text-underline">
              Go to Home
            </a>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Page404;
