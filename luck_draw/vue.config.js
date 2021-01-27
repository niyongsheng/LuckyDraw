module.exports = {
    publicPath: './',
    devServer: {
        host: '0.0.0.0',
        port: 9009,
        https: false,
        open: false,
        proxy: {
            "/api": {
                target: "http://localhost:8088//",
                changeOrigin: true,
                pathRewrite: {
                    '^/api': 'api'
                }
            }
        }
    }
}
