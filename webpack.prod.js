const path                 = require('path')
const glob                 = require('glob')
const {merge}              = require('webpack-merge')
const common               = require('./webpack.common')
const CompressionPlugin    = require('compression-webpack-plugin')
const CssMinimizerPlugin   = require('css-minimizer-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const PurgecssPlugin       = require('purgecss-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const PATHS = {
    src: path.join(__dirname, 'src')
}

const config = merge(common, {
    mode        : 'production',
    devtool     : false,
    module      : {},
    plugins     : [
        new CleanWebpackPlugin(),

        // new ImageMinimizerPlugin({
        //     deleteOriginalAssets: false,
        //     filename            : 'assets/images/webp/[name].webp',
        //     exclude             : /\.svg$/,
        //     minimizerOptions    : {
        //         plugins: ['imagemin-webp'],
        //     },
        // }),

        new ImageMinimizerPlugin({
            minimizerOptions: {
                plugins: [
                    ['pngquant', {
                        quality: [0.65, 0.9]
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

        new PurgecssPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`, {nodir: true}),
        }),

        new CompressionPlugin({
            test: /\.js(\?.*)?$/i
        }),
        
        new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            openAnalyzer: true,
        })
    ],
    optimization: {
        minimize    : true,
        runtimeChunk: 'single',
        splitChunks : {
            cacheGroups: {
                vendor: {
                    test  : /[\\/]node_modules[\\/]/,
                    name  : 'vendors',
                    chunks: 'all'
                },
                styles: {
                    name   : 'styles',
                    test   : /\.css$/,
                    chunks : 'all',
                    enforce: true
                }
            }
        }
    }
})

module.exports = config
