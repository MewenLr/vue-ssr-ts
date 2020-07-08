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

})
