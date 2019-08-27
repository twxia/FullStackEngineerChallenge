import { combineEpics } from 'redux-observable';

import system from './system';
import employee from './employee';

const combinedEpics = combineEpics(...employee, ...system);

export default combinedEpics;
