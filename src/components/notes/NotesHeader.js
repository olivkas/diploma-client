import React from 'react';
import './NotesHeader.css';
import moment from 'moment';

const NotesHeader = ({
  openModal,
  openSelectDateList,
  isMonth,
  isWeek,
  isDay,
  currentDate,
  onclickNext,
  onclickPrev,
  onclickToday,
  addActiveClass,
  active,
}) => (
  <div className='primaryHeader'>
    <div className='header_wrapper'>
      <div className='left'>
        <button className='btn-today ' onClick={onclickToday}>
          Сегодня
        </button>
        <div className='row'>
          <i
            className='fa fa-caret-left curPrev'
            aria-hidden='true'
            onClick={onclickPrev}
          ></i>

          <i
            className='fa fa-caret-right curNext'
            aria-hidden='true'
            onClick={onclickNext}
          ></i>
        </div>
      </div>

      <div className='currentDate'>
        <div className='curDate-data' onClick={openSelectDateList}>
          {moment(currentDate).format('MMMM YYYY')}
        </div>
      </div>
      <div className='btn btn-primary plus' onClick={openModal}>
        <i className={`fa fa-plus addBtn`} aria-hidden='true' />
      </div>
    </div>
  </div>
);

export default NotesHeader;
