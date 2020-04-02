const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@img',resolve('src/assets/img'))
      .set('@components',resolve('src/components'))
      .set('@common',resolve('src/common'))
      .set('@network',resolve('src/network'))
      .set('@views',resolve('src/views'))
  },
  css:{
    loaderOptions:{
      postcss:{
        plugins:[
          require('postcss-px-to-viewport')({
            unitToConvert: "px",
            viewportWidth: 375,//视窗的宽度，对应我们设计稿的宽度
            viewportHeight:667,//视窗的高度，对饮设计稿的高度（可以不设置）
            unitPrecision: 3,//指定px转换为视窗单位值的最小位数（很多时候无法整除）
            propList: [
              "*"
            ],
            viewportUnit: "vw",//指定需要转换成的视窗单位，建议用vw
            fontViewportUnit: "vw",
            selectorBlackList: ['ignore','tab-bar','tab-bar-item'],//指定不需要转换的类
            minPixelValue: 1,//小于或等于1px不转换为视窗单位
            mediaQuery: false,//允许在媒体查询中转换px
            replace: true,
            exclude: /(\/|\\)(node_modules)(\/|\\)/,
          })
        ]
      }
    }
  }
}
