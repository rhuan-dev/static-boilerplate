const path    = require('path')
const {merge} = require('webpack-merge')
const common  = require('./webpack.common')

const config = merge(common, {
    devtool  : 'inline-source-map',
    devServer: {
        port            : 3000,
        open            : true,
        contentBase     : path.resolve(__dirname, "./src/views"),
        watchContentBase: true,
        hot             : true
    },
})

module.exports = config
