import React from "react";
import Hour from "../hour/Hour.jsx";
import "./day.scss";

const Day = ({
  dataDay,
  dayEvents,
  month={month},
  setEvents,
  updateDisplayedEvents,
  color,
}) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  return (
    <div className="calendar__day" data-day={dataDay}>
      {hours.map((hour) => {
        const hourEvents = dayEvents
          .filter((event) => event.dateFrom.getHours() === hour)
          .map((event) => ({
            ...event,
            id: event.id.toString(),
          }));

        return (
          <Hour
            key={dataDay + hour}
            dataHour={hour}
            hourEvents={hourEvents}
            setEvents={setEvents}
            onDelete={setEvents}
            updateDisplayedEvents={updateDisplayedEvents}
            dataDay={dataDay}
            month={month}
            color={color}
          />
        );
      })}
    </div>
  );
};

export default Day;
