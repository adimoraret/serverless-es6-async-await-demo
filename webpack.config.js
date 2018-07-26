var nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: { handler: './handler.js' },
  target: 'node',
  mode: 'development',
  externals: [nodeExternals()]
}