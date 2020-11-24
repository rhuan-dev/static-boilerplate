const {merge}           = require('webpack-merge')
const common            = require('./webpack.config')
const CompressionPlugin = require('compression-webpack-plugin')

const config = merge(common, {
    module : {},
    plugins: [
        new CompressionPlugin(),
    ]
})

module.exports = config
