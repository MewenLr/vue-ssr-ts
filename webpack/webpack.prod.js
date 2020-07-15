const path = require('path')
const merge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

const env = require('./helpers/environments')
const terserOpts = require('./optimization/terser')
const chunksOpts = require('./optimization/chunks')
const baseWebpackConfig = require('./webpack.config')

const clientConfig = {
  target: 'web',
  entry: {
    client: path.resolve(__dirname, '..', 'server/entry-client.js'),
  },
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
    new MiniCssExtractPlugin({
      filename: 'css/[name].bundle.[hash:8].css',
      chunkFilename: 'css/[name].chunk.[hash:8].css',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(terserOpts)],
    splitChunks: chunksOpts,
  },
  module: {
    rules: [
      /* css-loader */
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
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
            loader: MiniCssExtractPlugin.loader,
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
  module: {
    rules: [
      /* css-loader */
      {
        test: /\.css$/,
        use: [
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
}

module.exports = merge(baseWebpackConfig, env.client ? clientConfig : serverConfig)
