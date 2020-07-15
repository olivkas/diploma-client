// import React from 'react';

// const Notes = () => {
//   return <div>Notes</div>;
// };

// export default Notes;

import React, { Component } from 'react';
import moment from 'moment';

import NotesHeader from './NotesHeader';
import SelectDate from './SelectDate';
import { EventForm } from './EventForm';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MonthForm from './MonthForm';
// import { WeekForm } from './Calendar/WeekForm/WeekForm';
// import { DayForm } from './Calendar/DayForm';

const ROW_HEIGHT = 23;
const EVENT_MAX_WIDTH = 200;

export default class Notes extends Component {
  state = {
    events: [],
    mode: 1,
    isOpenModal: false,
    isOpenDateList: false,
    dateContext: moment(),
    currentDate: moment().format('MMMM YYYY'),
    selectedDay: moment(this.dateContext),
    windowDate: 1,
    weekIndex: 0,
    active: 'isMonth',
  };

  daysInMonth = () => {
    return this.state.selectedDay.daysInMonth();
  };

  addActiveClass = (e) => {
    const clicked = e.target.id;
    if (this.state.active === clicked) {
      this.setState({ active: '' });
    } else {
      this.setState({ active: clicked });
    }
  };

  onDayClick = (e, day) => {
    this.setState({ selectedDay: day });
  };

  getDaysWeeksforHeader = (selectedDay) => {
    let oneWeek = [];
    let strWeek = '';
    let currentDay =
      moment(selectedDay).format('d') == 0
        ? 7
        : moment(selectedDay).format('d');
    for (let i = 1; i <= 7; i++) {
      oneWeek.push(
        moment(selectedDay)
          .add(i - currentDay, 'days')
          .format('D MMMM YYYY')
      );
    }

    oneWeek = oneWeek.filter((day, i) => {
      if (i == 0 || i == 6) return day[i];
    });
    strWeek = `${oneWeek[0]} - ${oneWeek[1]}`;
    return strWeek;
  };

  onclickNext = () => {
    switch (this.state.mode) {
      case 1:
        return this.setState({
          selectedDay: moment(this.state.selectedDay).add(1, 'M'),
          currentDate: moment(this.state.selectedDay)
            .add(1, 'M')
            .format('MMMM YYYY'),
        });
      case 2:
        return this.setState({
          selectedDay: moment(this.state.selectedDay).add(1, 'w'),
          currentDate: this.getDaysWeeksforHeader(
            this.state.selectedDay.add(1, 'w')
          ),
        });
      case 3:
        return this.setState({
          selectedDay: moment(this.state.selectedDay).add(1, 'd'),
          currentDate: this.state.selectedDay.add(1, 'd').format('D MMMM YYYY'),
        });
    }
  };

  onclickPrev = () => {
    switch (this.state.mode) {
      case 1:
        return this.setState({
          selectedDay: moment(this.state.selectedDay).add(-1, 'M'),
          currentDate: moment(this.state.selectedDay)
            .add(-1, 'M')
            .format('MMMM YYYY'),
        });
      case 2:
        return this.setState({
          selectedDay: moment(this.state.selectedDay).add(-1, 'w'),
          currentDate: this.getDaysWeeksforHeader(
            this.state.selectedDay.add(-1, 'w')
          ),
        });
      case 3:
        return this.setState({
          selectedDay: moment(this.state.selectedDay).add(-1, 'd'),
          currentDate: this.state.selectedDay
            .add(-1, 'd')
            .format('D MMMM YYYY'),
        });
    }
  };

  openModal = () => {
    this.setState({ isOpenModal: true });
    console.log(this.state.isOpenModal);
  };

  openDateList = () => {
    this.setState({ isOpenDateList: !this.state.isOpenDateList });
  };

  isOpenMonth = () => {
    this.setState({
      mode: 1,
      currentDate: this.state.selectedDay.format('MMMM YYYY'),
    });
  };

  isOpenWeek = () => {
    this.setState({
      mode: 2,
      currentDate: this.getDaysWeeksforHeader(this.state.selectedDay),
    });
  };

  isOpenDay = () => {
    this.setState({
      mode: 3,
      currentDate: this.state.selectedDay.format('D MMMM YYYY'),
    });
  };

  handleSubmit = () => {
    this.setState({ isOpenModal: false });
  };

  handleCancel = () => {
    this.setState({ isOpenModal: false });
  };

  handleEventCreation = (event) => {
    this.setState({ events: [...this.state.events, event] });
  };

  onClickMonthList = (e, month) => {
    const selected = this.state.selectedDay;
    this.setState({
      isOpenDateList: !this.state.isOpenDateList,
      selectedDay: moment(this.state.selectedDay).set({
        y: selected.format('YYYY'),
        M: month - 1,
      }),
      currentDate: moment(this.state.selectedDay)
        .set({ y: selected.format('YYYY'), M: month - 1 })
        .format('MMMM YYYY'),
    });
  };

  onClickWeeksList = (e, selecte) => {
    this.setState({
      isOpenDateList: !this.state.isOpenDateList,
      selectedDay: moment(this.state.selectedDay).set({
        y: selecte.format('YYYY'),
        M: selecte.format('M') - 1,
        D: selecte.format('D'),
      }),
      currentDate: this.getDaysWeeksforHeader(
        moment(this.state.selectedDay).set({
          y: selecte.format('YYYY'),
          M: selecte.format('M') - 1,
          D: selecte.format('D'),
        })
      ),
    });
  };

  onClickCalendarList = (value) => {
    this.setState({
      isOpenDateList: !this.state.isOpenDateList,
      selectedDay: moment(this.state.selectedDay).set({
        y: moment(value).format('YYYY'),
        M: moment(value).format('M') - 1,
        D: moment(value).format('D'),
      }),
      currentDate: moment(this.state.selectedDay)
        .set({
          y: moment(value).format('YYYY'),
          M: moment(value).format('M') - 1,
          D: moment(value).format('D'),
        })
        .format('D MMMM YYYY'),
    });
  };

  onclickToday = () => {
    const now = this.state.dateContext;
    switch (this.state.mode) {
      case 1:
        return this.setState({
          // isOpenDateList: !this.state.isOpenDateList,
          selectedDay: moment(this.state.selectedDay).set({
            y: now.format('YYYY'),
            M: now.format('M') - 1,
          }),
          currentDate: moment(this.state.selectedDay)
            .set({ y: now.format('YYYY'), M: now.format('M') - 1 })
            .format('MMMM YYYY'),
        });
      case 2:
        return this.setState({
          // isOpenDateList: !this.state.isOpenDateList,
          selectedDay: moment(this.state.selectedDay).set({
            y: now.format('YYYY'),
            M: now.format('M') - 1,
            D: now.format('D'),
          }),
          currentDate: this.getDaysWeeksforHeader(
            this.state.selectedDay.set({
              y: now.format('YYYY'),
              M: now.format('M') - 1,
              D: now.format('D'),
            })
          ),
        });
      case 3:
        return this.setState({
          // isOpenDateList: !this.state.isOpenDateList,
          selectedDay: moment(this.state.selectedDay).set({
            y: now.format('YYYY'),
            M: now.format('M') - 1,
            D: now.format('D'),
          }),
          currentDate: moment(this.state.selectedDay)
            .set({
              y: now.format('YYYY'),
              M: now.format('M') - 1,
              D: now.format('D'),
            })
            .format('D MMMM YYYY'),
        });
    }
  };

  currentDay = () => {
    return this.state.dateContext.format('D');
  };

  firstDayOfMonth = () => {
    const detaContext = this.state.selectedDay;
    let firstDay = moment(detaContext).startOf('month').format('d');
    return firstDay == 0 ? (firstDay = 6) : (firstDay = firstDay - 1);
  };

  firstDayofWeek = () => {
    moment.updateLocale('en', {
      weekdays: ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
      week: {
        dow: 1,
      },
      months: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
      ],
    });
    return moment.weekdays(true);
  };

  weekdays = this.firstDayofWeek().map((day) => {
    return <li key={day}>{day}</li>;
  });

  getEventCurrentDay = (date, month, year) => {
    const currentDate = moment(this.state.dateContext.toDate()).set({
      y: year,
      M: month - 1,
      D: date,
    });
    return this.state.events.filter((event) =>
      event.eventDate.isSame(currentDate, 'day')
    );
  };

  drawDays = () => {
    // const { selectedDay, dateContext, onDayClick } = this.props;
    const blanks = [];

    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(
        <div key={i * 70}>
          <li data-day='' className='emptySlot'>
            {''}
          </li>
        </div>
      );
    }

    const daysInMonth = [];
    for (let d = 1; d <= this.daysInMonth(); d++) {
      const year = this.state.selectedDay.format('YYYY');
      const month = this.state.selectedDay.format('M');
      const day = this.state.selectedDay.format('D');
      const currentDate = moment(this.state.dateContext).set({
        y: year,
        M: month - 1,
        D: d,
      });
      const className =
        d == this.currentDay() && this.state.dateContext.format('M') == month
          ? 'current-day'
          : '';
      const selectedClass = d == day ? ' selected-day ' : '';
      const events = this.getEventCurrentDay(d, month, year);
      const slicedEvents = events.slice(0, 2);

      daysInMonth.push(
        <div
          key={d}
          className='weeksday'
          onClick={(e) => {
            this.onDayClick(e, currentDate);
          }}
        >
          <li data-day={`${d}`} className={className + selectedClass}>
            {slicedEvents.map((day, i) => (
              <div className='day' key={i * 23}>
                {day.eventName}
              </div>
            ))}
            {/* {this.state.events.length > 2 && (
              // <div>+{this.state.events.length - 2}</div>
            )} */}
          </li>
        </div>
      );
    }

    const totalSlots = [...blanks, ...daysInMonth];
    const rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        let insertRow = cells.slice();
        rows.push(insertRow);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        const insertRow = cells.slice();
        rows.push(insertRow);
      }
    });

    return rows;
  };

  dayForHour = () => {
    // const { events, selectedDay } = this.props;
    const hours = [];
    const todayEvents = this.state.events.filter((event) =>
      event.eventDate.isSame(this.state.selectedDay, 'day')
    );

    for (let i = 0, j = 1; i <= 23, j <= 24; i++, j++) {
      const startTime = moment(this.state.selectedDay.toDate()).set({
        h: i,
        m: 0,
        s: 0,
      });
      const endTime = moment(this.state.selectedDay.toDate()).set({
        h: j,
        m: 0,
        s: 0,
      });
      const currentEvents = todayEvents.filter(
        (event) =>
          startTime.isSameOrBefore(event.eventTimeFrom) &&
          event.eventTimeFrom.isBefore(endTime)
      );

      hours.push(
        <>
          <div className='day-time'>
            {startTime.format(`HH.mm`)}-{endTime.format('HH.mm')}
          </div>
          <div className='day-strEvent'>
            {currentEvents.map(this.renderEvent)}
          </div>
        </>
      );
    }

    return hours;
  };

  drawWeek = () =>
    this.getDaysWeeks().map((d, i) => {
      // const { dateContext, selectedDay, onDayClick } = this.props;
      const year = d.format('YYYY');
      const month = d.format('M');
      const day = d.format('D');
      const className =
        day == this.currentDay() &&
        this.state.dateContext.format('M') == this.state.selectedDay.format('M')
          ? 'current-day'
          : '';
      const selectedClass =
        day == this.state.selectedDay.format('D') &&
        month == this.state.selectedDay.format('M')
          ? ' selected-day '
          : '';

      return (
        <div
          key={i * 50}
          onClick={(e) => {
            this.onDayClick(e, d);
          }}
        >
          <li data-day={day} className={className + selectedClass}>
            {this.getEventCurrentDay(day, month, year).map((day, i) => (
              <div className='event-week' key={i * 23}>{`${
                day.eventName
              }  ${day.eventTimeFrom.format('HH:mm')}-${day.eventTimeTo.format(
                'HH:mm'
              )}`}</div>
            ))}
          </li>
        </div>
      );
    });

  drawOneDay = () =>
    this.dayForHour().map((h, i) => {
      return (
        <div className='day-hour' key={i * 101}>
          {h}
        </div>
      );
    });

  getListWeeks = (firstDay, selected) => {
    let oneWeek = [];
    const week = [];
    let strWeek = '';
    const currentDay =
      moment(firstDay).format('d') == 0 ? 7 : moment(firstDay).format('d');
    for (let i = 1; i <= 7; i++) {
      oneWeek.push(
        moment(firstDay)
          .add(i - currentDay, 'days')
          .format('DD.MM.YYYY')
      );
      week.push(
        moment(firstDay)
          .add(i - currentDay, 'days')
          .format('YYYY-MM-DD')
      );
    }
    const isDay =
      selected.isSameOrAfter(moment(week[0]), 'day') &&
      selected.isSameOrBefore(moment(week[6]), 'day');

    oneWeek = oneWeek.filter((day, i) => {
      if (i == 0 || i == 6) return day[i];
    });

    strWeek = `${oneWeek[0]} - ${oneWeek[1]}`;

    return { strWeek, isDay };
  };

  getListMonth = () => {
    const months = moment.months();
    const renderMounts = [];
    for (let i = 0; i < months.length; i++) {
      renderMounts.push(
        <div
          className='month'
          onClick={(e) => {
            this.props.onClickMonthList(
              e,
              moment().month(months[i]).format('M')
            );
          }}
        >
          {months[i]}
        </div>
      );
    }

    return <div className='dateContextMonths'>{renderMounts}</div>;
  };

  getDaysWeeks = () => {
    const dayOfWeek = [];
    const currentDay =
      moment(this.state.selectedDay).format('d') == 0
        ? 7
        : moment(this.state.selectedDay).format('d');
    for (let i = 1; i <= 7; i++) {
      dayOfWeek.push(
        moment(this.state.selectedDay).add(i - currentDay, 'days')
      );
    }

    return dayOfWeek;
  };

  // renderListWeeks = () => {
  //   // const { selectedDay, onClickWeeksList } = this.props;
  //   const firstDayMonth = moment(this.state.selectedDay.toDate()).startOf(
  //     'month'
  //   );
  //   const rowLenght = this.drawDays().length;
  //   const listWeeks = Array.from({ length: rowLenght - 1 }).map((_value, i) =>
  //     this.getListWeeks(
  //       moment(firstDayMonth).add(i, 'w'),
  //       this.state.selectedDay
  //     )
  //   );
  //   const weekIndex = listWeeks.findIndex((week) => week.isDay);

  //   return (
  //     <div className='dateContextWeeks'>
  //       {listWeeks.map((week, i) => (
  //         <div
  //           className='week'
  //           onClick={(e) => {
  //             onClickWeeksList(
  //               e,
  //               moment(this.state.selectedDay).add(i - weekIndex, 'w')
  //             );
  //           }}
  //         >
  //           {week.strWeek}{' '}
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };

  renderCalendar = () => {
    // const { selectedDay, onClickCalendarList } = this.props;
    return (
      <div className='dateContextCalendar'>
        <DatePicker
          selected={this.state.selectedDay && this.state.selectedDay.toDate()}
          onChange={this.onClickCalendarList}
          inline
        />
      </div>
    );
  };

  renderEvent = (event, index) => {
    // const minStart = event.eventTimeFrom.format('m');
    // const k = minStart / 60;
    // const during = moment.duration(
    //   moment(event.eventTimeTo).diff(moment(event.eventTimeFrom))
    // );
    // let eventHeight =
    //   ROW_HEIGHT * during.hours() + (ROW_HEIGHT * during.minutes()) / 60;

    // if (eventHeight < 20) {
    //   eventHeight = 20;
    // }
    return (
      <div
        // style={{
        //   height: `${eventHeight}px`,
        //   top: `${ROW_HEIGHT * k}px`,
        //   left: EVENT_MAX_WIDTH * index + 6 * (index + 1),
        // }}
        className='event'
      >
        {`${event.eventDescription}`}
      </div>
    );
  };

  getListDateComponent = () => {
    // switch (mode) {
    //   case 1:
    // return this.getListMonth();
    // case 2:
    //   return this.renderListWeeks();
    // case 3:
    return this.renderCalendar();
    // }
  };

  days = () =>
    this.drawDays().map((d, i) => {
      return (
        <div className={`weeksday ${i}`} key={i * 100}>
          {d}
        </div>
      );
    });

  //   getComponent = (mode) => {
  //     switch (mode) {
  //       case 1:
  //         return <MonthForm weekdays={this.weekdays} days={this.days()} />;
  //       case 2:
  //         return (
  //           <WeekForm weekdays={this.weekdays} daysOfWeek={this.drawWeek()} />
  //         );
  //       case 3:
  //         return <DayForm drawOneDay={this.drawOneDay()} />;
  //     }
  // };l

  render() {
    // const {
    //   active,
    //   currentDate,
    //   mode,
    //   onclickNext,
    //   onclickPrev,
    //   openSelectDateList,
    //   openModal,
    //   isMonth,
    //   isWeek,
    //   isDay,
    //   addActiveClass,
    //   isOpenDateList,
    //   onclickToday,
    //   onCreateEvent,
    //   isOpenModal,
    //   onCancel,
    //   onSubmit,
    //   isIntersection,
    //   events,
    // } = this.props;

    const {
      active,
      currentDate,
      events,
      isOpenModal,
      isOpenDateList,
    } = this.state;

    return (
      <>
        <NotesHeader
          active={active}
          currentDate={currentDate}
          onclickNext={this.onclickNext}
          onclickPrev={this.onclickPrev}
          openSelectDateList={this.openDateList}
          openModal={this.openModal}
          addActiveClass={this.addActiveClass}
          onclickToday={this.onclickToday}
        />

        <div className='calendar-wr'>
          <div className='calendar-form'>
            {/* {this.getComponent(mode)} */}
            <MonthForm weekdays={this.weekdays} days={this.days()} />
            <SelectDate
              isOpenDateList={isOpenDateList}
              getListDateComponent={this.renderCalendar()}
            />
            <EventForm
              events={events}
              onCreateEvent={this.handleEventCreation}
              isOpenModal={isOpenModal}
              onCancel={this.handleCancel}
              onSubmit={this.handleSubmit}
              // isIntersection={isIntersection}
            />
          </div>
        </div>
      </>
    );
  }
}
