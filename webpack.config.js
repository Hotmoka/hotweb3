const path = require('path');

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
        extensions: ['.ts', '.js'],
        fallback: {
            "buffer": require.resolve("buffer/"),
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify")
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'hotweb3.js',
        library: 'hotweb3',
        libraryTarget: 'umd',
        globalObject: 'this'
    },
    target: 'web',
    externals: {
        'axios': 'axios'
    }
};