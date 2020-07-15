import React from 'react';
import PropTypes from 'prop-types';

const MalfunctionModal = ({ malfunction: { _id, shift } }) => {
  return <div>{_id}</div>;
};

MalfunctionModal.propTypes = {};

export default MalfunctionModal;
