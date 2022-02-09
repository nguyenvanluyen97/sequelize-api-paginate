// webpack.config.js

const { resolve } = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: resolve(__dirname, 'src/index.js'),
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'sequelize-api-paginate.js',
        //library: 'sequelizeApiPaginate'
    },
    optimization: {
        minimize: true
    },
    resolve: {
        extensions: [".js", ".json"],

    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node_modules',
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    // plugins: [
    //     new UglifyJsPlugin({
    //         exclude: [/\.min\.js$/gi] // skip pre-minified libs
    //     })
    // ],
    "target": "node"
}