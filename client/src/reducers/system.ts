import produce from 'immer';
import { ActionType, getType } from 'typesafe-actions';
import * as actions from '../actions/system';

type Action = ActionType<typeof actions>;

export const initialState = {
  message: '',
};

export interface SystemState {
  readonly message: string;
}

export default (state = initialState, action: Action) =>
  produce(state, draft => {
    const { type, payload } = action;

    switch (type) {
      case getType(actions.updateMessage):
        draft.message = payload.message;
        return;
    }
  });
