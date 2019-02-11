import { combineReducers } from 'redux';
import photos from './photos';
import filter from './filter';

export default combineReducers({ photos, filter });
