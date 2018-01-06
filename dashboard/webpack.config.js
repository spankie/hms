const path = require('path')

module.exports = {
    entry: './js/src/index.js',
    output: {
        path: path.resolve(__dirname, './js/bin'),
        filename: 'app.js',
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
}