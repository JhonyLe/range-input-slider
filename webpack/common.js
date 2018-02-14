const path = require("path");

module.exports = {
    modules: {
        rules: [
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre"
            },
            {
                test: /\.ts$/,
                use: ["ts-loader"]
            },
            {
                test: /\.(s*)css$/,
                use: ['style-loader','css-loader', 'sass-loader']
            }
        ]
    },
    aliases: {
        slider: path.resolve(__dirname, "../src/js/slider"),
        common: path.resolve(__dirname, "../src/js/common")
    }
};
