const path = require('path')
const Dotenv = require('dotenv-webpack')
const WebpackBar = require('webpackbar')
const HtmlWebpack = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')

// const loaders = require('./helpers/loaders')

// module.exports = {

//   resolve: {
//     modules: ['node_modules'],
//     extensions: ['.ts', '.js', '.vue', '.json'],
//     alias: { '@': path.resolve(__dirname, '..', 'src') },
//   },

//   module: { rules: loaders },

//   plugins: [
//     new Dotenv(),
//     new WebpackBar(),
//     new VueLoaderPlugin(),
//     new SpriteLoaderPlugin(),
//     new HtmlWebpack(htmlOpts),
//     new CaseSensitivePathsPlugin(),
//   ],

// }

// Webpack-chain
// ----------------- //
/* eslint-disable indent */
const Config = require('webpack-chain')
const svgoOptions = require('./optimization/svgo')

const htmlOpts = require('./plugins/html')

const config = new Config()


config.resolve
  .modules
    .add('node_modules')
    .end()
  .alias
    .set('@', path.resolve(__dirname, '..', 'src'))
    .end()
  .extensions
    .add('.ts')
    .add('.js')
    .add('.vue')
    .add('.json')
    .end()


config.module
  .rule('vue')
    .test(/\.vue$/)
    .use('vue-loader')
      .loader('vue-loader')
      .end()

config.module
  .rule('ts')
    .test(/\.ts?$/)
    .use('ts-loader')
      .loader('ts-loader')
      .options({
        transpileOnly: true,
        happyPackMode: false,
        appendTsSuffixTo: [/\.vue$/],
      })
      .end()

config.module
  .rule('pug')
    .test(/\.pug?$/)
    .use('pug-plain-loader')
      .loader('pug-plain-loader')
      .end()

config.module
  .rule('js')
    .test(/\.js$/)
    .exclude.add(/(node_modules|bower_components)/)
      .end()
    .use('babel-loader')
      .loader('babel-loader')
      .end()

config.module
  .rule('images')
    .test(/\.(png|jpe?g|gif|ico)$/)
    .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 4096,
        esModule: false,
        fallback: {
          loader: 'file-loader',
          options: {
            name: 'img/[name].[hash:8].[ext]',
          },
        },
      })
      .end()

config.module
  .rule('svg')
    .test(/\.svg$/)
    .exclude.add(path.resolve(__dirname, '../..', 'src/assets/icons'))
      .end()
    .use('file-loader')
      .loader('file-loader')
      .options({
        loader: 'file-loader',
        options: {
          esModule: false,
          name: 'img/[name].[hash:8].[ext]',
        },
      })
      .end()

config.module
  .rule('media')
    .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)$/)
    .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 4096,
        fallback: {
          loader: 'file-loader',
          options: {
            name: 'media/[name].[hash:8].[ext]',
          },
        },
      })
      .end()

config.module
  .rule('font')
    .test(/\.(woff2?|eot|ttf|otf)$/)
    .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 4096,
        fallback: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[hash:8].[ext]',
          },
        },
      })
      .end()

config.module
  .rule('svg-icon')
    .test(/\.svg$/)
    .include.add(path.resolve(__dirname, '..', 'src/assets/icons'))
      .end()
    .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' })
      .end()
    .use('svgo-loader')
      .loader('svgo-loader')
      .options(svgoOptions)
      .end()


config
  .plugin('dotenv')
    .use(Dotenv)
    .end()
  .plugin('webpack-bar')
    .use(WebpackBar)
    .end()
  .plugin('vue-loader-plugin')
    .use(VueLoaderPlugin)
    .end()
  .plugin('sprite-loader')
    .use(SpriteLoaderPlugin)
    .end()
  .plugin('html-webpack')
    .use(HtmlWebpack, [htmlOpts])
    .end()
  .plugin('case-sensitive')
    .use(CaseSensitivePathsPlugin)
    .end()


module.exports = config
