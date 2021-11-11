const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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

        new HtmlWebpackPlugin({
            template: 'src/index.html'
          }),
          new CleanWebpackPlugin(),
          new MiniCssExtractPlugin()
    ],

    module: {
        rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, {
            loader: 'css-loader'
          }]
        }
      ]
    }
}



