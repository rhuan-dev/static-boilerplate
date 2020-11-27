const path                 = require('path')
const {merge}              = require('webpack-merge')
const common               = require('./webpack.common')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// removido por incompatibilidade webpack 5
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// const smp = new SpeedMeasurePlugin();

const config = merge(common, {
    devtool     : 'inline-source-map',
    devServer   : {
        port            : 3000,
        open            : true,
        contentBase     : path.resolve(__dirname, "./src/views"),
        watchContentBase: true,
        hot             : true,
    },
    plugins     : [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
        })
    ],
    optimization: {
        runtimeChunk: 'single',
        splitChunks : {
            cacheGroups: {
                vendor: {
                    test  : /[\\/]node_modules[\\/]/,
                    name  : 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
})

module.exports = config
