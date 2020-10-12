// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = withBundleAnalyzer({
  distDir: '../dist',
  env: {},
  webpack(config) {
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
    ];

    return config;
  }
});
