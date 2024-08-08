import React, { useState, useEffect } from "react";
import Header from "./components/header/Header.jsx";
import Calendar from "./components/calendar/Calendar.jsx";
import { getEvents } from "./gateway/gateway.js";
import { getWeekStartDate, generateWeekRange } from "../src/utils/dateUtils.js";

import "./common.scss";

const App = () => {
  const [weekStartDate, setWeekStartDate] = useState(
    getWeekStartDate(new Date())
  );

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then((data) => {setEvents(data);
    })
  }, []);

  const addEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  return (
    <>
      <Header
        weekStartDate={weekStartDate}
        setWeekStartDate={setWeekStartDate}
        addEvent={addEvent}
        setEvents={setEvents}
      />
      <Calendar
        weekDates={weekDates}
        events={events}
        addEvent={addEvent}
        setEvents={setEvents}
      />
    </>
  );
};

export default App;
