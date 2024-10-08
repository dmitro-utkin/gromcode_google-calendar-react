import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Navigation from '../navigation/Navigation.jsx';
import Week from '../week/Week.jsx';
import Sidebar from '../sidebar/Sidebar.jsx';
import { generateWeekRange, getDisplayedMonth, getWeekStartDate } from '../../utils/dateUtils';
import './calendar.scss';

const Calendar = ({ events, weekStartDate, updateDisplayedEvents }) => {
  const [month, setMonth] = useState(getDisplayedMonth(getWeekStartDate(weekStartDate)));

  useEffect(() => {
    setMonth(getDisplayedMonth(getWeekStartDate(weekStartDate)));
  }, [weekStartDate]);

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  return (
    <section className="calendar">
      <div className="calendar__time-label">GMT +02</div>
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week
            weekDates={weekDates}
            events={events}
            month={month}
            updateDisplayedEvents={updateDisplayedEvents}
          />
        </div>
      </div>
    </section>
  );
};

Calendar.propTypes = {
  weekStartDate: PropTypes.instanceOf(Date).isRequired,
  updateDisplayedEvents: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
};

export default Calendar;
