import {Poly} from '@polygonjs/polygonjs/dist/src/engine/Poly';
import {PolyScene} from '@polygonjs/polygonjs/dist/src/engine/scene/PolyScene';
import {ExtendedGeoObjNode} from './engine/nodes/obj/ExtendedGeo';

// register all nodes
// import {AllRegister} from '@polygonjs/polygonjs/dist/src/engine/poly/registers/All';
import {AllAssemblersRegister} from '@polygonjs/polygonjs/dist/src/engine/poly/registers/assemblers/All';
AllAssemblersRegister.run(Poly);
import {AllCamerasRegister} from '@polygonjs/polygonjs/dist/src/engine/poly/registers/cameras/All';
import {AllExpressionsRegister} from '@polygonjs/polygonjs/dist/src/engine/poly/registers/expressions/All';
AllCamerasRegister.run(Poly);
AllExpressionsRegister.run(Poly);
import {GeoObjNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/obj/Geo';
import {AddSopNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/sop/Add';
import {MaterialSopNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/sop/Material';
import {TextSopNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/sop/Text';
import {TransformSopNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/sop/Transform';
import {CopySopNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/sop/Copy';
import {MaterialsNetworkObjNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/obj/MaterialsNetwork';
import {MaterialsNetworkSopNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/sop/MaterialsNetwork';
import {MeshLambertMatNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/mat/MeshLambert';
import {HemisphereLightObjNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/obj/HemisphereLight';
import {CopNetworkObjNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/obj/CopNetwork';
import {WebCamCopNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/cop/WebCam';
import {MeshBasicMatNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/mat/MeshBasic';
import {BoxSopNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/sop/Box';
import {EventsNetworkSopNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/sop/EventsNetwork';
import {PerspectiveCameraObjNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/obj/PerspectiveCamera';
import {CameraOrbitControlsEventNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/event/CameraOrbitControls';
import {SphereSopNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/sop/Sphere';
import {PlaneSopNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/sop/Plane';
import {MergeSopNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/sop/Merge';
import {MeshBasicBuilderMatNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/mat/MeshBasicBuilder';
Poly.registerNode(MeshBasicBuilderMatNode);
Poly.registerNode(MergeSopNode);
Poly.registerNode(PlaneSopNode);
Poly.registerNode(SphereSopNode);
Poly.registerNode(PerspectiveCameraObjNode);
Poly.registerNode(CameraOrbitControlsEventNode);
Poly.registerNode(EventsNetworkSopNode);
Poly.registerNode(BoxSopNode);
Poly.registerNode(MeshBasicMatNode);
Poly.registerNode(WebCamCopNode);
Poly.registerNode(CopNetworkObjNode);
Poly.registerNode(GeoObjNode);
Poly.registerNode(AddSopNode);
Poly.registerNode(MaterialSopNode);
Poly.registerNode(TextSopNode);
Poly.registerNode(TransformSopNode);
Poly.registerNode(CopySopNode);
Poly.registerNode(MaterialsNetworkObjNode);
Poly.registerNode(MaterialsNetworkSopNode);
Poly.registerNode(MeshLambertMatNode);
Poly.registerNode(HemisphereLightObjNode);

// register nodes for this plugin
import {polyPluginIFC} from './index';
Poly.registerPlugin(polyPluginIFC);

let _initialized = false;
async function init() {
	if (_initialized) {
		return;
	}
	_initialized = true;

	// create a scene
	const scene = new PolyScene();

	// create a sphere and plane
	const geo = scene.root().createNode('geo') as ExtendedGeoObjNode;
	const fileIFC1 = geo.createNode('fileIFC');

	fileIFC1.flags.display.set(true);

	// add a light
	scene.root().createNode('hemisphereLight');

	// create a camera
	const perspectiveCamera1 = scene.root().createNode('perspectiveCamera');
	perspectiveCamera1.p.t.set([30, 30, 30]);
	// add orbit_controls
	const events1 = perspectiveCamera1.createNode('eventsNetwork');
	const orbitsControls = events1.createNode('cameraOrbitControls');
	perspectiveCamera1.p.controls.setNode(orbitsControls);
	scene.root().mainCameraController.setCameraPath(perspectiveCamera1.path());

	scene.loadingController.markAsLoaded();

	// create viewer
	const element = document.getElementById('app');
	if (!element) {
		console.error('element not found');
		return;
	}
	const viewer = await perspectiveCamera1.createViewer({element});
	if (!viewer) {
		console.error('viewer not created');
		return;
	}
}

document.addEventListener('DOMContentLoaded', init);
init();
