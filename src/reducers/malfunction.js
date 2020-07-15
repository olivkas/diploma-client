import {
  GET_MALFUNCTIONS,
  GET_MALFUNCTION,
  MALFUNCTIONS_ERROR,
  ADD_MALFUNCTION,
  UPDATE_MALFUNCTION,
  SEARCH_MALFUNCTIONS,
} from '../actions/types';

const initialState = {
  malfunctions: [],
  malfunction: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MALFUNCTION:
    case UPDATE_MALFUNCTION:
      return {
        ...state,
        malfunction: payload,
        loading: false,
      };
    case GET_MALFUNCTIONS:
    case SEARCH_MALFUNCTIONS:
      return {
        ...state,
        malfunctions: payload,
        loading: false,
      };
    case ADD_MALFUNCTION:
      return {
        ...state,
        malfunctions: [payload, ...state.malfunctions],
        loading: false,
      };
    case MALFUNCTIONS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
