import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Moment from 'react-moment';
import { ModalLink } from 'react-router-modal-gallery';
import Malfunction from './Malfunction';

const MalfunctionItem = ({
  malfunction: { _id, description, group, date },
  i,
}) => {
  const dates = moment();
  // const { match } = props;
  return (
    <tr id={_id} className='item'>
      <td>
        <Link to={`/malfunctions/${_id}`}>{i + 1}</Link>
      </td>
      <td>
        <ModalLink to={`/malfunctions/${_id}`} className='link'>
          {description}
        </ModalLink>
      </td>
      <td>
        <ModalLink to={`/malfunctions/${_id}`} className='link'>
          {group}
        </ModalLink>
      </td>
      <td>
        <ModalLink to={`/malfunctions/${_id}`} className='link'>
          {<Moment format='DD.MM.YYYY'>{date}</Moment>}
        </ModalLink>
      </td>
    </tr>
  );
};

MalfunctionItem.propTypes = {
  malfunction: PropTypes.object.isRequired,
};

export default MalfunctionItem;
