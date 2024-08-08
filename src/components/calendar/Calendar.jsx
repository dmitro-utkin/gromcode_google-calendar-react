import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Navigation from "../navigation/Navigation.jsx";
import Week from "../week/Week.jsx";
import Sidebar from "../sidebar/Sidebar.jsx";
import "./calendar.scss";

const Calendar = ({ weekDates, events, updateDisplayedEvents }) => {

  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

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
            currentMonth={currentMonth}
            currentDay={currentDay}
            updateDisplayedEvents={updateDisplayedEvents}
          />
        </div>
      </div>
    </section>
  );
};

Calendar.propTypes = {
  weekDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
};

export default Calendar;
