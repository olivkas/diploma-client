import React from 'react';
import './SelectDate.css';

const SelectDate = ({ isOpenDateList, getListDateComponent }) =>
  isOpenDateList && (
    <div className='dateListOverlay'>
      <div className='dateWindow'>
        {/* <div className='bthToday' onClick={onclickToday}>
          Today
        </div> */}
        {getListDateComponent}
      </div>
    </div>
  );

export default SelectDate;
