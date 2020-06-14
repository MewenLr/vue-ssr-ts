const path = require('path')
const env = require('../helpers/environments')

module.exports = {
  template: path.resolve(__dirname, '../..', 'server/index.html'),
  favicon: path.resolve(__dirname, '../..', 'src/assets/icons/favicon.ico'),
  filename: env.prod ? path.resolve(__dirname, '../..', 'public/index.html') : /* default */ 'index.html',
}
