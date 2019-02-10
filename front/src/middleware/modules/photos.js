import { getPhotosSuccess, getPhotosFailure } from '../../actions/photos';

export const getPhotos = (action, store) => {
  fetch(action.payload.url)
    .then(photos => getPhotosSuccess(photos))
    .catch(error => getPhotosFailure(error))
    .then(nextAction => store.dispatch(nextAction));
};
