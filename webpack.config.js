'use strict';
const path = require('path');
//html插件
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {

    //入口
    entry:{
        main:'./src/main.js'
    },
    output:{
        //资源产出路径
        path:path.join(__dirname,'dist'),
        filename:'build.js'
    },
    module:{
        loaders:[
            { //处理css
                test:/\.css$/,
                loader:'style-loader!css-loader!autoprefixer-loader'
            },
            {
                test:/\.less$/,
                loader:'style-loader!css-loader!autoprefixer-loader!less-loader'
            },
            {
                //处理文件
                test:/\.(jpg|png|svg|ttf|gif)$/,
                loader:'url-loader',
                options:{
                    limit:4096
                }
            },
            //处理js
            {
                test:/\.js$/,
                loader:'babel-loader',
                //排除node_modules目录
                exclude:/node_modules/,
                //options就交给.babelrc文件来说明
            },
            //vue
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            //处理vue-preview中的ES6
            {
                test: /vue-preview.src.*?js$/,
                loader: 'babel-loader'
            }

        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            template:'./src/index.html'
        })
    ]


}