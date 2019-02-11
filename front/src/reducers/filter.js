import {
  SET_FILTER_PARAM,
} from '../constants/filter';

const initialState = 'all';

export default function filter(state = initialState, action) {
  switch (action.type) {
    case SET_FILTER_PARAM:
      return action.payload.param;
    default:
      return state;
  }
}
