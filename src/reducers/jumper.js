import {
  GET_JUMPERS,
  GET_JUMPER,
  JUMPERS_ERROR,
  ADD_JUMPER,
  UPDATE_JUMPER,
  SEARCH_JUMPERS,
} from '../actions/types';

const initialState = {
  jumpers: [],
  jumper: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_JUMPER:
    case UPDATE_JUMPER:
      return {
        ...state,
        jumper: payload,
        loading: false,
      };
    case GET_JUMPERS:
    case SEARCH_JUMPERS:
      return {
        ...state,
        jumpers: payload,
        loading: false,
      };
    case ADD_JUMPER:
      return {
        ...state,
        jumpers: [payload, ...state.jumpers],
        loading: false,
      };
    case JUMPERS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
