import { SHARED_VALUES_TO_IMPORT } from '../shared/values-to-import/shared-values-to-import.constant';
import { aot_0 } from './transpilers/transpile-attach-node-to-js-lines';
import { aot_1 } from './transpilers/transpile-create-reactive-async-node-to-js-lines';
import { aot_2, aot_3, aot_4, aot_5 } from './transpilers/transpile-create-reactive-element-node-to-js-lines';
import { aot_6 } from './transpilers/transpile-create-reactive-for-loop-node-to-js-lines';
import { aot_7 } from './transpilers/transpile-create-reactive-if-node-to-js-lines';
import { aot_8 } from './transpilers/transpile-create-reactive-switch-node-to-js-lines';
import { aot_9 } from './transpilers/transpile-create-reactive-text-node-to-js-lines';
import { aot_10 } from './transpilers/transpile-create-static-text-node-to-js-lines';
import { aot_11 } from './transpilers/transpile-set-reactive-attribute-to-js-lines';
import { aot_12 } from './transpilers/transpile-set-reactive-class-names-list-to-js-lines';
import { aot_13 } from './transpilers/transpile-set-reactive-class-to-js-lines';
import { aot_14, aot_15 } from './transpilers/transpile-set-reactive-event-listener-to-js-lines';
import { aot_16 } from './transpilers/transpile-set-reactive-input-to-js-lines';
import { aot_17, aot_18 } from './transpilers/transpile-set-reactive-output-to-js-lines';
import { aot_19 } from './transpilers/transpile-set-reactive-property-to-js-lines';
import { aot_20 } from './transpilers/transpile-set-reactive-style-properties-map-to-js-lines';
import { aot_21 } from './transpilers/transpile-set-reactive-style-property-to-js-lines';
import { aot_22, aot_23 } from './transpilers/transpile-set-static-attribute-to-js-lines';

export const VALUES_TO_IMPORT_FOR_AOT_BASED_REACTIVE_HTML = {
  ...SHARED_VALUES_TO_IMPORT,
  aot_0,
  aot_1,
  aot_2,
  aot_3,
  aot_4,
  aot_5,
  aot_6,
  aot_7,
  aot_8,
  aot_9,
  aot_10,
  aot_11,
  aot_12,
  aot_13,
  aot_14,
  aot_15,
  aot_16,
  aot_17,
  aot_18,
  aot_19,
  aot_20,
  aot_21,
  aot_22,
  aot_23,
};
