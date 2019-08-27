import produce from 'immer';
import { ActionType, getType } from 'typesafe-actions';
import { getEmployeesSuccess } from '../actions/employee';

const actions = {
  getEmployeesSuccess,
};

type Action = ActionType<typeof actions>;

export interface Employee {
  id: number;
  name: string;
  createdAt: number;
  updatedAt: number;
}

export interface EmployeeState {
  readonly list: Array<Employee>;
}

export const initialState = {
  list: [] as Array<Employee>,
};

export default (state = initialState, action: Action) =>
  produce(state, draft => {
    const { type, payload } = action;

    switch (type) {
      case getType(getEmployeesSuccess):
        draft.list = payload.data;
        return;
    }
  });
