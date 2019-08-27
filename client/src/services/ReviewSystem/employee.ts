import { get } from './rest';

export const getEmployees = () =>
  get({
    endpoint: `/employees`,
  });
