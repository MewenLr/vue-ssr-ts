const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const baseWebpackConfig = require('./webpack.config')

module.exports = merge(baseWebpackConfig, {

  entry: path.resolve(__dirname, '..', 'server/entry-client.js'),

  output: {
    filename: 'js/client.bundle.js',
    chunkFilename: 'js/[name].chunk.js',
  },

  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    quiet: true,
    host: '0.0.0.0',
    historyApiFallback: true,
    watchOptions: {
      poll: true,
    },
  },

  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],

  module: {
    rules: [
      /* css-loader */
      {
        test: /\.css$/,
        use: [
          {
            loader: 'vue-style-loader',
          },
          {
            loader: 'css-loader', options: { sourceMap: true },
          },
        ],
      },

      /* sass-loader */
      {
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
                path: path.resolve(__dirname, 'helpers/postcss.config.js'),
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
      },
    ],
  },

})
