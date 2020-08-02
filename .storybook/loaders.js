const path = require('path')
const svgoOpts = require('../webpack/optimization/svgo')

module.exports = [

  /* vue-loader */
  {
    test: /\.vue$/,
    use: [
      {
        loader: 'vue-loader',
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
        loader: 'babel-loader',
      },
    ],
  },

  /* css-loader */
  {
    test: /\.css$/,
    use: [
      {
        loader: 'vue-style-loader',
      },
      {
        loader: 'style-loader',
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
        loader: 'style-loader',
      },
      {
        loader: 'css-loader', options: { sourceMap: true },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          config: {
            path: path.resolve(__dirname, '..', 'webpack/helpers/postcss.config.js'),
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
    exclude: path.resolve(__dirname, '..', 'src/assets/icons'),
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
    include: path.resolve(__dirname, '..', 'src/assets/icons'),
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

  /* stories */
  {
    test: /\.stories\.ts?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: require.resolve('babel-loader')
      },
      {
        loader: require.resolve('@storybook/addon-storysource/loader')
      }
    ]
  },

]
