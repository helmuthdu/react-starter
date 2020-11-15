// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = withBundleAnalyzer({
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    config.resolve.alias['@'] = path.join(__dirname, 'src');

    config.plugins = config.plugins || [];
    config.plugins = [...config.plugins];

    return config;
  }
});
