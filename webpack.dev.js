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
            loader: 'css-loader',
            options: {
                module: true,
                sourceMap: true,
                localIdentName: '[name]__[local]___[hash:base64:5]'
            }
        },
        {
            loader: 'sass-loader'
        }
    ],
    exclude: base.NODE_MODULES_PATH,
    include: base.SRC_PATH
}

config.module.rules[2] = {
    test: /\.css$/,
    use: [
        {
            loader: 'style-loader'
        },
        {
            loader: 'css-loader'
        }
    ]
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