const { merge } = require('webpack-merge')

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer') // 引入分析打包结果插件

const prodConfig = require('./webpack.prod')
const smp = new SpeedMeasurePlugin()

module.exports = smp.wrap(merge(prodConfig, {
  plugins: [
    new BundleAnalyzerPlugin() // 配置分析打包结果插件
  ]
}))
