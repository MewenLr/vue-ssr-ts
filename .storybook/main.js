const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const webpackConf = require('../webpack/helpers/loaders')

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

    webpackConf.forEach(loader => {
      if ('.vue'.match(loader.test)) return false
      return config.module.rules.push(loader)
    })

    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: 'vue-style-loader',
        },
        {
          loader: 'css-loader', options: { sourceMap: true },
        },
      ],
    });

    config.module.rules.push({
      test: /\.s(a|c)ss$/,
      use: [
        {
          loader: 'vue-style-loader',
        },
        {
          loader: 'css-loader', options: { sourceMap: true },
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            config: {
              path: path.resolve(__dirname, '..', 'webpack/helpers/postcss.config.js'),
            },
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            sassOptions: { indentedSyntax: true },
          },
        },
        {
          loader: 'sass-resources-loader',
          options: {
            sourceMap: true,
            resources: path.resolve(__dirname, '..', 'src/assets/styles/**/*.sass'),
          },
        },
      ],
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
    })

    // console.dir(config, { depth: null })
    config.plugins.push(new ForkTsCheckerWebpackPlugin())
    return config
  },
}
