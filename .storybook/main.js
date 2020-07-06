// module.exports = {
//   stories: ['../src/**/*.stories.[tj]s'],
// }

const path = require('path')
const webpackConf = require('./webpack.config')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
  stories: ['../src/**/*.stories.[tj]s'],
  webpackFinal: async (config) => {

    config.module.rules.push({
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader', 'postcss-loader'],
      include: path.resolve(__dirname, '../'),
    });

    config.module.rules.push({
      test: /\.s(a|c)ss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      // include: path.resolve(__dirname, '../assets/styles')
    });

    config.resolve = {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        // 'assets': path.resolve('../src/assets'),
        '@': path.join(__dirname, '../src'),
      }
    };

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
  },
};

// module.exports = {
//   stories: ['../src/**/*.stories.[tj]s'],
//   webpackFinal: async (config) => {
//     config.module.rules.push({
//       test: /\.(ts|tsx)$/,
//       use: [
//         {
//           loader: require.resolve('ts-loader'),
//         },
//         // Optional
//         // {
//         //   loader: require.resolve('react-docgen-typescript-loader'),
//         // },
//       ],
//     });
//     config.resolve.extensions.push('.ts', '.tsx');
//     return config;
//   },
// };

// import { configure } from '@storybook/vue';

// import '../src/plugins';
// import '../src/assets/styles/main.scss';

// const req = require.context('../src/components', true, /.stories.ts$/);
// function loadStories() {
//   req.keys().forEach(filename => req(filename));
// }

// configure(loadStories, module)