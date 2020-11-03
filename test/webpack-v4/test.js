const assert = require('assert')
const path = require('path')
const MemoryFileSystem = require('memory-fs');

const webpack = require('../../node_modules/webpack')
const HtmlWebpackPlugin = require('../../node_modules/html-webpack-plugin')

const HtmlWebpackPreconnectPluginCrossorigin = require('../../index')

describe('preconnect - webpack 4', function() {
  it('add preconnect tags', function(done) {
    this.timeout(0)
    const compiler = webpack({
      entry: path.join(__dirname, '../../example/index.js'),
      output: {
        path: path.join(__dirname, 'dist')
      },
      plugins: [
        new HtmlWebpackPlugin({
          preconnect: [
            'http://api1.example.com',
            {
              url: 'http://api2.example.com',
              crossorigin: 'use-credentials'
            },
            'https://fonts.gstatic.com',
          ],
        }),
        new HtmlWebpackPreconnectPluginCrossorigin(),
      ]
    }, function(err, result) {
      if (err) {
        done(err)
        return
      }
      if (result.compilation.errors && result.compilation.errors.length) {
        done(result.compilation.errors)
        return
      }

      const html = result.compilation.assets['index.html'].source();
      console.log(html);
      assert.strictEqual(typeof html, 'string')
      assert.ok(html.includes('<link rel="preconnect" href="http://api1.example.com"'))
      assert.ok(html.includes('<link rel="preconnect" href="https://fonts.gstatic.com"'))
      assert.ok(html.includes('<link rel="preconnect" href="http://api2.example.com" crossorigin="use-credentials"'))

      done()
    })
    compiler.outputFileSystem = new MemoryFileSystem()
  })
})
