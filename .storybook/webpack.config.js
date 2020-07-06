
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');

module.exports = async ({ config }) => {

  config.resolve = {
    // extensions: ['.js', '.vue', '.json'],
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      // 'assets': path.resolve('../src/assets'),
      '@': path.join(__dirname, '../src'),
    }
  };

  config.module.rules.push({
    test: /\.css$/,
    loaders: ['vue-style-loader', 'css-loader'],
    include: path.resolve(__dirname, '../src'),
  });

  config.module.rules.push({
    test: /\.s(a|c)ss$/,
    use: [
      { loader: 'vue-style-loader' },
      { loader: 'css-loader' },
      {
        loader: 'postcss-loader',
        options: {
          config: {
            path: path.resolve(__dirname, '../webpack/helpers', 'postcss.config.js'),
          },
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sassOptions: { indentedSyntax: true },
          // sassOptions: { indentedSyntax: false },
        },
      },
      {
        loader: 'sass-resources-loader',
        options: {
          resources: path.resolve(__dirname, '..', 'src/assets/styles/**/*.sass'),
        },
      },
    ],
    // use: ['vue-style-loader', 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../src')
  });

  config.module.rules.push({
    test: /\.pug$/,
    use: ['pug-plain-loader'],
    // include: path.resolve(__dirname, '../assets/styles')
  });

  config.module.rules.push({
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
  });

  config.module.rules.push({
    test: /\.ts$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true
        },
      }
    ]
  });

  config.plugins.push(new ForkTsCheckerWebpackPlugin());

  return config;
};
