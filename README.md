qn-cnpm
---------------

[![NPM version][npm-image]][npm-url]
[![Gittip][gittip-image]][gittip-url]
[![David deps][david-image]][david-url]

[npm-image]: https://img.shields.io/npm/v/qn-cnpm.svg?style=flat
[npm-url]: https://npmjs.org/package/qn-cnpm
[gittip-image]: https://img.shields.io/gittip/dead-horse.svg?style=flat
[gittip-url]: https://www.gittip.com/dead-horse/
[david-image]: https://img.shields.io/david/cnpm/qn-cnpm.svg?style=flat
[david-url]: https://david-dm.org/cnpm/qn-cnpm

qnfs wrapper for [cnpmjs.org](htps://github.com/cnpm/cnpmjs.org)

## Installation

```bash
$ npm install qn-cnpm
```

## Usage

```js
var qnWrapper = require('qn-cnpm');

  var client = qnWrapper({
    accessKey: 'your access key',
    secretKey: 'your secret key',
    bucket: 'qiniu',
    domain: 'http://qiniu-sdk-test.qiniudn.com',
  });
```

### License

MIT
