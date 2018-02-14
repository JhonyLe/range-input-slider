const path = require("path");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const common = require('./common');

module.exports = {
    entry: './src/index.ts',
    output: {
        library: 'RangeInputSlider',
        libraryTarget: 'umd',
        filename: './lib/index.js'
    },
    resolve: {
        extensions: [".ts", ".js", ".scss"],
        alias: common.aliases
    },
    plugins: [
        new UglifyJsPlugin({
            uglifyOptions: {
                comments: false
            }
        })
    ],
    module: common.modules
};