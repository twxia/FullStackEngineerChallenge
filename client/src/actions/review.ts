import { createAction } from 'typesafe-actions';
import { GET_REVIEWS, GET_REVIEWS_SUCCESS } from '../constants/review';
import { Review } from '../reducers/review';

export const getReviewsSuccess = createAction(
  GET_REVIEWS_SUCCESS,
  action => ({ data }: { data: Array<Review> }) =>
    action({
      data,
    })
);

export const getReviews = createAction(GET_REVIEWS);
