const pkg = require('./package.json')
const path = require('path')
const base = require('./webpack.base')
const WebpackMonitor = require('webpack-monitor')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const autoprefixer = require('autoprefixer')
const webpack = require('webpack')

const postCssLoader = {
    loader: 'postcss-loader',
    options: {
        plugins: loader => [
            autoprefixer({ browsers: ['last 5 versions'] })
        ]
    }
}

const config = base.config

config.entry = {
    app: base.APP_PATH,
    vendor: Object.keys(pkg.dependencies).filter(key => key !== 'babel-runtime' && key !== 'antd')
}

config.output = {
    path: base.BUILD_PATH,
    filename: 'js/[name]-[chunkhash:8].js',
    chunkFilename: 'js/[name]-[chunkhash:8].js'
}

config.module.rules.push(
    {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                base.cssModule,
                postCssLoader,
                'sass-loader'
            ]
        }),
        exclude: base.NODE_MODULES_PATH,
        include: base.SRC_PATH
    },
    {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                'css-loader',
                postCssLoader
            ]
        })
    }
)

config.plugins.push(
    // 插入头
    new webpack.BannerPlugin('Copyright by jason925645402@gamil.com'),

    // css分割
    new ExtractTextPlugin('css/style-[chunkhash:8].css'),

    // 代码分割(抽取公共模块)
    new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor'],
        filename: 'js/[name]-[chunkhash:8].js',
        minChunks: Infinity
    }),

    new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        minChunks: Infinity
    }),

    // html模板
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        inject: true,
        minify: {
            removeComments: true,       // 去注释
            collapseWhitespace: true,   // 压缩空格
            removeAttributeQuotes: true // 去除属性引用
        },
        // 必须通过上面的 CommonsChunkPlugin 的依赖关系自动添加 js，css 等
        chunksSortMode: 'dependency'
    }),

    // 将manifest.js 注入html
    new InlineManifestWebpackPlugin({
        name: 'webpackManifest'
    }),

    // react开启生产环境压缩
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }),

    // 抽取 manifest
    new webpack.LoaderOptionsPlugin({
        minimize: true
    }),

    // 代码压缩
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),

    // 改善chunk传输
    new webpack.optimize.AggressiveMergingPlugin({
        minSizeReduce: 1.5,
        moveToParents: true
    }),

    // 排序输出
    new webpack.optimize.OccurrenceOrderPlugin(),

    // 分析模块
    new WebpackMonitor({
        capture: true,
        target: '../monitor/myStatsStore.json',
        launch: true,
        port: 4000,
    }),
    new BundleAnalyzerPlugin()
)

module.exports = config