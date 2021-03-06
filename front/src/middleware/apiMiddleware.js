import { GET_PHOTOS } from '../constants/photos';
import { getPhotos } from './modules/photos';

const handlers = {
  [GET_PHOTOS]: getPhotos,
};

export default store => next => action => {
  const handler = handlers[action.type];
  if (handler) {
    handler(action, store);
  } else {
    next(action);
  }
};
