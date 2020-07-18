const path = require('path')
const webpack = require('webpack')
// const merge = require('webpack-merge')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

// const baseWebpackConfig = require('./webpack.config')

// module.exports = merge(baseWebpackConfig, {

//   entry: path.resolve(__dirname, '..', 'server/entry-client.js'),

//   output: {
//     filename: 'js/client.bundle.js',
//     chunkFilename: 'js/[name].chunk.js',
//   },

//   devtool: 'inline-source-map',

//   devServer: {
//     hot: true,
//     quiet: true,
//     host: '0.0.0.0',
//     historyApiFallback: true,
//     watchOptions: {
//       poll: true,
//     },
//   },

//   plugins: [
//     new FriendlyErrorsWebpackPlugin(),
//     new webpack.HotModuleReplacementPlugin(),
//   ],

//   module: {
//     rules: [
//       /* css-loader */
//       {
//         test: /\.css$/,
//         use: [
//           {
//             loader: 'vue-style-loader',
//           },
//           {
//             loader: 'css-loader', options: { sourceMap: true },
//           },
//         ],
//       },

//       /* sass-loader */
//       {
//         test: /\.s(a|c)ss$/,
//         use: [
//           {
//             loader: 'vue-style-loader',
//           },
//           {
//             loader: 'css-loader', options: { sourceMap: true },
//           },
//           {
//             loader: 'postcss-loader',
//             options: {
//               sourceMap: true,
//               config: {
//                 path: path.resolve(__dirname, 'helpers/postcss.config.js'),
//               },
//             },
//           },
//           {
//             loader: 'sass-loader',
//             options: {
//               sourceMap: true,
//               sassOptions: { indentedSyntax: true },
//             },
//           },
//           {
//             loader: 'sass-resources-loader',
//             options: {
//               sourceMap: true,
//               resources: path.resolve(__dirname, '..', 'src/assets/styles/**/*.sass'),
//             },
//           },
//         ],
//       },
//     ],
//   },

// })

// Webpack-chain
// ----------------- //
/* eslint-disable indent */
const config = require('./webpack.config.js')

config
  .entry('index')
    .add(path.resolve(__dirname, '..', 'server/entry-client.js'))
    .end()
  .output
    .filename('js/client.bundle.js')
    .chunkFilename('js/[name].chunk.js')
    .end()


config.devtool('inline-source-map')


config.devServer
  .hot(true)
  .quiet(true)
  .host('0.0.0.0')
  .historyApiFallback(true)
  .watchOptions({ poll: true })


config
  .plugin('friendly-error')
    .use(FriendlyErrorsWebpackPlugin)
    .end()
  .plugin('hmr')
    .use(webpack.HotModuleReplacementPlugin)
    .end()


config.module
  .rule('css')
    .test(/\.css$/)
    .use('vue-style-loader')
      .loader('vue-style-loader')
      .end()
    .use('css-loader')
      .loader('css-loader')
      .options({ sourceMap: true })
      .end()

config.module
  .rule('sass')
    .test(/\.s(a|c)ss$/)
    .use('vue-style-loader')
      .loader('vue-style-loader')
      .end()
    .use('css-loader')
      .loader('css-loader')
      .options({ sourceMap: true })
      .end()
    .use('postcss-loader')
      .loader('postcss-loader')
      .options({
        sourceMap: true,
        config: {
          path: path.resolve(__dirname, 'helpers/postcss.config.js'),
        },
      })
      .end()
    .use('sass-loader')
      .loader('sass-loader')
      .options({
        sourceMap: true,
        sassOptions: { indentedSyntax: true },
      })
      .end()
    .use('sass-resources-loader')
      .loader('sass-resources-loader')
      .options({
        sourceMap: true,
        resources: path.resolve(__dirname, '..', 'src/assets/styles/**/*.sass'),
      })
      .end()


module.exports = config.toConfig()
