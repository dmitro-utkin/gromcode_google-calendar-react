import React from 'react';
import Day from '../day/Day.jsx';
import PropTypes from 'prop-types';
import './week.scss';

const Week = ({ weekDates, events, currentMonth, currentDay }) => {
  return (
    <div className="calendar__week">
      {weekDates.map((dayStart) => {
        const dayEnd = new Date(dayStart.getTime()).setHours(
          dayStart.getHours() + 24
        );

        //getting all events from the day we will render
        const dayEvents = events.filter(
          (event) => event.dateFrom > dayStart && event.dateTo < dayEnd
        );

        const isCurrentDay = currentMonth === dayStart.getMonth() && currentDay === dayStart.getDate();

        return (
          <Day
          key={dayStart.getDate()}
          dataDay={dayStart.getDate()}
          dayEvents={dayEvents}
          currentMonth={currentMonth}
          currentDay={currentDay}
          />
        );
      })}
    </div>
  );
};

Week.propTypes = {
  weekDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      dateFrom: PropTypes.instanceOf(Date).isRequired,
      dateTo: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
  currentMonth: PropTypes.number.isRequired,
  currentDay: PropTypes.number.isRequired,
};

export default Week;
