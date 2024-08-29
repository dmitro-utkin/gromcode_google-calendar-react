import React, { useState, useEffect } from 'react';
import Hour from '../hour/Hour.jsx';
import PropTypes from 'prop-types';

const Day = ({ dataDay, dayEvents, month, updateDisplayedEvents }) => {
  const [hourlyEvents, setHourlyEvents] = useState([]);

  useEffect(() => {
    const groupEventsByHour = () => {
      return dayEvents.reduce((eventsByHour, event) => {
        const hour = event.dateFrom.getHours();
        eventsByHour[hour].push({ ...event, id: event.id.toString() });
        return eventsByHour;
      }, new Array(24).fill(null).map(() => []));
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
          updateDisplayedEvents={updateDisplayedEvents}
          dataDay={dataDay}
          month={month}
        />
      ))}
    </div>
  );
};

Day.propTypes = {
  dataDay: PropTypes.number.isRequired,
  dayEvents: PropTypes.array.isRequired,
  month: PropTypes.string.isRequired,
  updateDisplayedEvents: PropTypes.func.isRequired,
};

export default Day;
