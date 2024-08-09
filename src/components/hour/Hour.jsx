import React from "react";
import Event from "../event/Event.jsx";
import { formatMins } from "../../utils/dateUtils.js";
import PropTypes from "prop-types";
import "./hour.scss";
import TimeLine from "../timeLine/TimeLine.jsx";

const Hour = ({
  dataHour,
  hourEvents,
  month,
  onDelete,
  dataDay,
  color,
  updateDisplayedEvents,
}) => {
  return (
    <div className="calendar__time-slot" data-time={dataHour + 1}>
      {hourEvents.map(({ id, dateFrom, dateTo, title, description, color }) => {
        const eventStart = `${dateFrom.getHours()}:${formatMins(
          dateFrom.getMinutes()
        )}`;
        const eventEnd = `${dateTo.getHours()}:${formatMins(
          dateTo.getMinutes()
        )}`;

        return (
          <Event
            key={id}
            id={id}
            height={(dateTo.getTime() - dateFrom.getTime()) / (1000 * 60)}
            marginTop={dateFrom.getMinutes()}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
            description={description}
            color={color}
            onDelete={onDelete}
            updateDisplayedEvents={updateDisplayedEvents}
          />
        );
      })}
      {dataHour === new Date().getHours() && (
        <TimeLine dataDay={dataDay} month={month} />
      )}
    </div>
  );
};

Hour.propTypes = {
  dataHour: PropTypes.number.isRequired,
  hourEvents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      dateFrom: PropTypes.instanceOf(Date).isRequired,
      dateTo: PropTypes.instanceOf(Date).isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Hour;
