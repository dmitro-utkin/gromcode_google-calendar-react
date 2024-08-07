import React, { useState, useEffect } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import { getEvents } from './gateway/gateway.js';
import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';

import './common.scss';

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(getWeekStartDate(new Date()));
  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));
  
  const [ events, setEvents ] = useState([]);

  useEffect(() => {
    updateDisplayedEvents();
  }, []);

  const updateDisplayedEvents = () => {
    getEvents().then(data => setEvents(data));
  };


  return (
    <>
      <Header weekStartDate={weekStartDate} setWeekStartDate={setWeekStartDate} updateDisplayedEvents={updateDisplayedEvents}/>
      <Calendar weekDates={weekDates} events={events} updateDisplayedEvents={updateDisplayedEvents} />
    </>
  );
};

export default App;