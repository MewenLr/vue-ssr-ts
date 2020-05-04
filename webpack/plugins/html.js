const path = require('path')
const env = require('../helpers/environments')

module.exports = {
  inject: /* don't reinject assets in prod */ env.dev,
  customBody: env.prod ? '<!--vue-ssr-outlet-->' : '<div id="app"></div>',
  template: path.resolve(__dirname, '../..', 'public/index.template.html'),
  filename: env.prod ? path.resolve(__dirname, '../..', 'server/index.html') : /* default */ 'index.html',
}
