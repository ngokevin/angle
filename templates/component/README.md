## aframe-component-boilerplate

> This is not at all means required for writing an A-Frame component. It is intended for publishing and sharing a component for the community to re-use.

> Currently planning on making this an npm script and revamping the site generation pieces.

Boilerplate for sharing [A-Frame](https://aframe.io) [components](https://aframe.io/docs/core/component.html):

1. `npm install && npm run unboil` to rename and trim stuff. Don't forget to **unboil**.
2. [Write your component](http://ngokevin.com/blog/aframe-component).
3. Build examples (`npm run dev` to watch for changes to build example bundles).
4. `npm publish` and commit the `dist/` files.
5. `npm run ghpages` to share with people.
6. Share on [Slack](https://aframevr-slack.herokuapp.com/) and [awesome-aframe](https://github.com/aframevr/awesome-aframe)!

Examples:

- [aframe-layout-component](https://github.com/ngokevin/aframe-layout-component)
- [aframe-text-component](https://github.com/ngokevin/aframe-text-component)
- [aframe-extrude-and-lathe](https://github.com/JosePedroDias/aframe-extrude-and-lathe)
- [aframe-obj-loader-component](https://github.com/donmccurdy/aframe-obj-loader-component)
- [aframe-physics-component](https://github.com/ngokevin/aframe-physics-component)
- [aframe-template-component](https://github.com/ngokevin/aframe-template-component)

--trim--
## aframe-example-component

A example component for [A-Frame](https://aframe.io).

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
  <script src="https://aframe.io/releases/0.2.0/aframe.min.js"></script>
  <script src="https://rawgit.com/ngokevin/aframe-component-boilerplate/master/dist/aframe-example-component.min.js"></script>
</head>

<body>
  <a-scene>
    <a-entity example="exampleProp: exampleVal"></a-entity>
  </a-scene>
</body>
```

#### npm

Install via npm:

```bash
npm install aframe-example-component
```

Then register and use.

```js
require('aframe');
require('aframe-example-component');
```
