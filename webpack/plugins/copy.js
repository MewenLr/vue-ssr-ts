const path = require('path')

module.exports = [
  {
    from: path.resolve(__dirname, '../..', 'public'),
    to: 'public',
    toType: 'dir',
    ignore: [{ glob: 'index.html', matchBase: false }],
  },
]
