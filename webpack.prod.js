const {merge}              = require('webpack-merge')
const common               = require('./webpack.common')
const CompressionPlugin    = require('compression-webpack-plugin')
const CssMinimizerPlugin   = require('css-minimizer-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const {CleanWebpackPlugin}   = require('clean-webpack-plugin')

const config = merge(common, {
    module      : {},
    plugins     : [
        new CleanWebpackPlugin(),

        new ImageMinimizerPlugin({
            deleteOriginalAssets: false,
            filename            : 'assets/images/webp/[name].webp',
            minimizerOptions    : {
                plugins: ['imagemin-webp'],
            },
        }),

        new ImageMinimizerPlugin({
            minimizerOptions: {
                plugins: [
                    ['pngquant', {
                        quality: '65-90'
                    }],
                    ['gifsicle', {interlaced: true}],
                    ['mozjpeg', {quality: 90}],
                    ['svgo', {
                        plugins: [
                            {
                                removeViewBox: false,
                            },
                        ],
                    }]
                ],
            },
        }),

        new CompressionPlugin(),
    ],
    optimization: {
        minimize    : true,
        minimizer   : [
            new CssMinimizerPlugin()
        ],
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
