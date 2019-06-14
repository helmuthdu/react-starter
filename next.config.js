const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass');

module.exports = withTypescript(
  withSass({
    distDir: '../dist',
    env: {},
    webpack(config, options) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack']
      });
      return config;
    }
  })
);
