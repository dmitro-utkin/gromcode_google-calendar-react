import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { days } from "../../utils/dateUtils.js";
import classnames from "classnames";
import "./navigation.scss";

const Navigation = ({ weekDates }) => {
  const [today, setToday] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setToday(new Date());
    }, 86400000);

    return () => clearInterval(timer);
  }, []);

  const getClassNames = (dayDate) => {
    const isToday = dayDate.toDateString() === today.toDateString();
    return {
      dayNameClassName: classnames("day-label__day-name", {
        "today-name": isToday,
      }),
      dayNumberClassName: classnames("day-label__day-number", {
        "today-number": isToday,
      }),
    };
  };

  return (
    <header className="calendar__header">
      {weekDates.map((dayDate) => {
        const { dayNameClassName, dayNumberClassName } = getClassNames(dayDate);

        return (
          <div key={dayDate.toISOString()} className="calendar__day-label day-label">
            <span className={dayNameClassName}>{days[dayDate.getDay()]}</span>
            <span className={dayNumberClassName}>{dayDate.getDate()}</span>
          </div>
        );
      })}
    </header>
  );
};

Navigation.propTypes = {
  weekDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
};

export default Navigation;
