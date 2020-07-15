import React from 'react';
import './MonthForm.css';

const MonthForm = ({ weekdays, days }) => (
  <div className='month-wrapper'>
    <div className='calendar-week-list'>
      <ul className='calendar-week'>{weekdays}</ul>
    </div>
    <div className='calendar-days-list'>
      <ul className='calendar-days'>{days}</ul>
    </div>
  </div>
);

export default MonthForm;
