import produce from 'immer';
import { getType } from 'typesafe-actions';
import { getReviewsSuccess, getReviews } from '../actions/review';

export interface Review {
  id: string;
  employeeId: string;
  reviewerId: string;
  createdAt: number;
  updatedAt: number;
  content: string;
}

export interface ReviewState {
  readonly list: Array<Review>;
  readonly isProcessing: boolean;
}

export const initialState: ReviewState = {
  list: [],
  isProcessing: false,
};

export default (state = initialState, action: any) =>
  produce(state, draft => {
    const { type, payload } = action;

    switch (type) {
      case getType(getReviews):
        draft.isProcessing = true;
        return;

      case getType(getReviewsSuccess):
        draft.list = payload.data;
        draft.isProcessing = false;
        return;
    }
  });
