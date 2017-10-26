## {{ npmName }}

[![Version](http://img.shields.io/npm/v/{{ npmName }}.svg?style=flat-square)](https://npmjs.org/package/{{ npmName }})
[![License](http://img.shields.io/npm/l/{{ npmName }}.svg?style=flat-square)](https://npmjs.org/package/{{ npmName }})

{{ description }}

For [A-Frame](https://aframe.io).

### API

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
|          |             |               |

### Installation

#### Browser

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/{{ aframeVersion }}/aframe.min.js"></script>
  <script src="https://unpkg.com/{{ npmName }}/dist/{{ npmName }}.min.js"></script>
</head>

<body>
  <a-scene>
    <a-entity {{ shortName }}="foo: bar"></a-entity>
  </a-scene>
</body>
```

#### npm

Install via npm:

```bash
npm install {{ npmName }}
```

Then require and use.

```js
require('aframe');
require('{{ npmName }}');
```
