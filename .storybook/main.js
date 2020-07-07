const path = require('path')
const svgoOpts = require('../webpack/optimization/svgo')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const webpackConf = require('../webpack/helpers/loaders')

module.exports = {
  stories: ['../src/**/*.stories.[tj]s'],
  webpackFinal: async (config) => {

    config.resolve = {
      extensions: ['.ts', '.js', '.vue', '.json'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@': path.join(__dirname, '../src'),
      }
    }

    webpackConf.forEach(loader => {
      if ('.vue'.match(loader.test)) return false
      return config.module.rules.push(loader)
    })

    config.module.rules.push({
      test: /\.stories\.ts?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: require.resolve('babel-loader')
        },
        {
          loader: require.resolve('@storybook/addon-storysource/loader')
        }
      ]
    });

    config.plugins.push(new ForkTsCheckerWebpackPlugin())
    return config
  },
}
