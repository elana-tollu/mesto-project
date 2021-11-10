const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: { main:'./src/index.js'},
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: ''
    },
    mode: 'development',
    devServer: {
        compress: true,
        port: 8080,
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true
           }),
    ]
}
