import { get, post, remove, put } from './rest';

export const addEmployee = ({ name }: { name: string }) =>
  post({
    endpoint: `/employees`,
    body: {
      name,
    },
  });

export const getEmployees = () =>
  get({
    endpoint: `/employees`,
  });

export const removeEmployee = ({ id }: { id: string }) =>
  remove({
    endpoint: `/employees/${id}`,
  });

export const updateEmployee = ({
  id,
  name,
  review,
}: {
  id: string;
  name?: string;
  review?: Array<string>;
}) =>
  put({
    endpoint: `/employees/${id}`,
    body: {
      ...(name && { name }),
      ...(review && { review }),
    },
  });
