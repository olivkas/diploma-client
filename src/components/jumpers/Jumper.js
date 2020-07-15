import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import Moment from 'react-moment';
import { ModalLink } from 'react-router-modal-gallery';

// import Dialog from '@material-ui/core/Dialog';
import { getJumperById } from '../../actions/jumpers';
import Jumpers from './Jumpers';
// import { Link } from '@material-ui/core';

const Jumper = ({ getJumperById, jumper: { jumper, loading }, match }) => {
  const mal = jumper || {};

  useEffect(() => {
    getJumperById(match.params.id);
  }, [getJumperById]);
  console.log(mal.imgNames);

  return (
    <div className='mod'>
      <div className='modalDgOverlay'>
        <div className='modalDgWindow'>
          <div className='modalDgBody'>
            <div className='modalDgBody-top'>
              <div className='description-field'>{mal.description}</div>
              <div className='photo-fields'>
                {mal.imgNames &&
                  mal.imgNames.map((img) => (
                    <img key={img._id} src={`/${img.path}`} />
                  ))}
              </div>
            </div>
            <hr />
            <div className='modalDgBody-bottom'>
              <table className='modal-table'>
                <thead>
                  <tr>
                    <th>{mal.shift}</th>
                    <th>{mal.fullName}</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Группа {mal.group}</td>
                    <td>Подгруппа {mal.subgroup}</td>
                  </tr>
                  <tr>
                    <td>
                      Дата/ {<Moment format='DD.MM.YYYY'>{mal.date}</Moment>}
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className='modalDgFooter'>
            <ModalLink to={`/jumpers/${mal._id}/edit`}>
              <button class='btn btn-primary'>Редактировать</button>
            </ModalLink>
          </div>
        </div>
      </div>
    </div>
  );
};
Jumper.propTypes = {
  getJumperById: PropTypes.func.isRequired,

  jumper: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  jumper: state.jumper,
});

export default connect(mapStateToProps, { getJumperById })(Jumper);
