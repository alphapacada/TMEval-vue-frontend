const webpack = require('webpack');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
    configureWebpack: {
        // Set up all the aliases we use in our app.
        plugins: [
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 6
            }),
            new VuetifyLoaderPlugin(),
        ]
    },
    pwa: {
        name: 'Vue Argon Design',
        themeColor: '#172b4d',
        msTileColor: '#172b4d',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: '#172b4d'
    },
    css: {
        // Enable CSS source maps.
        sourceMap: process.env.NODE_ENV !== 'production'
    },
    devServer: {
        proxy: {
            '/api*': {
                //Forward frontend dev server request for /api tp flask dev server
                target: 'http://localhost:5000/'
            }
        },
        watchOptions: {
            poll: true
        },
    }
};