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
                test  : /\.hbs$/,
                loader: 'handlebars-loader',
            },
            {
                test  : /\.html$/,
                loader: 'html-loader'
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
                    'sass-loader',
                    'import-glob-loader',
                    'postcss-loader'
                ]
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
                    from: 'src/assets/images',
                    to  : 'assets/images'
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
        }),

        new HtmlWebpackPlugin({
            filename          : "obrigado-boleto.html",
            template          : "./src/views/pages/obrigado-boleto.hbs",
            templateParameters: require("./site-data.json"),
            chunks            : ['obg']
        }),

        new HtmlWebpackPlugin({
            filename          : "obrigado-cartao.html",
            template          : "./src/views/pages/obrigado-cartao.hbs",
            templateParameters: require("./site-data.json"),
            chunks            : ['obg']
        }),

        new HtmlWebpackPlugin({
            filename          : "termos-de-uso.html",
            template          : "./src/views/pages/termos-de-uso.hbs",
            templateParameters: require("./site-data.json"),
            chunks            : ['obg']
        }),

        new HtmlWebpackPlugin({
            filename          : "politica-de-privacidade.html",
            template          : "./src/views/pages/politica-de-privacidade.hbs",
            templateParameters: require("./site-data.json"),
            chunks            : ['obg']
        }),
    ]
}

module.exports = config
