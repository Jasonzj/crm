const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

const isDev = process.env.NODE_ENV === 'dev'
console.log(`当前运行环境：${isDev ? 'development' : 'production'}`)

// 路径
const resolve = path.resolve
const ROOT_PATH = resolve(__dirname)
const SRC_PATH = resolve(ROOT_PATH, 'src')
const APP_PATH = resolve(SRC_PATH, 'entry.js')
const BUILD_PATH = resolve(ROOT_PATH, 'build')
const NODE_MODULES_PATH = resolve(ROOT_PATH, 'node_modules')
const ACTION_PATH = resolve(ROOT_PATH, 'src/redux/action')
const DUCKS_PATH = resolve(ROOT_PATH, 'src/ducks')
const REDUCERS_PATH = resolve(ROOT_PATH, 'src/redux/reducers')
const STORE_PATH = resolve(ROOT_PATH, 'src/redux/store')
const ROUTER_PATH =  resolve(ROOT_PATH, 'src/router')
const COMPONENTS_PATH =  resolve(ROOT_PATH, 'src/components')
const CONTAINERS_PATH =  resolve(ROOT_PATH, 'src/containers')
const UTILS_PATH = resolve(ROOT_PATH, 'src/utils')
const PUBLIC_PATH = resolve(ROOT_PATH, './public')
const MOCK_PATH =  resolve(ROOT_PATH, './mock')

// server
const DEFAULT_PORT = 8000           // 端口
const DEFAULT_HOST = 'localhost'    // host地址

// exports
exports.DEFAULT_PORT = DEFAULT_PORT
exports.DEFAULT_HOST = DEFAULT_HOST
exports.NODE_MODULES_PATH = NODE_MODULES_PATH
exports.APP_PATH = APP_PATH
exports.SRC_PATH = SRC_PATH
exports.BUILD_PATH = BUILD_PATH

// config
exports.config = {
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.css'],
        modules: [
            NODE_MODULES_PATH,
            SRC_PATH
        ],
        alias: {
            action: ACTION_PATH,
            reducers: REDUCERS_PATH,
            ducks: DUCKS_PATH,
            store: STORE_PATH,
            router: ROUTER_PATH,
            components: COMPONENTS_PATH,
            containers: CONTAINERS_PATH,
            utils: UTILS_PATH,
            public: PUBLIC_PATH,
            mock: MOCK_PATH
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader?cacheDirectory',
                exclude: NODE_MODULES_PATH,
                include: SRC_PATH
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                module: true,
                                sourceMap: true,
                                localIdentName: '[name]__[local]___[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: loader => [
                                    autoprefixer({ browsers: ['last 5 versions'] })
                                ]
                            }
                        },
                        'sass-loader'
                    ]
                }),
                exclude: NODE_MODULES_PATH,
                include: SRC_PATH
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: loader => [
                                    autoprefixer({ browsers: ['last 5 versions'] })
                                ]
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: ['url-loader?limit=1000&name=files/[md5:hash:base64:10].[ext]'],
                exclude: NODE_MODULES_PATH,
                include: SRC_PATH
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __DEV__: isDev
        })
    ]
}