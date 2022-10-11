const EslintPlugin = require('eslint-webpack-plugin');

module.exports = {
    mode:'development',
    devtool:"inline-source-map",
    devServer:{
        port: 3000,
        hot: true,
        open: true,
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