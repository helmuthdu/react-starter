require('dotenv').config();

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});
const withSass = require('@zeit/next-sass');
const path = require('path');
const Dotenv = require('dotenv-webpack');

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

      config.plugins = config.plugins || [];
      config.plugins = [
        ...config.plugins,

        // Read the .env file
        new Dotenv({
          path: path.join(__dirname, '.env'),
          systemvars: true
        })
      ];

      return config;
    }
  })
);
