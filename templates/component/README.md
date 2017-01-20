## {{ npmName }}

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

<!-- If component is accepted to the Registry, uncomment this. -->
<!--
Or with [angle](https://npmjs.com/package/angle/), you can install the proper
version of the component straight into your HTML file, respective to your
version of A-Frame:

```sh
angle install {{ npmName }}
```
-->

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
