import { getPhotosSuccess, getPhotosFailure } from '../../actions/photos';

export const getPhotos = (action, store) => {
  fetch(action.payload.url)
    .then(response => response.json())
    .then(json => getPhotosSuccess(json.photos))
    .catch(error => getPhotosFailure(error))
    .then(nextAction => store.dispatch(nextAction));
};
