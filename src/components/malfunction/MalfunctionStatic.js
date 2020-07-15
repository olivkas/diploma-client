import React from 'react';
import moment from 'moment';
import Moment from 'react-moment';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const MalfunctionStatic = ({ stateModal, malfunctions }) => {
  const quantityPerMonth = [];

  const closeModal = () => {
    stateModal();
  };

  const getStatistic = (malfunctions) => {
    for (let i = 1; i <= 12; i++) {
      let count = 0;
      malfunctions.forEach((mal) => {
        if (moment(mal.date).format('M') == i) count++;
      });
      quantityPerMonth.push(count);
    }
  };

  getStatistic(malfunctions);

  const data = [
    {
      name: 'Янв',
      количество: quantityPerMonth[0],
    },
    {
      name: 'Фев',
      количество: quantityPerMonth[1],
    },
    {
      name: 'Мар',
      количество: quantityPerMonth[2],
    },
    {
      name: 'Апр',
      количество: quantityPerMonth[3],
    },
    {
      name: 'Май',
      количество: quantityPerMonth[4],
    },
    {
      name: 'Июн',
      количество: quantityPerMonth[5],
    },
    {
      name: 'Июл',
      количество: quantityPerMonth[6],
    },
    {
      name: 'Авг',
      количество: quantityPerMonth[7],
    },
    {
      name: 'Сен',
      количество: quantityPerMonth[8],
    },
    {
      name: 'Окт',
      количество: quantityPerMonth[9],
    },
    {
      name: 'Ноя',
      количество: quantityPerMonth[10],
    },
    {
      name: 'Дек',
      количество: quantityPerMonth[11],
    },
  ];

  return (
    <div className='modal'>
      <div className='modalOverlay'>
        <div className='modalWindow'>
          <div className='modalHeader'>
            <div className='modalTitle'>Статистика неисправностей за год</div>
            <i
              className='fa fa-times fa-lg'
              aria-hidden='true'
              onClick={closeModal}
            ></i>
          </div>
          {/* <hr /> */}

          <div className='statistic-box'>
            <AreaChart
              width={700}
              height={500}
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Area
                type='monotone'
                dataKey='количество'
                stroke='#28a745'
                fill='#80dda7'
              />
            </AreaChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MalfunctionStatic;
