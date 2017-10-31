const webpack = require('webpack')
const base = require('./webpack.base')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// config
const config = base.config

config.entry = [
    `webpack-dev-server/client?http://${base.DEFAULT_HOST}:${base.DEFAULT_PORT}`,
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    base.APP_PATH
]

config.output = {
    path: base.BUILD_PATH,
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js'
}

config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('css/style.css'),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html'
    }),
    new webpack.SourceMapDevToolPlugin({
        filename: '[file].map'
    })
)

module.exports = base