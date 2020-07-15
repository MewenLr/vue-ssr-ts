module.exports = {
  cacheGroups: {

    styles: {
      name: 'styles',
      test: /\.(css|sass)$/,
      chunks: 'initial',
      priority: 10,
      enforce: true,
    },

    vendors: {
      name: 'vendors',
      test: /[\\/]node_modules[\\/]/,
      priority: -10,
      chunks: 'initial',
    },

    common: {
      name: 'common',
      minChunks: 2,
      priority: -20,
      chunks: 'initial',
      reuseExistingChunk: true,
    },

  },
}
