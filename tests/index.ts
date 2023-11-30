import {QUnit} from '../tests/helpers/QUnit';
import {AllRegister} from '@polygonjs/polygonjs/dist/src/engine/poly/registers/All';
AllRegister.registerAll();

import {setupQUnit} from './helpers/setup';
import {testenginenodessopFileIFC} from './engine/nodes/sop/FileIFC';

setupQUnit(QUnit);

testenginenodessopFileIFC(QUnit);

QUnit.start();
