import React from 'react';
import Head from 'next/head';

const MetaComponents = () => {
  return (
    <Head>
      <meta property="og:title" content="Karuna Times" />
      <meta property="og:description" content="Covid-19 Information" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="627" />
      <meta property="og:image" content="/static/images/default.png" />
      <meta property="og:image:alt" content="" />
      <meta property="og:url" content="karunatimes.org" />
      <meta property="og:site_name" content="Karuna Times" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
    </Head>
  );
};

export default MetaComponents;
