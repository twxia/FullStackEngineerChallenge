import { createAction } from 'typesafe-actions';
import { UPDATE_MESSAGE } from '../constants/system';

export const updateMessage = createAction(
  UPDATE_MESSAGE,
  action => ({ message }: { message: string }) =>
    action({
      message,
    })
);
