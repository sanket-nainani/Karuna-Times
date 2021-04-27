import React from 'react';
import get from 'lodash/get';
import axios from '../framework/src/utils/ajax';
// import CMSComponent from '../framework/src/components/CMSComponent';

export default function TermsAndConditions({ html }) {
  // return <CMSComponent title="About Us" html={html} />;
  return null;
}

export async function getStaticProps() {
  const response = await axios({
    url: `${process.env.NEXT_PUBLIC_SECURE_EC2_URL}/cms/aboutus`,
    method: 'GET',
    headers: { 'x-origin': 'karunatimes.org' }
  });

  const responseData = get(response, 'data.data', {});
  let html = responseData.description;
  const first = html.indexOf('<script>') != -1 ? html.indexOf('<script>') + '<script>'.length : -1;
  const last = html.indexOf('</script>');
  const script = html.substring(first, last);
  html = html.replace('<script>', '');
  html = html.replace('</script>', '');
  html = html.replace(script, '');
  responseData.description = html;
  responseData.script = script;

  return {
    props: { html: responseData } // will be passed to the page component as props
  };
}
