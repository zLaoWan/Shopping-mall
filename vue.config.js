const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  // transpileDependencies: true,
  
  // 项目打包后 代码都是经过压缩加密的 如果运行报错 输出的错误信息无法准确得知是哪里的代码报错
  // 有了 map 就可以像未加密的代码一样 准确的输出哪一行那一列有错
  // 如果该文件项目不需要 可以去掉
  productionSourceMap:false,
  
  // 关闭ESLINT校验工具
  lintOnSave: false,
  // 代理跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        // changeOrigin: true,
        pathRewrite: {
          '^api': ''
        }
      }
    }
  },
})
