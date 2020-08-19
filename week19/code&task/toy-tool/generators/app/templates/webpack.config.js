/*
 * @Author: lh
 * @Date: 2020-08-19 14:32:47
 * @LastEditors: lh
 * @LastEditTime: 2020-08-19 17:22:56
 * @Description: 
 * @email: 3300536651@qq.com
 */
module.exports = {
    entry: './src/main.js',
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: [
                        [
                            "@babel/plugin-transform-react-jsx",
                            {
                                pragma: "createElement"
                            }
                        ]
                    ]
                }
            }
        }]
    },
    mode: "development",
    optimization: {
        minimize: false
    },
    plugins:[
        new (require('html-webpack-plugin'))
    ],
    devServer: {
        open: true,
        compress: false,
        contentBase: "./src"
    }
};