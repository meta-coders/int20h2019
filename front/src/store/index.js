import { createStore } from 'redux';
import reducers from '../reducers';
import middlewares from '../middleware';

const configureStore = preloadedState =>
  createStore(reducers, preloadedState, middlewares);

export default configureStore;
