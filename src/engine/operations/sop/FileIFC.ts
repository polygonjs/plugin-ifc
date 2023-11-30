import {ASSETS_ROOT} from '@polygonjs/polygonjs/dist/src/core/loader/AssetsUtils';
import {DefaultOperationParams} from '@polygonjs/polygonjs/dist/src/core/operations/_Base';
import {IFCLoaderHandler} from '@polygonjs/polygonjs/dist/src/core/loader/geometry/IFC';
import {SopTypeFile} from '@polygonjs/polygonjs/dist/src/engine/poly/registers/nodes/types/Sop';
import {
	BaseFileSopOperation,
	BaseFileSopParams,
} from '@polygonjs/polygonjs/dist/src/engine/operations/sop/utils/File/_BaseFileOperation';
import {sanitizeUrl} from '@polygonjs/polygonjs/dist/src/core/UrlHelper';
import {Object3D} from 'three';

type IFCModel = Object3D;
interface FileIFCSopParams extends DefaultOperationParams {
	url: string;
	matrixAutoUpdate: boolean;
	coordinateToOrigin: boolean;
	includedCategories: string;
}

export class FileIFCSopOperation extends BaseFileSopOperation<IFCModel> {
	static override readonly DEFAULT_PARAMS: FileIFCSopParams = {
		url: sanitizeUrl(`${ASSETS_ROOT}/models/ifc/small.ifc`),
		matrixAutoUpdate: false,
		coordinateToOrigin: true,
		includedCategories: '*',
	};
	static override type(): Readonly<SopTypeFile.FILE_IFC> {
		return SopTypeFile.FILE_IFC;
	}

	protected _createGeoLoaderHandler(params: BaseFileSopParams) {
		return new IFCLoaderHandler(params.url, this._node);
	}
	protected override async _load(loader: IFCLoaderHandler, params: FileIFCSopParams) {
		if (this._node) {
			return await loader.load({
				node: this._node,
				coordinateToOrigin: params.coordinateToOrigin,
				includedCategories: params.includedCategories,
			});
		}
	}
}
