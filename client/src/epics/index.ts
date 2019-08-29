import { combineEpics } from 'redux-observable';

import system from './system';
import employee from './employee';
import review from './review';

const combinedEpics = combineEpics(...employee, ...system, ...review);

export default combinedEpics;
