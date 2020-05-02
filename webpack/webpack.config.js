const path = require('path')
const WebpackBar = require('webpackbar')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')

const htmlOpts = require('./plugins/html')
const copyOpts = require('./plugins/copy')
const loaders = require('./helpers/loaders')

module.exports = {

  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: { '@': path.resolve(__dirname, '..', 'src') },
  },

  module: { rules: loaders },

  plugins: [
    new WebpackBar(),
    new VueLoaderPlugin(),
    new CopyPlugin(copyOpts),
    new HtmlPlugin(htmlOpts),
    new CaseSensitivePathsPlugin(),
  ],

}
