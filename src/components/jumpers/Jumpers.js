import React, { Fragment, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getJumpers } from '../../actions/jumpers';
import { searchJumpers } from '../../actions/jumpers';
import JumperItem from './JumperItem';
import JumperForm from './JumperForm';
// import MalfunctionStatic from './MalfunctionStatic';
// import { Document, Packer, Paragraph, Table, TableCell, TableRow } from 'docx';
// import fs from 'fs';
// import { saveAs } from 'file-saver';

// const docx = require('docx');

const Jumpers = ({
  getJumpers,
  searchJumpers,
  jumper: { jumpers, loading },
}) => {
  const searchInput = useRef();

  useEffect(() => {
    getJumpers();
    // const { current } = searchInput;
  }, [getJumpers]);

  // const [searchData, setSearch] = useState({ search: '' });
  // const { search } = searchData;
  const [stateModal, setStateModal] = useState(false);
  // const [stateModalStatic, setStateModalStatic] = useState(false);

  const [stateSortDesc, setSortDesc] = useState(false);
  const [stateSortDate, setSortDate] = useState(false);
  const [stateSortGroup, setSortGroup] = useState(false);
  const [stateSortNum, setSortNum] = useState(false);

  // const onChange = (e) => {
  //   setSearch({ ...searchData, [e.target.name]: e.target.value });
  //   searchMalfunctions(searchData.search);
  // };
  const onChangeSortNum = () => {
    setSortNum(!stateSortNum);
    sortByNumber(stateSortNum);
  };

  const onChangeSortDesc = () => {
    setSortDesc(!stateSortDesc);
    sortByDescription(stateSortDesc);
  };

  const onChangeSortDate = () => {
    setSortDate(!stateSortDate);
    sortByDate(stateSortDate);
  };

  const onChangeSortGroup = () => {
    setSortGroup(!stateSortGroup);
    sortByGroup(stateSortGroup);
  };

  const sortByNumber = (stateSortNum) => {
    stateSortNum == true
      ? jumpers.sort((a, b) => (a > b ? 1 : -1))
      : jumpers.sort((a, b) => (a < b ? 1 : -1));
  };

  const sortByDescription = (stateSortDesc) => {
    stateSortDesc == true
      ? jumpers.sort((a, b) => (a.description > b.description ? 1 : -1))
      : jumpers.sort((a, b) => (a.description < b.description ? 1 : -1));
  };

  const sortByDate = (stateSortDate) => {
    stateSortDate == true
      ? jumpers.sort((a, b) => (a.date > b.date ? 1 : -1))
      : jumpers.sort((a, b) => (a.date < b.date ? 1 : -1));
  };

  const sortByGroup = (stateSortGroup) => {
    stateSortGroup == true
      ? jumpers.sort((a, b) => (a.group > b.group ? 1 : -1))
      : jumpers.sort((a, b) => (a.group < b.group ? 1 : -1));
  };

  const handleKeyPress = (e) => {
    // searchInput.current.focus();
    // console.log(search);
    // setSearch();
    // console.log(searchData.search);
    // searchData
    searchJumpers(searchInput.current.value);

    console.log(searchInput.current.value);
    if (e.key === 'Enter') {
      console.log('enter');
      // malfunctions.filter((item) =>
      //   item.description.includes(searchInput.current.value)
      // setSortGroup(!stateSortGroup);
      // sortByGroup(stateSortGroup);
      searchJumpers(searchInput.current.value);
      // getMalfunctions();
    }
  };

  return (
    <Fragment>
      {stateModal && <JumperForm stateModal={setStateModal} />}

      <div className='container-wr'>
        <div className='tools'>
          <div className='statistics'>
            <button className='btn' type='button'></button>
            <button className='btn' type='button'></button>
          </div>
          <div className='tools-btns'>
            <button className='btn btn-secondary btn-tools' type='button'>
              Фильтры
            </button>
            {/* <div className='box-search'> */}
            <div className='box-search btn-tools btn-secondary btn'>
              <span className='icon'>
                <i
                  class='fa fa-search'
                  aria-hidden='true'
                  onClick={onclick}
                ></i>
              </span>
              <input
                type='search'
                id='search'
                // name='search'
                placeholder='Поиск'
                ref={searchInput}
                // value={search}
                onKeyPress={handleKeyPress}
                // onChange={(e) => onChange(e)}
              />
              {/* </div> */}
            </div>
            {/* <button className='btn btn-secondary btn-tools' type='button'>
              <i class='fa fa-search' aria-hidden='true'></i>
              Поиск
            </button> */}
            <button
              className='btn btn-primary btn-tools'
              type='button'
              onClick={setStateModal}
            >
              Добавить
            </button>
          </div>
        </div>
        <div className='container-box'>
          <div className='table-head'>
            <table id='myTable'>
              <thead>
                <tr>
                  <td onClick={onChangeSortNum}>№</td>
                  <td onClick={onChangeSortDesc}>Неисправность</td>
                  <td onClick={onChangeSortGroup}>Группа</td>
                  <td onClick={onChangeSortDate}>Дата</td>
                </tr>
              </thead>
            </table>
          </div>
          <div class='table-body'>
            <table>
              <tbody>
                {jumpers.map((jumper, i) => (
                  <JumperItem key={jumper._id} jumper={jumper} i={i} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* <Link to='/pdf'>Pdf</Link> */}
    </Fragment>
  );
};

Jumpers.propTypes = {
  getJumpers: PropTypes.func.isRequired,
  searchJumpers: PropTypes.func.isRequired,
  jumper: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  jumper: state.jumper,
});

export default connect(mapStateToProps, {
  getJumpers,
  searchJumpers,
})(Jumpers);
