import React from "react";
import Day from "../day/Day.jsx";
import PropTypes from "prop-types";
import "./week.scss";

const Week = ({ weekDates, events, month, updateDisplayedEvents }) => {  
  return (
    <div className="calendar__week">
      {weekDates.map((dayStart) => {
        const dayEnd = new Date(dayStart.getTime()).setHours(
          dayStart.getHours() + 24
        );

        const dayEvents = events.filter(
          (event) => event.dateFrom > dayStart && event.dateTo < dayEnd
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

};

export default Week;
