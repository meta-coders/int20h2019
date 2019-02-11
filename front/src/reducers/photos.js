import { GET_PHOTOS_SUCCESS } from '../constants/photos';

const initialState = [];

export default function photos(state = initialState, action) {
  switch (action.type) {
    case GET_PHOTOS_SUCCESS:
      return action.payload.photos;
    default:
      return state;
  }
}
