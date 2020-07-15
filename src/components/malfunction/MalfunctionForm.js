import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addMalfunction } from '../../actions/malfunction';
import moment from 'moment';
import DatePicker from 'react-datepicker';

import { set } from 'mongoose';

const MalfunctionForm = ({ addMalfunction, stateModal }) => {
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

  const closeModal = () => {
    stateModal();
  };

  return (
    <div className='modal'>
      <div className='modalOverlay'>
        <div className='modalWindow'>
          <div className='modalHeader'>
            <div className='modalTitle'>Новая неисправность</div>
            <i
              className='fa fa-times fa-lg'
              aria-hidden='true'
              onClick={closeModal}
            ></i>
          </div>
          <hr />
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
              addMalfunction(data);
              closeModal();
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
                  value={date.format('YYYY-MM-DD')}
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
                    {file1 ? (
                      <div className='labelfile'>{file1.name}</div>
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
                    {file2 ? (
                      <div className='labelfile'>{file2.name}</div>
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
                    {file3 ? (
                      <div className='labelfile'>{file3.name}</div>
                    ) : (
                      <div className='labelfile'>
                        <i class='fa fa-plus' aria-hidden='true'></i>Фото
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <input type='submit' class='btn btn-primary' value='Добавить' />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

MalfunctionForm.propTypes = {
  addMalfunction: PropTypes.func.isRequired,
};

export default connect(null, { addMalfunction })(MalfunctionForm);
