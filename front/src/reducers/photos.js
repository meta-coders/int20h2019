import { GET_PHOTOS_SUCCESS } from '../constants/photos';

const initialState = {
  photos: [],
};

export default function photos(state = initialState, action) {
  switch (action.type) {
    case GET_PHOTOS_SUCCESS:
      return {
        photos: action.payload.photos,
      };

    default:
      return state;
  }
}
