import moment from 'moment';

import axios from 'axios';
import {
  GET_MALFUNCTIONS,
  GET_MALFUNCTION,
  MALFUNCTIONS_ERROR,
  ADD_MALFUNCTION,
  UPDATE_MALFUNCTION,
  SEARCH_MALFUNCTIONS,
} from './types';

//Search malfunctions
export const searchMalfunctions = (input) => async (dispatch) => {
  // try {
  const res = await axios.get('/malfunctions');

  dispatch({
    type: SEARCH_MALFUNCTIONS,
    payload: res.data.filter(
      (item) =>
        item.description.includes(input) ||
        item.group.includes(input) ||
        item.date.includes(input) ||
        item.fullName.includes(input) ||
        item.shift.includes(input)
    ),
  });
  // } catch (err) {
  //   dispatch({
  //     type: MALFUNCTIONS_ERROR,
  //     payload: { msg: err.response.statusText, status: err.response.status },
  //   });
  // }
};

//Get malfunctions
export const getMalfunctions = () => async (dispatch) => {
  try {
    const res = await axios.get('/malfunctions');

    dispatch({
      type: GET_MALFUNCTIONS,
      payload: res.data.reverse(),
    });
  } catch (err) {
    dispatch({
      type: MALFUNCTIONS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get malfunction by ID
export const getMalfunctionById = (malfunctionId) => async (dispatch) => {
  try {
    const res = await axios.get(`/malfunctions/${malfunctionId}`);

    dispatch({
      type: GET_MALFUNCTION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MALFUNCTIONS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add malfunction
export const addMalfunction = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log(formData);

  try {
    const res = await axios.post('/malfunctions', formData, config);

    dispatch({
      type: ADD_MALFUNCTION,
      payload: res.data,
    });

    //  dispatch(setAlert(' Created', 'success'));
  } catch (err) {
    dispatch({
      type: MALFUNCTIONS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Update Malfunction
export const updateMalfunction = (formData, malfunctionId) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(
      `/malfunctions/${malfunctionId}`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_MALFUNCTION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MALFUNCTIONS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
