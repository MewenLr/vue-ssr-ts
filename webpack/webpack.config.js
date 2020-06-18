const path = require('path')
const WebpackBar = require('webpackbar')
const HtmlPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')

const htmlOpts = require('./plugins/html')
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
    new HtmlPlugin(htmlOpts),
    new SpriteLoaderPlugin(),
    new CaseSensitivePathsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].bundle.[hash:8].css',
      chunkFilename: 'css/[name].chunk.[hash:8].css',
    }),
  ],

}
