//
import * as WEBIFC from 'web-ifc';
import {FragmentsGroup} from 'bim-fragment';
import {
	IfcPropertiesManager,
	FragmentIfcLoader,
	IfcPropertiesFinder,
	IfcCategories,
	Components,
	SimpleScene,
	PostproductionRenderer,
	SimpleCamera,
	SimpleRaycaster,
} from 'openbim-components';

export {
	IfcPropertiesManager,
	FragmentIfcLoader,
	IfcPropertiesFinder,
	IfcCategories,
	Components,
	WEBIFC,
	SimpleScene,
	PostproductionRenderer,
	SimpleCamera,
	SimpleRaycaster,
	FragmentsGroup,
};

export enum SopFileTypeExtended {
	FILE_IFC = 'fileIFC',
}
export enum GeometryExtensionExtended {
	IFC = 'ifc',
}
