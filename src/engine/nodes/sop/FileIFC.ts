/**
 * Loads an IFC from a url.
 *
 *
 */
import {ParamEvent} from '@polygonjs/polygonjs/dist/src/engine/poly/ParamEvent';
import {TypedSopNode} from '@polygonjs/polygonjs/dist/src/engine/nodes/sop/_Base';
import {BaseNodeType} from '@polygonjs/polygonjs/dist/src/engine/nodes/_Base';
import {FileIFCSopOperation} from '../../operations/sop/FileIFC';
import {NodeParamsConfig, ParamConfig} from '@polygonjs/polygonjs/dist/src/engine/nodes/utils/params/ParamsConfig';
import {CoreGroup} from '@polygonjs/polygonjs/dist/src/core/geometry/Group';
import {Poly} from '@polygonjs/polygonjs/dist/src/engine/Poly';
import {getObjectAttributeAllCategoryNames} from '../../../core/geometry/ifc/IFCUtils';
import {GeometryExtensionExtended, SopFileTypeExtended} from '../../../core/geometry/ifc/IFCCommon';
const DEFAULT = FileIFCSopOperation.DEFAULT_PARAMS;
class FileIFCParamsConfig extends NodeParamsConfig {
	/** @param url to load the geometry from */
	url = ParamConfig.STRING(DEFAULT.url, {
		fileBrowse: {extensions: [GeometryExtensionExtended.IFC]},
	});

	/** @param sets the matrixAutoUpdate attribute for the objects loaded */
	matrixAutoUpdate = ParamConfig.BOOLEAN(0);
	/** @param centers the geometry to the origin */
	coordinateToOrigin = ParamConfig.BOOLEAN(0);
	/** @param excluded categories */
	includedCategories = ParamConfig.STRING(DEFAULT.includedCategories);
	/** @param reload the geometry */
	reload = ParamConfig.BUTTON(null, {
		callback: (node: BaseNodeType) => {
			FileIFCSopNode.PARAM_CALLBACK_reload(node as FileIFCSopNode);
		},
	});
	/** @param found categories */
	foundCategories = ParamConfig.STRING('', {
		cook: false,
		editable: false,
	});
}
const ParamsConfig = new FileIFCParamsConfig();

export class FileIFCSopNode extends TypedSopNode<FileIFCParamsConfig> {
	override paramsConfig = ParamsConfig;
	static override type() {
		return SopFileTypeExtended.FILE_IFC;
	}
	override dispose(): void {
		super.dispose();
		Poly.blobs.clearBlobsForNode(this);
	}

	private _operation: FileIFCSopOperation | undefined;
	private operation() {
		return (this._operation = this._operation || new FileIFCSopOperation(this.scene(), this.states, this));
	}
	override async cook(inputCoreGroups: CoreGroup[]) {
		const coreGroup = await this.operation().cook(inputCoreGroups, this.pv);

		const object = coreGroup.threejsObjects()[0];

		if (object) {
			object.traverse((child) => {
				child.matrixAutoUpdate = this.pv.matrixAutoUpdate;
				child.updateMatrix();
			});

			//
			const foundCategories = getObjectAttributeAllCategoryNames(object);
			if (foundCategories) {
				this.p.foundCategories.set(foundCategories);
			}
		}

		// console.log('done', object);
		this.setCoreGroup(coreGroup);
	}

	static PARAM_CALLBACK_reload(node: FileIFCSopNode) {
		node._paramCallbackReload();
	}
	private _paramCallbackReload() {
		// this.operation().clearLoadedBlob(this.pv);
		// set the param dirty is preferable to just the successors, in case the expression result needs to be updated
		this.p.url.setDirty();
		this.p.url.emit(ParamEvent.ASSET_RELOAD_REQUEST);
		// this.setDirty()
	}
}
