import {
  GET_PHOTOS,
  GET_PHOTOS_SUCCESS,
  GET_PHOTOS_FAILURE,
} from '../constants/photos';

export const getPhotosSuccess = photos => ({
  type: GET_PHOTOS_SUCCESS,
  loading: false,
  payload: { photos },
});

export const getPhotosFailure = error => ({
  type: GET_PHOTOS_FAILURE,
  loading: false,
  error: true,
  payload: error,
});

export const getPhotos = () => ({
  type: GET_PHOTOS,
  loading: true,
  payload: { url },
});
