import type {GeoNodeChildrenMap} from '@polygonjs/polygonjs/dist/src/engine/poly/registers/nodes/Sop';
import {FileIFCSopNode} from './engine/nodes/sop/FileIFC';

export interface ExtendedGeoNodeChildrenMap extends GeoNodeChildrenMap {
	fileIFC: FileIFCSopNode;
}
