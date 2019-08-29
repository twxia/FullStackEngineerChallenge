import { get, post, remove, put } from './rest';

export const addEmployee = ({ name }: { name: string }) =>
  post({
    endpoint: `/employee`,
    body: {
      name,
    },
  });

export const getEmployees = () =>
  get({
    endpoint: `/employee`,
  });

export const removeEmployee = ({ id }: { id: string }) =>
  remove({
    endpoint: `/employee/${id}`,
  });

export const updateEmployee = ({
  id,
  name,
  review,
}: {
  id: string;
  name?: string;
  review?: string;
}) =>
  put({
    endpoint: `/employee/${id}`,
    body: {
      ...(name && { name }),
      ...(review && { review }),
    },
  });

export const reviewColleague = ({
  id,
  targetId,
  content,
}: {
  id: string;
  targetId: string;
  content: string;
}) =>
  post({
    endpoint: `/review`,
    body: {
      id,
      targetId,
      content,
    },
  });
