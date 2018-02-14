const path = require("path");
const common = require('./common');

module.exports = {
    entry: path.join(__dirname, "../src/example.ts"),
    output: {
        filename: "./lib/bundle.js"
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    resolve: {
        // Add '.ts' as resolvable extensions.
        extensions: [".ts", ".js", ".scss"],
        alias: Object.assign({}, common.aliases)
    },
    module: Object.assign({}, common.modules),
    devServer: {
        contentBase: path.join(__dirname, "../"),
        compress: true,
        port: 8000
    }
};
