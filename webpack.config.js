const path    = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin    = require('html-webpack-plugin')
const BrowserSyncPlugin    = require('browser-sync-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = {
    entry  : {
        app: "./src/assets/js/app.js",
        obg: "./src/assets/js/obg.js"
    },
    output : {
        filename: "./assets/js/[name].bundle.js",
        path    : path.resolve(__dirname, "dist")
    },
    module : {
        rules: [
            {
                test   : /\.(scss|css)$/,
                exclude: /node_modules/,
                use    : [
                    "style-loader",
                    {
                        loader : "css-loader",
                        options: {sourceMap: true},
                    },
                    {loader: "postcss-loader", options: {sourceMap: true}},
                    {loader: "sass-loader", options: {sourceMap: true}},
                ],
            },
            {
                test   : /\.ejs$/,
                loader : 'ejs-loader',
                options: {
                    esModule: false
                }
            },
            {
                test  : /\.hbs$/,
                loader: 'handlebars-loader',
            },
        ],
    },
    plugins: [
        new BrowserSyncPlugin({
            host  : 'localhost',
            port  : 3000,
            server: {baseDir: ['dist']}
        }),

        new MiniCssExtractPlugin({
            filename     : "[name].css",
            chunkFilename: '[id].css',
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
