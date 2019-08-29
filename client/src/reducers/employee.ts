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
  setEmployeeAsReviewer,
  setEmployeeAsReviewerSuccess,
  reviewColleagueSuccess,
  reviewColleague,
} from '../actions/employee';

export interface Employee {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  review?: Array<string>;
}

export interface ListOfEmployee {
  [key: string]: Employee;
}

export interface EmployeeState {
  readonly list: ListOfEmployee;
  readonly isProcessing: boolean;
}

export const initialState = {
  list: {} as ListOfEmployee,
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
      case getType(setEmployeeAsReviewer):
      case getType(reviewColleague):
        draft.isProcessing = true;
        return;

      case getType(getEmployeesSuccess):
        draft.list = payload.data.reduce(
          (acc: ListOfEmployee, cur: Employee) => {
            acc[cur.id] = cur;
            return acc;
          },
          {}
        );
        draft.isProcessing = false;
        return;

      case getType(removeEmployeeSuccess): {
        delete draft.list[payload.id];
        draft.isProcessing = false;
        return;
      }

      case getType(updateEmployeeSuccess): {
        draft.list[payload.data.id] = payload.data;
        draft.isProcessing = false;
        return;
      }

      case getType(setEmployeeAsReviewerSuccess): {
        draft.list[payload.data.id] = payload.data;
        draft.isProcessing = false;
        return;
      }

      case getType(addEmployeeSuccess): {
        draft.list[payload.data.id] = payload.data;
        draft.isProcessing = false;
        return;
      }

      case getType(reviewColleagueSuccess): {
        draft.list[payload.data.id] = payload.data;
        draft.isProcessing = false;
        return;
      }
    }
  });
