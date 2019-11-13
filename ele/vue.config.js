const mockIndexData = require("./mock/index.json");
const VConsolePlugin = require('vconsole-webpack-plugin')
const getEnv = process.env.NODE_ENV == 'production' ? false : true
module.exports = {
  chainWebpack: config => {
    /* disable insertion of assets as data urls b/c Phaser doesn't support it */
    config
      .plugin('vconsole')
      .use(VConsolePlugin, [{ enable: getEnv }])
    const rules = [
      { name: 'images', dir: 'img' },
      { name: 'media',  dir: 'media' }
    ]
    rules.forEach(rule => {
      const ruleConf = config.module.rule(rule.name)
      ruleConf.uses.clear()
      ruleConf
        .use('file-loader')
        .loader('file-loader')
        .options({
          name: `${rule.dir}/[name].[hash:8].[ext]`
        })
    })
  },
  configureWebpack: config => {
    if(!getEnv){
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
  devServer: {
    open: true,
    hot: false,
    host:'localhost',
    https:false,
    hotOnly:false,
    port: 8081,
    proxy: {
      '/api': {
        target: 'http://localhost:8081/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    },
    before(app) {
      app.all("/api/goods", (req, res) => {
        res.send(JSON.stringify(mockIndexData.goods));
      }),
      app.all("/api/seller", (req, res) => {
        res.send(JSON.stringify(mockIndexData.seller));
      }),
      app.all("/api/ratings", (req, res) => {
        res.send(JSON.stringify(mockIndexData.ratings));
      })
    }
  },
  productionSourceMap: getEnv,
  publicPath: './'
}