const path = require('path')
const globAll = require('glob-all')

const CopyPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin') // 压缩js
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin') // 去除无用css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionPlugin = require('compression-webpack-plugin') // 开启gzip压缩
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin') // 压缩css

const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')

module.exports = merge(baseConfig, {
  mode: 'production', // 生产模式下打包速度更慢，但是会进行代码优化
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'), // 复制public下文件
          to: path.resolve(__dirname, '../dist'), // 复制到dist目录
          filter: source => {
            return !source.includes('index.html') // 过滤index.html文件
          }
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name][contenthash:8].css'
    }),
    new PurgeCSSPlugin({
      paths: globAll.sync([// 检测src下所有tsx文件和public下index.html中使用的类名和id和标签名称
        `${path.join(__dirname, '../src')}/**/*.tsx`,
        path.join(__dirname, '../public/index.html')
      ]),
      safelist: {
        standard: [/^ant-/] // 过滤以ant-开头的类名，哪怕没用到也不删除
      }
    }),
    new CompressionPlugin({
      test: /.(js|css)$/, // 只生成css,js压缩文件
      filename: '[path][base].gz', // 文件命名
      algorithm: 'gzip', // 压缩格式,默认是gzip
      test: /.(js|css)$/, // 只生成css,js压缩文件
      threshold: 10240, // 只有大小大于该值的资源会被处理。默认值是 10k
      minRatio: 0.8 // 压缩率,默认值是 0.8
    })
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), // 压缩css
      new TerserPlugin({
        parallel: true, // 开启多进程并行压缩
        terserOptions: {
          compress: {
            pure_funcs: ['console.log']
          }
        }
      }) // 压缩js
    ],
    splitChunks: {
      cacheGroups: {
        // 抽离第三方插件
        vendors: {
          test: /node_modules/, // 只匹配node_modules里面的模块
          name: 'vendors', // 提取文件命名为vendors,js后缀和chunkhash会自动加
          minChunks: 1, // 只要使用一次就提取出来
          chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
          minSize: 0, // 提取代码体积大于0就提取出来
          priority: 1 // 提取优先级为1
        },
        commons: {
          name: 'commons', // 提取文件命名为commons,js后缀和chunkhash会自动加
          minChunks: 2, // 只要使用两次就提取出来
          chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
          minSize: 0 // 提取代码体积大于0就提取出来
        }
      }
    }
  }
})
