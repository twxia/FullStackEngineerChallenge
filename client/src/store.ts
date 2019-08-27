import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { ActionType } from 'typesafe-actions';
import rootReducer, { RootState } from './reducers';
import * as actions from './actions/employee';
import rootEpic from './epics';

type Action = ActionType<typeof actions>;

interface CustomWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
}

declare let window: CustomWindow;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = (initialState?: RootState) => {
  const epicMiddleware = createEpicMiddleware<Action, Action, RootState>();

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(epicMiddleware))
  );

  epicMiddleware.run(rootEpic);

  return store;
};
