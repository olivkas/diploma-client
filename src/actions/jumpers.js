import moment from 'moment';

import axios from 'axios';
import {
  GET_JUMPERS,
  GET_JUMPER,
  JUMPERS_ERROR,
  ADD_JUMPER,
  UPDATE_JUMPER,
  SEARCH_JUMPERS,
} from './types';

//Search malfunctions
export const searchJumpers = (input) => async (dispatch) => {
  // try {
  const res = await axios.get('/jumpers');

  dispatch({
    type: SEARCH_JUMPERS,
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
export const getJumpers = () => async (dispatch) => {
  try {
    const res = await axios.get('/jumpers');

    dispatch({
      type: GET_JUMPERS,
      payload: res.data.reverse(),
    });
  } catch (err) {
    dispatch({
      type: JUMPERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get malfunction by ID
export const getJumperById = (jumperId) => async (dispatch) => {
  try {
    const res = await axios.get(`/jumpers/${jumperId}`);

    dispatch({
      type: GET_JUMPER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: JUMPERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Add malfunction
export const addJumper = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log(formData);

  try {
    const res = await axios.post('/jumpers', formData, config);

    dispatch({
      type: ADD_JUMPER,
      payload: res.data,
    });

    //  dispatch(setAlert(' Created', 'success'));
  } catch (err) {
    dispatch({
      type: JUMPERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Update Malfunction
export const updateJumper = (formData, jumperId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(`/jumpers/${jumperId}`, formData, config);

    dispatch({
      type: UPDATE_JUMPER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: JUMPERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
