const { merge } = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


const project = process.env.npm_config_project || '0_starter';
const commonConf = commonConfiguration(project);

module.exports = merge(
    commonConf,
    {
        mode: 'production',
        plugins:
        [
            new CleanWebpackPlugin()
        ]
    }
)
