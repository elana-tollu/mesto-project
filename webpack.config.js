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
        // contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 8080,
        open: true
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true
           }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin()
    ],

    module: {
        rules: [
        {
            test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
            type: 'asset/resource'
        },

        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, {
            loader: 'css-loader'
          }]
        }
      ]
    }
}



