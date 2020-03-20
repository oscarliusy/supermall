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
  }
}
