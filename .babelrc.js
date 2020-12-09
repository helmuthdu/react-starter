module.exports = function (api) {
  api.cache(false);

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          esmodules: true
        }
      }
    ],
    '@babel/typescript',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic'
      }
    ]
  ];

  return {
    presets
  };
};
