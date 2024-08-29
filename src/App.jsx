import React, { useState, useEffect } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import { getEvents } from './gateway/gateway.js';

import './common.scss';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());

  const [events, setEvents] = useState([]);
  useEffect(() => {
    updateDisplayedEvents();
  }, []);
  
  const updateDisplayedEvents = () => {
    getEvents().then(setEvents);
  };

  return (
    <>
      <Header
        weekStartDate={weekStartDate}
        setWeekStartDate={setWeekStartDate}
        events={events}
        updateDisplayedEvents={updateDisplayedEvents}
      />
      <Calendar
        weekStartDate={weekStartDate}
        events={events}
        updateDisplayedEvents={updateDisplayedEvents}
      />
    </>
  );
};

export default App;
