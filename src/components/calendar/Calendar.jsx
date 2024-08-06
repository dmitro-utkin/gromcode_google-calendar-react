import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Navigation from '../navigation/Navigation.jsx';
import Week from '../week/Week.jsx';
import Sidebar from '../sidebar/Sidebar.jsx';
import events from '../../gateway/events.js';
import './calendar.scss';

const Calendar = ({ weekDates }) => {
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    console.log('Loading events:', events);
    setEventList(events);
  }, []);

  const today = new Date();
  const currentMonth = today.getMonth() + 1; // Місяці в JavaScript починаються з 0
  const currentDay = today.getDate();

  return (
    <section className="calendar">
      <div className="calendar__time-label">GMT +02</div>
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week weekDates={weekDates} events={eventList} currentMonth={currentMonth} currentDay={currentDay} />
        </div>
      </div>
    </section>
  );
};

Calendar.propTypes = {
  weekDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
};

export default Calendar;
