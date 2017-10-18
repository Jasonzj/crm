const webpack = require('webpack')
const base = require('./webpack.base')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// config
const config = base.config

config.module.rules[1] = {
    test: /\.scss$/,
    use: [
        {
            loader: 'style-loader'
        },
        {
            loader: 'css-loader'
        },
        {
            loader: 'sass-loader'
        }
    ],
    exclude: base.NODE_MODULES_PATH,
    include: base.SRC_PATH
}

config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html'
    }),
    new webpack.SourceMapDevToolPlugin({
        filename: '[file].map'
    })
)

module.exports = base