module.exports = {
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'GitSearch'
      return args
    })
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/assets/sass/global.sass"'
      }
    }
  }
}
