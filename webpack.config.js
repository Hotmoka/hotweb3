const path = require('path');
const webpack = require("webpack");

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'hotweb3.js',
        library: 'hotweb3',
        libraryTarget: 'umd',
        globalObject: 'this'
    },
    target: 'web',
    plugins: [
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer']
        })
    ],
    externals: {
        'axios': 'axios'
    },
};