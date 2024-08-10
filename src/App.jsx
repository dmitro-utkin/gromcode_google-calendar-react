import React, { useState, useEffect } from "react";
import Header from "./components/header/Header.jsx";
import Calendar from "./components/calendar/Calendar.jsx";
import { getEvents } from "./gateway/gateway.js";

import "./common.scss";

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(new Date());

  const [events, setEvents] = useState([]);
  useEffect(() => {
    getEvents().then(setEvents);
  }, []);

  const addEvent = (newEvent) => {
    setEvents((prevEvents) => {
      if (!prevEvents.some(event => event.id === newEvent.id)) {
        return [...prevEvents, newEvent];
      }
      return prevEvents;
    });
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
        color="blue"
        addEvent={addEvent}
        setEvents={setEvents}
        updateDisplayedEvents={updateDisplayedEvents}
      />
    </>
  );
};

export default App;
