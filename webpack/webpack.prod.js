const path = require('path')
const merge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

const env = require('./helpers/environments')
const terserOpts = require('./optimization/terser')
const chunksOpts = require('./optimization/chunks')
const baseWebpackConfig = require('./webpack.config')

const clientConfig = {
  target: 'web',
  entry: { client: path.resolve(__dirname, '..', 'server/entry-client.js') },
  output: {
    filename: 'js/client.bundle.js',
    chunkFilename: 'js/[name].chunk.[hash:8].js',
    path: path.resolve(__dirname, '..', 'public'),
  },
  devtool: false,
  plugins: [
    new VueSSRClientPlugin(),
    ...(!env.analyze ? [new CleanWebpackPlugin()] : []),
    ...(env.analyze ? [new BundleAnalyzerPlugin()] : []),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(terserOpts)],
    splitChunks: chunksOpts,
  },
}

const serverConfig = {
  target: 'node',
  entry: { server: path.resolve(__dirname, '..', 'server/entry-server.js') },
  output: {
    libraryTarget: 'commonjs2',
    filename: 'js/server.bundle.js',
    chunkFilename: 'js/[name].chunk.[hash:8].js',
    path: path.resolve(__dirname, '..', 'public'),
  },
  externals: nodeExternals({ whitelist: [/\.(sa|c)ss$/, /\.vue$/] }),
  devtool: false,
  plugins: [
    new VueSSRServerPlugin(),
  ],
  optimization: {
    splitChunks: false,
  },
}

module.exports = merge(baseWebpackConfig, env.client ? clientConfig : serverConfig)
