import {PolyEngine} from '@polygonjs/polygonjs/dist/src/engine/Poly';
import {CATEGORY_SOP} from '@polygonjs/polygonjs/dist/src/engine/poly/registers/nodes/Category';

import {FileIFCSopOperation} from './engine/operations/sop/FileIFC';
import {FileIFCSopNode} from './engine/nodes/sop/FileIFC';
import {PolyPlugin} from '@polygonjs/polygonjs/dist/src/engine/poly/registers/plugins/Plugin';
function PolygonjsPluginIFC(poly: PolyEngine) {
	poly.registerOperation(FileIFCSopOperation);
	console.log(FileIFCSopNode.type(), FileIFCSopNode.context());
	poly.registerNode(FileIFCSopNode, CATEGORY_SOP.RENDER);
}
const polyPluginIFC = new PolyPlugin('ifc', PolygonjsPluginIFC, {
	libraryName: '@polygonjs/plugin-ifc',
	libraryImportPath: '@polygonjs/plugin-ifc/dist/index.es',
});
export {polyPluginIFC, FileIFCSopNode, FileIFCSopOperation};
