/* eslint-disable indent,padded-blocks */
const path = require('path')
const WebpackBar = require('webpackbar')
const TerserPlugin = require('terser-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

const env = require('./helpers/environments')
const config = require('./webpack.config.js')
const terserOpts = require('./optimization/terser')
const chunksOpts = require('./optimization/chunks')

/* CLIENT */
if (env.client) {

  /* global */
  config.target('web')

  config
  .entry('index')
  .add(path.resolve(__dirname, '..', 'server/entry-client.js'))
  .end()
  .output
  .filename('js/client.bundle.js')
  .chunkFilename('js/[name].chunk.[hash:8].js')
  .path(path.resolve(__dirname, '..', 'public'))
  .end()

  config.devtool(false)

  /* plugins */
  config
    .plugin('ssr-client-plugin')
      .use(VueSSRClientPlugin)
      .end()
    .plugin('webpack-bar')
      .use(WebpackBar, [{ name: 'Client', color: 'green' }])
      .end()
    .plugin('mini-css-extract')
      .use(MiniCssExtractPlugin, [{
        filename: 'css/[name].bundle.[hash:8].css',
        chunkFilename: 'css/[name].chunk.[hash:8].css',
      }])
      .end()

  if (!env.analyze) config.plugin('clean-webpack').use(CleanWebpackPlugin)
  if (env.analyze) config.plugin('bundle-analyzer').use(BundleAnalyzerPlugin)

  /* optimization */
  config.optimization
    .minimize(true)
    .splitChunks(chunksOpts)
    .minimizer('terser')
      .use(TerserPlugin, [terserOpts])
      .end()

  /* modules */
  config.module
    .rule('css')
      .test(/\.css$/)
      .use('mini-css-extract')
        .loader(MiniCssExtractPlugin.loader)
        .end()
      .use('css-loader')
        .loader('css-loader')
        .options({ sourceMap: false })
        .end()

  config.module
    .rule('sass')
      .test(/\.s(a|c)ss$/)
      .use('mini-css-extract')
        .loader(MiniCssExtractPlugin.loader)
        .end()
      .use('css-loader')
        .loader('css-loader')
        .options({ sourceMap: false })
        .end()
      .use('postcss-loader')
        .loader('postcss-loader')
        .options({
          sourceMap: false,
          config: {
            path: path.resolve(__dirname, 'helpers/postcss.config.js'),
          },
        })
        .end()
      .use('sass-loader')
        .loader('sass-loader')
        .options({
          sourceMap: false,
          sassOptions: { indentedSyntax: true },
        })
        .end()
      .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          sourceMap: false,
          resources: path.resolve(__dirname, '..', 'src/assets/styles/**/*.sass'),
        })
        .end()

/* SERVER */
} else {

  /* global */
  config.target('node')

  config
    .entry('index')
      .add(path.resolve(__dirname, '..', 'server/entry-server.js'))
      .end()
    .output
      .libraryTarget('commonjs2')
      .filename('js/server.bundle.js')
      .chunkFilename('js/[name].chunk.[hash:8].js')
      .path(path.resolve(__dirname, '..', 'public'))
      .end()

  config.externals(nodeExternals({ whitelist: [/\.(sa|c)ss$/, /\.vue$/] }))

  config.devtool(false)

  /* plugins */
  config
    .plugin('ssr-server-plugin')
      .use(VueSSRServerPlugin)
      .end()
    .plugin('webpack-bar')
      .use(WebpackBar, [{ name: 'Server', color: 'orange' }])
      .end()

  /* optimization */
  config.optimization
    .splitChunks(false)
      .end()

  /* modules */
  config.module
    .rule('css')
      .test(/\.css$/)
      .use('css-loader')
        .loader('css-loader')
        .options({ sourceMap: false })
        .end()

  config.module
    .rule('sass')
      .test(/\.s(a|c)ss$/)
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

}

module.exports = config.toConfig()
