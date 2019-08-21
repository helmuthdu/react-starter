/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withSass = require('@zeit/next-sass');
const path = require('path');

module.exports = withBundleAnalyzer(
  withSass({
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[name]__[local]__[hash:base64:5]',
      camelCase: true
    },
    distDir: '../dist',
    env: {},
    analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: 'static',
        reportFilename: 'server.html'
      },
      browser: {
        analyzerMode: 'static',
        reportFilename: 'client.html'
      }
    },
    webpack(config, options) {
      config.module.rules.push(
        {
          test: /\.svg$/,
          use: ['@svgr/webpack']
        },
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto'
        }
      );
      config.resolve.alias['@'] = path.join(__dirname, 'client');
      return config;
    }
  })
);
