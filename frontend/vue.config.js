module.exports = {
  "configureWebpack": {
    "devtool": "source-map"
  },
  "pwa": {
    "name": "Vue Argon Design",
    "themeColor": "#172b4d",
    "msTileColor": "#172b4d",
    "appleMobileWebAppCapable": "yes",
    "appleMobileWebAppStatusBarStyle": "#172b4d"
  },
  "css": {
    "sourceMap": true
  },
  "devServer": {
    "inline": true,
    "host": "0.0.0.0",
    "port": 8080,
    "proxy": {
      "/api*": {
        "target": "http://localhost:5000/api/v1"
      }
    },
    "watchOptions": {
      "poll": true
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}