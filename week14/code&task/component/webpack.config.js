/*
 * @Author: lh
 * @Date: 2020-07-09 20:27:29
 * @LastEditors: lh
 * @LastEditTime: 2020-07-09 22:06:35
 * @Description: 
 * @email: 3300536651@qq.com
 */
module.exports = {
    entry: './main.js',
    mode: 'development',
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            {
                test: /\.?js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [['@babel/plugin-transform-react-jsx', { pragma: 'createElement' }]]
                    }
                }
            }
        ]
    }
   
}