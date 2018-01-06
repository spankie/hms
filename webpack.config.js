const path = require('path')
const BabiliPlugin = require("babili-webpack-plugin");

module.exports = {
    entry: {
        patients:'./patients/js/index.js',
        manage:'./manage/js/index.js'
    },
    output: {
        path: __dirname + '/js/bin',
        filename: '[name]-bundle.js',
    },
    plugins:[
        new BabiliPlugin()
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
}