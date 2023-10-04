const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 将css从js中分离出来

const isDEV = process.env.NODE_ENV === 'development' // 是否是开发模式


module.exports = {
    entry: path.join(__dirname, '../src/index.tsx'), // 入口文件
    output: {
        filename: 'static/js/[name].[chunkhash:8].js', // 打包后的文件名称
        path: path.join(__dirname, '../dist'), // 打包后的目录
        clean: true, // 打包前清空
        publicPath: '/' // 静态资源引用时的路径（加在引用静态资源前面的）
    },
    module: {
        rules: [
            {
                include: [path.resolve(__dirname, '../src')],
                test: /.(ts|tsx)$/, // 匹配.js .jsx .ts .tsx后缀的文件
                use: ['thread-loader', 'babel-loader'], // 用babel-loader处理
            },
            {
                include: path.resolve(__dirname, '../src'),
                test: /.css$/, // 匹配.css 后缀的文件
                use: [
                    isDEV? 'style-loader': MiniCssExtractPlugin.loader, 
                    'css-loader', 
                    'postcss-loader'
                ]
            },
            {
                include: path.resolve(__dirname, '../src'),
                test: /.less$/, // 匹配.less后缀的文件
                use: [
                    isDEV? 'style-loader': MiniCssExtractPlugin.loader, 
                    'css-loader', 
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
                type: 'asset', // webpack5内置了asset模块来处理静态资源
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024 // 10kb，超过10kb将不会被转为base64格式的dataUrl
                    }
                }, // 默认值
                generator: {
                    filename: 'static/images/[name].[contenthash:8][ext][query]' // 文件输出目录和命名
                }
            },
            {
                test: /.(eot|woff2?|ttf|otf)$/, // 匹配字体文件
                type: 'asset', // webpack5内置了asset模块来处理静态资源
                parser: {
                    dataUrlCondition: 10 * 1024 // 10kb，超过10kb将不会被转为base64格式的dataUrl
                },
                generator: {
                    filename: 'static/fonts/[name].[contenthash:8][ext][query]' // 文件输出目录和命名
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, // 匹配媒体文件
                type: 'asset/resource', // webpack5内置了asset模块来处理静态资源
                parser: {
                    dataUrlCondition: 10 * 1024 // 10kb，超过10kb将不会被转为base64格式的dataUrl
                },
                generator: {
                    filename: 'static/media/[name].[contenthash:8][ext][query]' // 文件输出目录和命名
                }
            },
        ]   
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src') // @指向src目录
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // 引入文件时不用写后缀名
        modules: [path.resolve(__dirname, '../node_modules')], 
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'), // 引入模板文件
            inject: true, // 打包后将js、css等文件注入到html模板中
        }),
        new webpack.DefinePlugin({
            'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
        })
    ],
    cache: {
        type: 'filesystem', // 使用文件缓存
    },
}