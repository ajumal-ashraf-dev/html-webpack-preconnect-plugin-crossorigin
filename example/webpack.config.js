var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlWebpackPreconnectPlugin = require('../index')

module.exports = {
  entry: './index.js',
  mode: 'development',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'html webpack preconnect plugin',
      template: 'template.html',
      filename: 'index.html',
      preconnect: [
        {
          url: 'http://api1.example.com',
          crossorigin: 'use-credentials'
        },
        'http://api2.example.com',
        'https://fonts.gstatic.com',
      ],
    }),

    new HtmlWebpackPreconnectPlugin(),
  ]
}
