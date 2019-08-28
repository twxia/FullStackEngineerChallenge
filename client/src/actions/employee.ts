import { createAction } from 'typesafe-actions';
import {
  GET_EMPLOYEES,
  GET_EMPLOYEES_SUCCESS,
  REMOVE_EMPLOYEE,
  REMOVE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE,
  UPDATE_EMPLOYEE_SUCCESS,
  ADD_EMPLOYEE_SUCCESS,
  ADD_EMPLOYEE,
  SET_EMPLOYEE_AS_REVIEWER,
  SET_EMPLOYEE_AS_REVIEWER_SUCCESS,
} from '../constants/employee';
import { Employee } from '../reducers/employee';

export const addEmployee = createAction(
  ADD_EMPLOYEE,
  action => ({ name }: { name: string }) =>
    action({
      name,
    })
);

export const addEmployeeSuccess = createAction(
  ADD_EMPLOYEE_SUCCESS,
  action => ({ data }: { data: Employee }) =>
    action({
      data,
    })
);

export const getEmployeesSuccess = createAction(
  GET_EMPLOYEES_SUCCESS,
  action => ({ data }: { data: Array<Employee> }) =>
    action({
      data,
    })
);

export const getEmployees = createAction(GET_EMPLOYEES);

export const removeEmployee = createAction(
  REMOVE_EMPLOYEE,
  action => ({ id }: { id: string }) =>
    action({
      id,
    })
);

export const removeEmployeeSuccess = createAction(
  REMOVE_EMPLOYEE_SUCCESS,
  action => ({ id }: { id: string }) =>
    action({
      id,
    })
);

export const updateEmployee = createAction(
  UPDATE_EMPLOYEE,
  action => ({ id, name }: { id: string; name: string }) =>
    action({
      id,
      name,
    })
);

export const updateEmployeeSuccess = createAction(
  UPDATE_EMPLOYEE_SUCCESS,
  action => ({ data }: { data: Employee }) =>
    action({
      data,
    })
);

export const setEmployeeAsReviewer = createAction(
  SET_EMPLOYEE_AS_REVIEWER,
  action => ({ id, targetId }: { id: string; targetId: string }) =>
    action({
      id,
      targetId,
    })
);

export const setEmployeeAsReviewerSuccess = createAction(
  SET_EMPLOYEE_AS_REVIEWER_SUCCESS,
  action => ({ data }: { data: Employee }) =>
    action({
      data,
    })
);
