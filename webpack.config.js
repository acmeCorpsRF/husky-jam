const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'app'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/i,
                exclude: /[\\/]node_modules[\\/]/,
                loader: 'babel-loader'
            },
            {
                test: /\.s?[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: 'src/postcss.config.js'
                            }
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/fonts/[name].[ext]'
                    }
                }
            },
            {
                test: /\.(png|jpg|gif|svg|ico)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/img/[name].[ext]'
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: path.resolve(__dirname, 'app')
        }),
        new UglifyJsPlugin({
            test: /\.js(\?.*)?$/i,
            uglifyOptions: {
                exclude: /[\\/]node_modules[\\/]/,
                compress: {
                    unsafe: true,
                    inline: true,
                    keep_fargs: false
                },
                output: {
                    beautify: false
                },
                mangle: true
            }
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src', 'index.html'),
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.[contenthash].css'
        }),
        new CopyWebpackPlugin([
            {from: 'assets/img', to: path.resolve(__dirname, 'app', 'assets/img')},
            {from: 'assets/fonts', to: path.resolve(__dirname, 'app', 'assets/fonts')}
        ])
    ],
    devtool: 'cheap-inline-module-source-map'

};