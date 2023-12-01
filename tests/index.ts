import {QUnit} from '../tests/helpers/QUnit';
import {AllRegister} from '@polygonjs/polygonjs/dist/src/engine/poly/registers/All';
AllRegister.registerAll();

import {setupQUnit} from './helpers/setup';
import {testenginenodessopFileIFC} from './engine/nodes/sop/FileIFC';

setupQUnit(QUnit);

// register nodes for this plugin
import {Poly} from '@polygonjs/polygonjs/dist/src/engine/Poly';
import {polyPluginIFC} from '../src/index';
Poly.registerPlugin(polyPluginIFC);

// test
testenginenodessopFileIFC(QUnit);

QUnit.start();
