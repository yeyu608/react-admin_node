const { merge } = require('webpack-merge');
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const serve = require('./serve.js')
const build = require('./build.js');

const resolve = arg => {
    return path.resolve(__dirname, '../', arg)
}

const config = {
    entry: {
        venders: ['react', 'react-dom', 'react-router-dom','antd'],
        app: {
            import: resolve('src/main.js'),
            dependOn: 'venders'
        }
    },
    output: {
        path: resolve('dist'),
        filename: 'js/[name].[chunkhash].js',
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve('public/index.html'),
            filename: 'index.html',
            inject: 'body',
            title: '练习'
        }),
        new webpack.ProgressPlugin({
            handler(percentage, message) {
                console.info(`${Math.floor(percentage * 100)}% ：${message}`)
            }
        }),
        new MiniCssExtractPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[name].[hash].[ext]'
                }
            },
            {
                test: /\.(js|jsx|ts|tsx)$/i,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "thread-loader",
                    },
                    {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true
                        }
                    }]
            },
            {
                test: /\.(ts|tsx)$/i,
                include: path.resolve('src'),
                use:[
                    {
                        loader:'ts-loader',
                        options:{
                            happyPackMode:true
                        }
                    }
                ]
            }
        ],
    },
    optimization: {
        minimizer:[
            new CssMinimizerPlugin()
        ],
        splitChunks:{
            chunks:'all',
            name:'common'
        }
    },
    resolve: {
        alias: {
            "@": resolve('src'),
            "url":false,
            "http":false,
            "https":false,
            "stream":false,
            "assert":false,
            "zlib": false
        },
        // 允许忽略后缀
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        modules: ["node_modules"]
    }
}

module.exports = ({ development }) => {
    return merge(config, development ? serve : build)
}