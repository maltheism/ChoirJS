'use strict';

const debug = true;
const path = require('path');
const webpack = require('webpack');
const externals = require('webpack-node-externals');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

function recursiveIssuer(m) {
    if (m.issuer) {
        return recursiveIssuer(m.issuer);
    } else if (m.name) {
        return m.name;
    } else {
        return false;
    }
}

const client = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname + '/public/dist'),
        filename: 'app.bundle.js',
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: '../index.html'
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            Tether: "tether",
            "window.Tether": "tether",
            Popper: ['popper.js', 'default'],
            Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
            Button: "exports-loader?Button!bootstrap/js/dist/button",
            Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
            Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
            Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
            Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
            Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
            Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
            Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
            Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
            Util: "exports-loader?Util!bootstrap/js/dist/util",
        }),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
            VERSION: JSON.stringify('v1'),
            BROWSER_SUPPORTS_HTML5: true,
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    warnings: false,
                    mangle: !debug,
                    keep_fnames: debug,
                    compress: {
                        unused: !debug
                    },
                },
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                resolve: {
                    extensions: ['.js', '.jsx']
                },
                use: ['babel-loader?cacheDirectory'],
                enforce: 'pre'
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000',
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                use: 'file-loader',
            }
        ]
    },
    devtool: debug ? 'inline-source-map' : false,
    mode: debug ? 'development' : 'production'
};

const styles = {
    entry: {
        app: [
            './public/css/fonts/style.css',
            './public/css/style.css',
        ]
    },
    output: {
        path: path.resolve(__dirname + '/public', 'dist')
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'app',
                    test: (m,c,entry = 'app') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
                use: 'url-loader'
            }
        ]
    },
    resolve: {
        alias: {},
        modules: [],
        extensions: ['.css']
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new SVGSpritemapPlugin([
            path.resolve(__dirname, 'public/images/svg/*.svg')
        ], {
        })
    ],
    mode: 'production'
};

const server = {
    entry: './bin/www.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'choir-webpack.bundle.js'
    },
    resolve: {
        extensions: ['*', '.js', '.json']
    },
    externals: [externals()],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    warnings: false,
                    mangle: !debug,
                    keep_fnames: debug,
                    compress: {
                        unused: !debug
                    },
                },
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    plugins: [

    ],
    mode: 'none',
    target: 'node'
};

module.exports = [client, styles, server];
