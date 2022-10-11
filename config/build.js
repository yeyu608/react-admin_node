const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[chunkhash].css',
        })
    ],
    module: {
        rules: [
            {
                test: /\.(css|scss)$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    }
}