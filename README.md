![npm](https://img.shields.io/npm/v/html-webpack-preconnect-plugin-crossorigin.svg)

# Html Webpack Preconnect Plugin

This extension plugin embeds `<link rel="preconnect" crossorigin>` tags into HTML files generated by the [HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin). Supported in Webpack 3/4

## Introduction

The `preconnect` can be pre-connected api server without having to wait for javascript loading and execute request, save a little time for users.

![https://www.keycdn.com/support/preconnect](https://www.keycdn.com/img/support/preconnect-lg.webp)
> image source: [keycdn](https://www.keycdn.com/support/preconnect)

### Document

> The `preconnect` link relation type is used to indicate an origin that will be used to fetch required resources. Initiating an early connection, which includes the DNS lookup, TCP handshake, and optional TLS negotiation, allows the user agent to mask the high latency costs of establishing a connection.

[https://www.w3.org/TR/resource-hints/#preconnect](https://www.w3.org/TR/resource-hints/#preconnect)

[blog: Eliminating Roundtrips with Preconnect](https://www.igvita.com/2015/08/17/eliminating-roundtrips-with-preconnect/)

### Browser compatibility

Chrome/Firefox/Android have been supported, IE/Edge/Safari not yet.

[https://caniuse.com/#feat=link-rel-preconnect](https://caniuse.com/#feat=link-rel-preconnect)

## Install

```bash
npm install html-webpack-preconnect-plugin-crossorigin --save-dev
```

## Usage

Add the plugin to your webpack config:

```javascript
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlWebpackPreconnectPlugin = require('html-webpack-preconnect-plugin-crossorigin')

// webpack config
{
  ...
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',

      // set the preconnect origins
      preconnect: [
        'https://api1.example.com',
        {
          url: 'https://api3.example.com'
        },
        {
          url: 'https://api4.example.com',
          crossorigin: 'use-credentials'
        },
        'http://api2.example.com',
      ]
    }),

    // another HTML entry
    new HtmlWebpackPlugin({
      filename: 'index2.html',
      preconnect: [
        'http://api2.example.com',
      ]
    }),

    // enabled preconnect plugin
    new HtmlWebpackPreconnectPlugin(),
  ]
}
```

Then the `dist/index.html` will contain:

```html
<head>
  ...
  <link rel="preconnect" href="https://api1.example.com" crossorigin>
  <link rel="preconnect" href="http://api3.example.com" crossorigin>
  <link rel="preconnect" href="http://api4.example.com" crossorigin="use-credentials">
  <link rel="preconnect" href="http://api2.example.com" crossorigin>
</head>
```

## HOW TO TEST

[https://www.webpagetest.org](https://www.webpagetest.org)

> Run your page through webpagetest.org. Requests to the domains you specified in your dns-prefetch or preconnect tags should begin sooner because the initial connection will have been established. [stackoverflow](https://stackoverflow.com/questions/39629343/how-do-you-test-the-effects-of-dns-prefetch-and-preconnect)
