const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const loaders = require('./loaders')

module.exports = {
  stories: ['../src/**/*.stories.[tj]s'],
  webpackFinal: async (config) => {

    config.entry = [
      ...config.entry,
      path.resolve(__dirname, '..', 'src/app.ts')
    ]

    config.resolve = {
      extensions: ['.ts', '.js', '.vue', '.json'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@': path.join(__dirname, '../src'),
      }
    }

    loaders.forEach(loader => {
      if ('.vue'.match(loader.test)) return false
      return config.module.rules.push(loader)
    })

    // console.dir(config, { depth: null })
    config.plugins.push(new ForkTsCheckerWebpackPlugin())
    return config
  },
}
