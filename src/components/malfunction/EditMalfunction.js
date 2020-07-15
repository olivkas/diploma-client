import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  updateMalfunction,
  getMalfunctionById,
} from '../../actions/malfunction';
import moment from 'moment';
import Moment from 'react-moment';
import DatePicker from 'react-datepicker';
import { ModalLink } from 'react-router-modal-gallery';

import { set } from 'mongoose';

const EditMalfunction = ({
  malfunction: { malfunction, loading },
  updateMalfunction,
  getMalfunctionById,
  match,
}) => {
  const [formData, setFormData] = useState({
    shift: '',
    fullName: '',
    group: '',
    subgroup: '',
    date: moment(),
    description: '',
  });

  const [files, setFile] = useState({
    file1: '',
    file2: '',
    file3: '',
  });

  const mal = malfunction || {};
  const imgs = mal.imgNames;

  // mal.imgNames.map((img, i) => (imgs[i] = img));
  // console.log(imgs);
  // console.log(imgs[0]);
  // mal.imgNames.map((img, i) => (imgs[i] = img));

  useEffect(() => {
    getMalfunctionById(match.params.id);

    setFormData({
      shift: loading || !mal.shift ? '' : mal.shift,
      fullName: loading || !mal.fullName ? '' : mal.fullName,
      group: loading || !mal.group ? '' : mal.group,
      subgroup: loading || !mal.subgroup ? '' : mal.subgroup,
      date: loading || !mal.date ? '' : moment(mal.date),
      // <Moment format='DD.MM.YYYY'>{mal.date}</Moment>
      description: loading || !mal.description ? '' : mal.description,
    });
    setFile({
      file1: !mal.imgNames[0] ? '' : mal.imgNames[0],
      file2: !mal.imgNames[1] ? '' : mal.imgNames[1],
      file3: !mal.imgNames[2] ? '' : mal.imgNames[2],
    });
  }, [loading, getMalfunctionById]);

  const { file1, file2, file3 } = files;

  const { shift, fullName, group, subgroup, date, description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeDate = (e) => {
    setFormData({ ...formData, [e.target.name]: moment(e.target.value) });
  };

  const onChangeFile = (e, i) => {
    setFile({ ...files, [e.target.name]: e.target.files[0] });
  };

  return (
    <div className='mod'>
      <div className='modalDgOverlay'>
        <div className='modalDgWindow'>
          <form
            enctype='multipart/form-data'
            class='form'
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData();
              data.append('shift', shift);
              data.append('fullName', fullName);
              data.append('group', group);
              data.append('subgroup', subgroup);
              data.append('date', date);
              data.append('description', description);
              if (file1 != '' && file1 != null) data.append('file', file1);
              if (file2 != '' && file2 != null) data.append('file', file2);
              if (file3 != '' && file3 != null) data.append('file', file3);
              updateMalfunction(data, mal._id);

              // closeModal();
            }}
          >
            <div className='modalBody'>
              <div className='shift'>
                <label>Смена*</label>
                <select
                  className='s1'
                  name='shift'
                  value={shift}
                  onChange={(e) => onChange(e)}
                  required
                >
                  <option value='' className='placeholder'>
                    Выберите смену
                  </option>
                  <option value='Смена №1'>Смена №1</option>
                  <option value='Смена №2'>Смена №2</option>
                  <option value='Смена №3'>Смена №3</option>
                  <option value='Смена №4'>Смена №4</option>
                </select>
              </div>
              <div className='fullName'>
                <label>ФИО*</label>

                <input
                  className='s1'
                  type='text'
                  name='fullName'
                  value={fullName}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
              <div className='group'>
                <label>Группа*</label>

                <input
                  className='s1'
                  type='text'
                  name='group'
                  value={group}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
              <div className='subgroup'>
                <label>Подгруппа*</label>

                <input
                  className='s1'
                  type='text'
                  name='subgroup'
                  value={subgroup}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
              <div className='date'>
                <label>Дата*</label>
                <input
                  className='s1'
                  type='date'
                  name='date'
                  value={moment(date).format('YYYY-MM-DD')}
                  onChange={(e) => onChangeDate(e)}
                  required
                />
              </div>
              <div className='description'>
                <label>Описание*</label>
                <textarea
                  className='s2'
                  type='text'
                  name='description'
                  value={description}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
            </div>
            <hr />
            <div className='modalFooter'>
              <div className='photos'>
                <div className='photo-add'>
                  <input
                    className='inputfile'
                    id='file1'
                    type='file'
                    name='file1'
                    onChange={(e) => onChangeFile(e)}
                  />

                  <label for='file1'>
                    {file1.name ? (
                      <div className='labelfile'>
                        <div className='labelfile'>{file1.name}</div>
                      </div>
                    ) : file1.path ? (
                      <div className='labelfile'>
                        <img
                          key={file1._id}
                          src={`/${file1.path}`}
                          alt={`${file1.name}`}
                        />
                      </div>
                    ) : (
                      <div className='labelfile'>
                        <i class='fa fa-plus' aria-hidden='true'></i>Фото
                      </div>
                    )}
                  </label>
                </div>
                <div className='photo-add'>
                  <input
                    className='inputfile'
                    id='file2'
                    type='file'
                    name='file2'
                    onChange={(e) => onChangeFile(e)}
                  />

                  <label for='file2'>
                    {file2.name ? (
                      <div className='labelfile'>
                        <div className='labelfile'>{file2.name}</div>
                      </div>
                    ) : file2.path ? (
                      <div className='labelfile'>
                        <img
                          key={file2._id}
                          src={`/${file2.path}`}
                          alt={`${file2.name}`}
                        />
                      </div>
                    ) : (
                      <div className='labelfile'>
                        <i class='fa fa-plus' aria-hidden='true'></i>Фото
                      </div>
                    )}
                  </label>
                </div>
                <div className='photo-add'>
                  <input
                    className='inputfile'
                    id='file3'
                    type='file'
                    name='file3'
                    onChange={(e) => onChangeFile(e)}
                  />

                  <label for='file3'>
                    {file3.name ? (
                      <div className='labelfile'>
                        <div className='labelfile'>{file3.name}</div>
                      </div>
                    ) : file3.path ? (
                      <div className='labelfile'>
                        <img
                          key={file3._id}
                          src={`/${file3.path}`}
                          alt={`${file3.name}`}
                        />
                      </div>
                    ) : (
                      <div className='labelfile'>
                        <i class='fa fa-plus' aria-hidden='true'></i>Фото
                      </div>
                    )}
                  </label>
                </div>
              </div>
              {/* <ModalLink to={`/malfunctions/${mal._id}`}> */}
              {/* <div className='photo-fields'>
                {mal.imgNames &&
                  mal.imgNames.map((img) =>
                    console.log(img._id)
                    // <img key={img._id} src={`/${img.path}`} />
                  )}
              </div> */}
              <input type='submit' class='btn btn-primary' value='Сохранить' />
              {/* </ModalLink> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

EditMalfunction.propTypes = {
  updateMalfunction: PropTypes.func.isRequired,
  getMalfunctionById: PropTypes.func.isRequired,
  malfunction: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  malfunction: state.malfunction,
});

export default connect(mapStateToProps, {
  updateMalfunction,
  getMalfunctionById,
})(withRouter(EditMalfunction));
