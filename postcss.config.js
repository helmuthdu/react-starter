const plugins = [require('postcss-import'), require('postcss-nesting'), require('autoprefixer')];

if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  plugins.push(require('cssnano'));
}

module.exports = {
  plugins
};
