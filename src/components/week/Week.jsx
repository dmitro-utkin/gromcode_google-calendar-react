import React from 'react';
import Day from '../day/Day.jsx';
import PropTypes from 'prop-types';
import './week.scss';

const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;

const Week = ({ weekDates, events, month, updateDisplayedEvents }) => {
  return (
    <div className="calendar__week">
      {weekDates.map(dayStart => {
        const dayEnd = new Date(dayStart.getTime() + MILLISECONDS_IN_A_DAY);

        const dayEvents = events.filter(
          event => event.dateFrom >= dayStart && event.dateTo <= dayEnd,
        );

        return (
          <Day
            key={dayStart.getDate()}
            dataDay={dayStart.getDate()}
            dayEvents={dayEvents}
            month={month}
            updateDisplayedEvents={updateDisplayedEvents}
          />
        );
      })}
    </div>
  );
};

Week.propTypes = {
  weekDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
  events: PropTypes.array.isRequired,
  month: PropTypes.string.isRequired,
  updateDisplayedEvents: PropTypes.func.isRequired,
};

export default Week;
