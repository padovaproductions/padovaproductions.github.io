const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')


module.exports = (project) => {
    return {
        entry: path.resolve(__dirname, './examples/'+project+'/src/script.js'),
        output:
        {
            filename: 'bundle.[contenthash].js',
            path: path.resolve(__dirname, './examples/'+project+'/dist')
        },
        devtool: 'source-map',
        plugins:
        [
            new CopyWebpackPlugin({
                patterns: [
                    { from: path.resolve(__dirname, './examples/'+project+'/static') }
                ]
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, './examples/'+project+'/src/index.html'),
                minify: true
            }),
            new MiniCSSExtractPlugin()
        ],
        module:
        {
            rules:
            [
                // HTML
                {
                    test: /\.(html)$/,
                    use: ['html-loader']
                },
    
                // JS
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {                        
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
    
                // CSS
                {
                    test: /\.css$/,
                    use:
                    [
                        MiniCSSExtractPlugin.loader,
                        'css-loader'
                    ]
                },
    
                // Images
                {
                    test: /\.(jpg|png|gif|svg)$/,
                    use:
                    [
                        {
                            loader: 'file-loader',
                            options:
                            {
                                outputPath: 'assets/images/'
                            }
                        }
                    ]
                },
    
                // Fonts
                {
                    test: /\.(ttf|eot|woff|woff2)$/,
                    use:
                    [
                        {
                            loader: 'file-loader',
                            options:
                            {
                                outputPath: 'assets/fonts/'
                            }
                        }
                    ]
                }
            ]
        }
    }
}
