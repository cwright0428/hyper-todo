var path = require('path');

module.exports = {
    mode: 'development',
    target: 'node',
    entry: './src/app.tsx',
    output: {
        path: path.resolve('./bin'),
        filename: 'hyper-todo.js',
        libraryTarget: 'commonjs'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/, 
                exclude: /node_modules/,
                loader: "awesome-typescript-loader"
            }
        ]
    },
}