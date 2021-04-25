const withSourceMaps = require('@zeit/next-source-maps');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const withImages = require('next-images');
const withFonts = require('next-fonts');
const CopyPlugin = require('copy-webpack-plugin');
const DotenvPlugin = require('webpack-dotenv-plugin');

module.exports =
  // withBundleAnalyzer(
  withSourceMaps(
    withFonts(
      withImages({
        cssLoaderOptions: {
          getLocalIdent: (context, localIdentName, localName, options) => localName
        },
        cssModules: true,
        webpack: config => {
          // config.node = {
          //   fs: 'empty'
          // };
          config.plugins.push(
            new DotenvPlugin({
              sample: './.env.default',
              path: './.env'
            })
          );
          config.plugins.push(new CopyPlugin([{ from: 'public/static/images', to: 'static/images' }]));
          return config;
        },
        async redirects() {
          return [
            {
              source: '/home',
              destination: '/',
              permanent: true
            }
          ];
        },
        future: {
          webpack5: true
        }
      })
    )
    // )
  );
