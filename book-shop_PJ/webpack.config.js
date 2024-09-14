// Generated using webpack-cli https://github.com/webpack/webpack-cli

//const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const LinkTypePlugin = require('html-webpack-link-type-plugin').HtmlWebpackLinkTypePlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js'

        },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        new CopyWebpackPlugin({
            patterns: [
            {
                from: 'src/assets',
                to: 'assets'
            }
        ]}),
        new LinkTypePlugin({
            '**/*.css' : 'text/css'
        }),
        new MiniCssExtractPlugin()],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.s[ac]ss$/i,
                use: [{
                loader: MiniCssExtractPlugin.loader},
                // Translates CSS into CommonJS
                {loader: 'css-loader'},
                // Compiles Sass to CSS
                {loader: 'sass-loader'}
                ]
            },
        ],
    }
}

