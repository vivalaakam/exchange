const path = require('path')

const { NODE_ENV = 'development', WEBPACK_PORT = 3001 } = process.env
const __DEV__ = NODE_ENV === 'development'

const config = {
    entry: {
        bundle: [
            __DEV__ ? 'react-dev-utils/webpackHotDevClient' : null,
            path.resolve(__dirname, './src/index.js'),
        ].filter(Boolean),
    },

    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/',
    },

    devtool: __DEV__ ? 'eval-source-map' : 'source-map',
    mode: __DEV__ ? 'development' : 'production',
    optimization: {
        minimize: !__DEV__,
        mergeDuplicateChunks: !__DEV__,
    },

    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            }
        ]
    },
    devServer: {
        port: WEBPACK_PORT,
        compress: true,
    }
}

module.exports = config
