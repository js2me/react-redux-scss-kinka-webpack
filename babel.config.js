module.exports = function getBabelConfig(api) {
  api.cache(false);

  const isProd = process.env.NODE_ENV === 'production';

  return {
    sourceMaps: !isProd,
    presets: [
      '@babel/react',
      [
        '@babel/env',
        {
          debug: !isProd,
          modules: 'commonjs',
          loose: true,
          forceAllTransforms: true,
          useBuiltIns: 'usage'
        }
      ]
    ],
    plugins: ['@babel/plugin-proposal-class-properties']
  };
};
