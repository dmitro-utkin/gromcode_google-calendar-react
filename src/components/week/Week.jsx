import React from 'react';
import Day from '../day/Day.jsx';
import PropTypes from 'prop-types';
import './week.scss';

const Week = ({ weekDates, events, setEvents, month, color, updateDisplayedEvents }) => {
  return (
    <div className="calendar__week">
      {weekDates.map(dayStart => {
        const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);

        const dayEvents = events.filter(
          event => event.dateFrom > dayStart && event.dateTo < dayEnd,
        );

        return (
          <Day
            key={dayStart.getDate()}
            dataDay={dayStart.getDate()}
            dayEvents={dayEvents}
            setEvents={setEvents}
            month={month}
            color={color}
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
  setEvents: PropTypes.func.isRequired,
  month: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  updateDisplayedEvents: PropTypes.func.isRequired,
};

export default Week;
