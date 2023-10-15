const path = require('path')

const { merge } = require('webpack-merge')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const baseConfig = require('./webpack.base.js')

// 合并配置
module.exports = merge(baseConfig, {
  mode: 'development', // 开发模式下打包速度更快，省去了一些代码优化步骤
  devtool: 'eval-cheap-module-source-map', // 开发模式下使用eval-cheap-module-source-map，生产模式下使用source-map
  devServer: {
    port: 3000, // 端口号
    hot: true, // 热更新
    compress: false, // 开发环境不用开启g-zip压缩，提升打包速度
    historyApiFallback: true, // 解决history下刷新页面404的问题
    static: {
      directory: path.join(__dirname, '../public') // 静态资源目录
    }
  },
  plugins: [
    new ReactRefreshWebpackPlugin() // 热更新插件
  ]
})
