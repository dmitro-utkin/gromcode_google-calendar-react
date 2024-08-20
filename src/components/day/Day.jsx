import React, { useState, useEffect } from 'react';
import Hour from '../hour/Hour.jsx';
import PropTypes from 'prop-types';

const Day = ({ dataDay, dayEvents, month, setEvents, updateDisplayedEvents, color }) => {
  const [hourlyEvents, setHourlyEvents] = useState([]);

  useEffect(() => {
    const groupEventsByHour = () => {
      return Array(24)
        .fill()
        .map((_, hour) => {
          return dayEvents
            .filter(event => event.dateFrom.getHours() === hour)
            .map(event => ({
              ...event,
              id: event.id.toString(),
            }));
        });
    };

    setHourlyEvents(groupEventsByHour());
  }, [dayEvents]);

  return (
    <div className="calendar__day" data-day={dataDay}>
      {hourlyEvents.map((hourEvents, hour) => (
        <Hour
          key={dataDay + hour}
          dataHour={hour}
          hourEvents={hourEvents}
          setEvents={setEvents}
          updateDisplayedEvents={updateDisplayedEvents}
          dataDay={dataDay}
          month={month}
          color={color}
        />
      ))}
    </div>
  );
};

Day.propTypes = {
  setEvents: PropTypes.func.isRequired,
  dataDay: PropTypes.number.isRequired,
  dayEvents: PropTypes.array.isRequired,
  month: PropTypes.string.isRequired,
  updateDisplayedEvents: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
};

export default Day;
