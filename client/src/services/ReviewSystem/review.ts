import { get } from './rest';

export const getReviews = () =>
  get({
    endpoint: `/review`,
  });
