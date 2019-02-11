import {
  SET_FILTER_PARAM,
} from '../constants/filter';

export const setFilterParam = param => ({
  type: SET_FILTER_PARAM,
  payload: { param },
});
