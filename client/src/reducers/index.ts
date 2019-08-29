import { combineReducers } from 'redux';

import system, { SystemState } from './system';
import employee, { EmployeeState } from './employee';
import review, { ReviewState } from './review';

export type RootState = {
  system: SystemState;
  employee: EmployeeState;
  review: ReviewState;
};

export const reducers = {
  system,
  employee,
  review,
};

export default combineReducers(reducers);
