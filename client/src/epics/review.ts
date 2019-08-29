import { of, from } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';
import { Epic } from 'redux-observable';
import { ActionType, isActionOf } from 'typesafe-actions';

import { RootState } from '../reducers';
import * as actions from '../actions/review';
import { getReviews } from '../services/ReviewSystem/review';

type Action = ActionType<typeof actions>;

export const getReviewsEpic: Epic<Action, Action, RootState> = action$ =>
  action$.pipe(
    filter(isActionOf(actions.getReviews)),
    switchMap(() =>
      from(getReviews()).pipe(
        switchMap(data =>
          of(actions.getReviewsSuccess({ data: data.result || [] }))
        )
      )
    )
  );

export default [getReviewsEpic];
