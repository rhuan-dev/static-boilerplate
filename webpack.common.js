const path                 = require('path')
const HtmlWebpackPlugin    = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin           = require('copy-webpack-plugin')

const config = {
    entry  : {
        app: "./src/assets/js/app.js",
        obg: "./src/assets/js/obg.js"
    },
    output : {
        filename  : "assets/js/[name].bundle.js",
        path      : path.resolve(__dirname, "dist"),
        publicPath: ""
    },
    module : {
        rules: [
            {
                test: /\.hbs$/,
                use : {
                    loader : "handlebars-loader",
                    options: {
                        helperDirs: path.join(__dirname, 'helpers'),
                    }
                }
            },
            {
                test  : /\.html$/,
                loader: 'html-loader'
            },
            {
                test   : /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                loader : 'babel-loader'
            },
            {
                test   : /\.css$/,
                use    : [
                    MiniCssExtractPlugin.loader,
                    {
                        loader : 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
                ],
                exclude: /\.module\.css$/
            },
            {
                test   : /\.css$/,
                use    : [
                    MiniCssExtractPlugin.loader,
                    {
                        loader : 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules      : true
                        }
                    },
                    'postcss-loader'
                ],
                include: /\.module\.css$/
            },
            {
                test: /\.scss$/,
                use : [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                    'import-glob-loader',
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use : {
                    loader : "url-loader",
                    options: {
                        limit     : 8192,
                        name      : "[folder]/[name].[ext]",
                        outputPath: 'assets/fonts',
                        publicPath: "../../assets/fonts"
                    },
                }
            },
            {
                test   : /\.(jpe?g|png|gif|svg)$/i,
                include: path.resolve(__dirname, 'src/assets/images'),
                use    : [
                    {
                        loader : "file-loader",
                        options: {
                            name      : "[name].[ext]",
                            outputPath: "assets/images/",
                            publicPath: "../images/"
                        }
                    }
                ]
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from            : './src/assets/images',
                    to              : 'assets/images',
                    noErrorOnMissing: true,
                },
                {
                    from            : "./src/assets/fonts",
                    to              : 'assets/fonts',
                    noErrorOnMissing: true
                }
            ],
        }),

        new MiniCssExtractPlugin({
            filename: "assets/css/[name].css"
        }),

        new HtmlWebpackPlugin({
            filename          : "index.html",
            template          : "./src/views/pages/index.hbs",
            templateParameters: require("./site-data.json"),
            chunks            : ['app']
        })
    ]
}

module.exports = config
