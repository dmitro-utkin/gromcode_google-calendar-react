import React from "react";
import Hour from "../hour/Hour.jsx";
import TimeLine from "../timeLine/TimeLine.jsx";
import "./day.scss";

const Day = ({ dataDay, dayEvents, currentMonth }) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  const today = new Date();
  const isToday = today.getDate() === dataDay && today.getMonth() + 1 === currentMonth;

  return (
    <div className="calendar__day" data-day={dataDay} data-month={currentMonth}>
      {hours.map((hour) => {
        //getting all events from the day we will render
        const hourEvents = dayEvents.filter(
          (event) => event.dateFrom.getHours() === hour
        );

        return (
          <Hour key={dataDay + hour} dataHour={hour} hourEvents={hourEvents} />
        );
      })}
      {isToday && (
        <TimeLine dataDay={dataDay} month={currentMonth} />
      )}
    </div>
  );
};

export default Day;
