import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import api from './apiMiddleware';

export default applyMiddleware(thunk, api);
