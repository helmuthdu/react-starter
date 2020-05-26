const path = require('path');

module.exports = ({ config }) => {
  return {
    ...config,
    mode: 'development',
    module: {
      ...config.module,
      rules: [
        {
          test: /\.(ts|tsx)$/,
          include: path.resolve(__dirname, '../src'),
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: {
                presets: [['react-app', { flow: false, typescript: true }]]
              }
            },
            require.resolve('react-docgen-typescript-loader')
          ]
        },
        ...config.module.rules
      ]
    }
  };
};
