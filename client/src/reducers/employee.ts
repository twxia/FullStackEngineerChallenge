import produce from 'immer';
import { getType } from 'typesafe-actions';
import {
  getEmployeesSuccess,
  removeEmployeeSuccess,
  updateEmployeeSuccess,
  getEmployees,
  removeEmployee,
  updateEmployee,
  addEmployeeSuccess,
  addEmployee,
} from '../actions/employee';

export interface Employee {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
}

export interface EmployeeState {
  readonly list: Array<Employee>;
  readonly isProcessing: boolean;
}

export const initialState = {
  list: [] as Array<Employee>,
  isProcessing: false,
};

export default (state = initialState, action: any) =>
  produce(state, draft => {
    const { type, payload } = action;

    switch (type) {
      case getType(getEmployees):
      case getType(removeEmployee):
      case getType(updateEmployee):
      case getType(addEmployee):
        draft.isProcessing = true;
        return;

      case getType(getEmployeesSuccess):
        draft.list = payload.data;
        draft.isProcessing = false;
        return;

      case getType(removeEmployeeSuccess): {
        const index = draft.list.findIndex(
          employee => employee.id === payload.id
        );
        if (index !== -1) {
          delete draft.list[index];
        }
        draft.isProcessing = false;
        return;
      }

      case getType(updateEmployeeSuccess): {
        const index = draft.list.findIndex(
          employee => employee.id === payload.data.id
        );

        if (index !== -1) {
          draft.list[index] = payload.data;
        }
        draft.isProcessing = false;
        return;
      }

      case getType(addEmployeeSuccess): {
        draft.list.push(payload.data);
        draft.isProcessing = false;
        return;
      }
    }
  });
