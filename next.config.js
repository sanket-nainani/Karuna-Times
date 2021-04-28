// const withSourceMaps = require('@zeit/next-source-maps');
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true'
// });

module.exports = {
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true
      }
    ];
  }
  // future: {
  //   webpack5: true
  // }
};
