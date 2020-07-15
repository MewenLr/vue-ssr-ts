const path = require('path')
const svgoOpts = require('../optimization/svgo')

module.exports = [

  /* vue-loader */
  {
    test: /\.vue$/,
    use: [
      {
        loader: 'cache-loader',
        options: {
          cacheDirectory: path.resolve(__dirname, '../..', 'node_modules/.cache/vue-loader'),
          cacheIdentifier: '735d2f52',
        },
      },
      {
        loader: 'vue-loader',
        options: {
          cacheDirectory: path.resolve(__dirname, '../..', 'node_modules/.cache/vue-loader'),
          cacheIdentifier: '735d2f52',
        },
      },
    ],
  },

  /* ts-loader */
  {
    test: /\.ts?$/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          happyPackMode: false,
          appendTsSuffixTo: [/\.vue$/],
        },
      },
    ],
  },

  /* pug-plain-loader */
  {
    test: /\.pug$/,
    use: [
      {
        loader: 'pug-plain-loader',
      },
    ],
  },

  /* babel-loader */
  {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: [
      {
        loader: 'cache-loader',
        options: {
          cacheDirectory: path.resolve(__dirname, '../..', 'node_modules/.cache/babel-loader'),
          cacheIdentifier: '4d286ef4',
        },
      },
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: path.resolve(__dirname, '../..', 'node_modules/.cache/babel-loader'),
          cacheIdentifier: '4d286ef4',
        },
      },
    ],
  },

  /* assets */
  {
    test: /\.(png|jpe?g|gif|ico)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 4096,
          esModule: false,
          fallback: {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[hash:8].[ext]',
            },
          },
        },
      },
    ],
  },
  {
    test: /\.svg$/,
    exclude: path.resolve(__dirname, '../..', 'src/assets/icons'),
    use: [
      {
        loader: 'file-loader',
        options: {
          esModule: false,
          name: 'img/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 4096,
          fallback: {
            loader: 'file-loader',
            options: {
              name: 'media/[name].[hash:8].[ext]',
            },
          },
        },
      },
    ],
  },
  {
    test: /\.(woff2?|eot|ttf|otf)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 4096,
          fallback: {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[hash:8].[ext]',
            },
          },
        },
      },
    ],
  },

  /* svg-icon */
  {
    test: /\.svg$/,
    include: path.resolve(__dirname, '../..', 'src/assets/icons'),
    use: [
      {
        loader: 'svg-sprite-loader',
        options: {
          symbolId: 'icon-[name]',
        },
      },
      {
        loader: 'svgo-loader',
        options: svgoOpts,
      },
    ],
  },

]
