# Polygonjs IFC Plugin

This adds a FileIFC SOP node to the [Polygonjs webgl engine](https://polygonjs.com).

# Install

Import the plugin:

`yarn add @polygonjs/plugin-ifc`

And register the plugin in the function `configurePolygonjs` in the file `PolyConfig.js` so that the occlusion node can be accessible in both the editor and your exported scene:

```js
import {polyPluginIFC} from '@polygonjs/plugin-ifc';

export function configurePolygonjs(poly) {
	poly.registerPlugin(polyPluginIFC);
}
```

# Test

-   run `yarn test` and open at `http://localhost:5173/test`
