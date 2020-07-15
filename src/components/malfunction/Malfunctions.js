import React, { Fragment, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMalfunctions } from '../../actions/malfunction';
import { searchMalfunctions } from '../../actions/malfunction';
import MalfunctionItem from './MalfunctionItem';
import MalfunctionForm from './MalfunctionForm';
import MalfunctionStatic from './MalfunctionStatic';
import { Document, Packer, Paragraph, Table, TableCell, TableRow } from 'docx';
import fs from 'fs';
import { saveAs } from 'file-saver';

// const docx = require('docx');

const Malfunctions = ({
  getMalfunctions,
  searchMalfunctions,
  malfunction: { malfunctions, loading },
}) => {
  const searchInput = useRef();

  useEffect(() => {
    getMalfunctions();
    // const { current } = searchInput;
  }, [getMalfunctions]);

  // const [searchData, setSearch] = useState({ search: '' });
  // const { search } = searchData;
  const [stateModal, setStateModal] = useState(false);
  const [stateModalStatic, setStateModalStatic] = useState(false);

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
      ? malfunctions.sort((a, b) => (a > b ? 1 : -1))
      : malfunctions.sort((a, b) => (a < b ? 1 : -1));
  };

  const sortByDescription = (stateSortDesc) => {
    stateSortDesc == true
      ? malfunctions.sort((a, b) => (a.description > b.description ? 1 : -1))
      : malfunctions.sort((a, b) => (a.description < b.description ? 1 : -1));
  };

  const sortByDate = (stateSortDate) => {
    stateSortDate == true
      ? malfunctions.sort((a, b) => (a.date > b.date ? 1 : -1))
      : malfunctions.sort((a, b) => (a.date < b.date ? 1 : -1));
  };

  const sortByGroup = (stateSortGroup) => {
    stateSortGroup == true
      ? malfunctions.sort((a, b) => (a.group > b.group ? 1 : -1))
      : malfunctions.sort((a, b) => (a.group < b.group ? 1 : -1));
  };

  const handleKeyPress = (e) => {
    // searchInput.current.focus();
    // console.log(search);
    // setSearch();
    // console.log(searchData.search);
    // searchData
    searchMalfunctions(searchInput.current.value);

    console.log(searchInput.current.value);
    if (e.key === 'Enter') {
      console.log('enter');
      // malfunctions.filter((item) =>
      //   item.description.includes(searchInput.current.value)
      // setSortGroup(!stateSortGroup);
      // sortByGroup(stateSortGroup);
      searchMalfunctions(searchInput.current.value);
      // getMalfunctions();
    }
  };

  const generate = () => {
    const doc = new Document();

    const table = new Table({
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('№')],
            }),
            new TableCell({
              children: [new Paragraph('Смена')],
            }),
            new TableCell({
              children: [new Paragraph('ФИО')],
            }),
            new TableCell({
              children: [new Paragraph('Группа')],
            }),
            new TableCell({
              children: [new Paragraph('Подгруппа')],
            }),
            new TableCell({
              children: [new Paragraph('Дата')],
            }),
            new TableCell({
              children: [new Paragraph('Описание')],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('№')],
            }),
            new TableCell({
              children: [new Paragraph('Смена 2')],
            }),
            new TableCell({
              children: [new Paragraph('Шустров С.В.')],
            }),
            new TableCell({
              children: [new Paragraph('123в')],
            }),
            new TableCell({
              children: [new Paragraph('23')],
            }),
            new TableCell({
              children: [new Paragraph('21.02.2020')],
            }),
            new TableCell({
              children: [new Paragraph('Замена чего-то')],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('№')],
            }),
            new TableCell({
              children: [new Paragraph('Смена 2')],
            }),
            new TableCell({
              children: [new Paragraph('Шустров С.В.')],
            }),
            new TableCell({
              children: [new Paragraph('123в')],
            }),
            new TableCell({
              children: [new Paragraph('23')],
            }),
            new TableCell({
              children: [new Paragraph('21.02.2020')],
            }),
            new TableCell({
              children: [new Paragraph('Замена чего-то')],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('№')],
            }),
            new TableCell({
              children: [new Paragraph('Смена 2')],
            }),
            new TableCell({
              children: [new Paragraph('Соболь О.М')],
            }),
            new TableCell({
              children: [new Paragraph('2354а')],
            }),
            new TableCell({
              children: [new Paragraph('12')],
            }),
            new TableCell({
              children: [new Paragraph('30.05.2020')],
            }),
            new TableCell({
              children: [new Paragraph('Замена чего-то')],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('№')],
            }),
            new TableCell({
              children: [new Paragraph('Смена 2')],
            }),
            new TableCell({
              children: [new Paragraph('Шустров С.В.')],
            }),
            new TableCell({
              children: [new Paragraph('123в')],
            }),
            new TableCell({
              children: [new Paragraph('23')],
            }),
            new TableCell({
              children: [new Paragraph('21.02.2020')],
            }),
            new TableCell({
              children: [new Paragraph('Замена чего-то')],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('№')],
            }),
            new TableCell({
              children: [new Paragraph('Смена 1')],
            }),
            new TableCell({
              children: [new Paragraph('Колос С.В.')],
            }),
            new TableCell({
              children: [new Paragraph('433в')],
            }),
            new TableCell({
              children: [new Paragraph('23')],
            }),
            new TableCell({
              children: [new Paragraph('06.04.2020')],
            }),
            new TableCell({
              children: [new Paragraph('Замена чего-то')],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('№')],
            }),
            new TableCell({
              children: [new Paragraph('Смена 3')],
            }),
            new TableCell({
              children: [new Paragraph('Соболь О.М.')],
            }),
            new TableCell({
              children: [new Paragraph('452')],
            }),
            new TableCell({
              children: [new Paragraph('12')],
            }),
            new TableCell({
              children: [new Paragraph('11.05.2020')],
            }),
            new TableCell({
              children: [new Paragraph('Замена чего-то')],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('№')],
            }),
            new TableCell({
              children: [new Paragraph('Смена 2')],
            }),
            new TableCell({
              children: [new Paragraph('Шустров С.В.')],
            }),
            new TableCell({
              children: [new Paragraph('123в')],
            }),
            new TableCell({
              children: [new Paragraph('23')],
            }),
            new TableCell({
              children: [new Paragraph('21.02.2020')],
            }),
            new TableCell({
              children: [new Paragraph('Замена чего-то')],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('№')],
            }),
            new TableCell({
              children: [new Paragraph('Смена 1')],
            }),
            new TableCell({
              children: [new Paragraph('Людаков Ю.В.')],
            }),
            new TableCell({
              children: [new Paragraph('435в')],
            }),
            new TableCell({
              children: [new Paragraph('212')],
            }),
            new TableCell({
              children: [new Paragraph('24.05.2020')],
            }),
            new TableCell({
              children: [new Paragraph('Замена чего-то')],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph('№')],
            }),
            new TableCell({
              children: [new Paragraph('Смена 4')],
            }),
            new TableCell({
              children: [new Paragraph('Захаров К.Ю.')],
            }),
            new TableCell({
              children: [new Paragraph('123в')],
            }),
            new TableCell({
              children: [new Paragraph('32')],
            }),
            new TableCell({
              children: [new Paragraph('25.02.2020')],
            }),
            new TableCell({
              children: [new Paragraph('Замена чего-то')],
            }),
          ],
        }),
      ],
    });

    doc.addSection({
      children: [table],
    });

    Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, 'example.docx');
      console.log('Document created successfully');
    });
  };

  return (
    <Fragment>
      {stateModal && <MalfunctionForm stateModal={setStateModal} />}
      {stateModalStatic && (
        <MalfunctionStatic
          stateModal={setStateModalStatic}
          malfunctions={malfunctions}
        />
      )}

      <div className='container-wr'>
        <div className='tools'>
          <div className='statistics'>
            <button
              className='btn btn-primary btn-tools'
              type='button'
              onClick={setStateModalStatic}
            >
              Статистика
            </button>
            <button
              className='btn btn-secondary btn-tools'
              type='button'
              onClick={generate}
            >
              Сохранить как документ
            </button>
          </div>
          <div className='tools-btns'>
            <button
              className='btn btn-secondary btn-tools'
              type='button'
              onClick={generate}
            >
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
                {malfunctions.map((malfunction, i) => (
                  <MalfunctionItem
                    key={malfunction._id}
                    malfunction={malfunction}
                    i={i}
                  />
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

Malfunctions.propTypes = {
  getMalfunctions: PropTypes.func.isRequired,
  searchMalfunctions: PropTypes.func.isRequired,
  malfunction: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  malfunction: state.malfunction,
});

export default connect(mapStateToProps, {
  getMalfunctions,
  searchMalfunctions,
})(Malfunctions);
