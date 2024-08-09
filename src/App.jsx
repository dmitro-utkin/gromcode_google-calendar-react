import React, { useState, useEffect } from "react";
import Header from "./components/header/Header.jsx";
import Calendar from "./components/calendar/Calendar.jsx";
import PropTypes from "prop-types";
import { getEvents } from "./gateway/gateway.js";

import "./common.scss";

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());

  const [events, setEvents] = useState([]);
  useEffect(() => getEvents().then(setEvents), [weekStartDate]);

  const addEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const updateDisplayedEvents = () => {
    getEvents().then(setEvents);
  };

  return (
    <>
      <Header
        weekStartDate={weekStartDate}
        setWeekStartDate={setWeekStartDate}
        addEvent={addEvent}
        events={events}
        setEvents={setEvents}
        updateDisplayedEvents={updateDisplayedEvents}
      />
      <Calendar
        weekStartDate={weekStartDate}
        events={events}
        addEvent={addEvent}
        setEvents={setEvents}
        updateDisplayedEvents={updateDisplayedEvents}
      />
    </>
  );
};

export default App;
