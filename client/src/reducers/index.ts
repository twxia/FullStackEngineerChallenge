import { combineReducers } from 'redux';

import system, { SystemState } from './system';
import employee, { EmployeeState } from './employee';

export type RootState = {
  system: SystemState;
  employee: EmployeeState;
};

export const reducers = {
  system,
  employee,
};

export default combineReducers(reducers);
