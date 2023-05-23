const EslintPlugin = require('eslint-webpack-plugin');

module.exports = {
    mode:'development',
    devtool:"inline-source-map",
    devServer:{
        port: 3000,
        hot: true, // 本地代码热更新
        open: true,
        historyApiFallback: true,
        //devServer 浏览器中的覆盖层
        client:{
            overlay:{
                errors:true,
                warnings:false,
            }
        }
    },
    plugins:[
        new EslintPlugin({
            eslintPath:'eslint',
            extensions:['js','jsx','ts','tsx'],
            exclude:'node_modules'
        })
    ], 
    module: {
        rules: [
            {
                test:/\.(css|scss)$/i,
                use:['style-loader', 'css-loader', 'sass-loader'],
            }
        ]
    }
}