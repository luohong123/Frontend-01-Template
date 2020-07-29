/*
 * @Author: lh
 * @Date: 2020-07-29 23:37:12
 * @LastEditors: lh
 * @LastEditTime: 2020-07-29 23:42:20
 * @Description: 
 * @email: 3300536651@qq.com
 */ 
module.exports = {
    entry: './main.js',
    module: {
        rules: [
            { 
                test: /\.js$/, 
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [[
                            "@babel/plugin-transform-react-jsx",
                            {pragma:"createElement"}
                        ]]
                    }
                }
            },
            {
              test: /\.view/,
              use:{
                  loader: require.resolve("./myloader.js")
              }
          }
        ]
    },
    mode: "development",
    optimization: {
        minimize: false
    }
  };