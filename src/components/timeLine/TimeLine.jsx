// import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
// import "./timeLine.scss";

// const MILLISECONDS_IN_A_MINUTE = 60000;

// const TimeLine = ({ dataDay, month }) => {
//   const [style, setStyle] = useState({
//     transform: `translateY(${
//       new Date().getHours() * 60 + new Date().getMinutes()
//     }px)`,
//   });

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const newTop = new Date().getHours() * 60 + new Date().getMinutes();
//       setStyle({ transform: `translateY(${newTop}px)` });
//     }, MILLISECONDS_IN_A_MINUTE);

//     return () => clearInterval(interval);
//   }, []);

//   const now = new Date();
//   const currentMonth = now.getMonth() + 1;
//   const currentDay = now.getDate();

//   if (currentDay !== dataDay || currentMonth !== month) {
//     return null;
//   }

//   return (
//     <div
//       style={style}
//       className="time-line"
//       data-month={currentMonth}
//       data-day={currentDay}
//     >
//       <div className="time-line__circle"></div>
//       <div className="time-line__line"></div>
//     </div>
//   );
// };

// TimeLine.propTypes = {
//   dataDay: PropTypes.number.isRequired,
//   month: PropTypes.number.isRequired,
// };

// export default TimeLine;












import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./timeLine.scss";
import { getDisplayedMonth, getWeekStartDate } from '../../utils/dateUtils';
import moment from "moment";

const MILLISECONDS_IN_A_MINUTE = 60000;

const TimeLine = ({ dataDay, month }) => {
  const [style, setStyle] = useState({
    transform: `translateY(${
      new Date().getHours() * 60 + new Date().getMinutes()
    }px)`,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newTop = new Date().getHours() * 60 + new Date().getMinutes();
      setStyle({ transform: `translateY(${newTop}px)` });
    }, MILLISECONDS_IN_A_MINUTE);

    return () => clearInterval(interval);
  }, []);

  const now = new Date();
  const currentMonth = getDisplayedMonth(getWeekStartDate(now));
  const currentDay = now.getDate();

  const startDate = new Date(now.getFullYear(), month - 1, dataDay);
  const endDate = new Date(now.getFullYear(), month - 1, dataDay + 1);

  const displayedMonth = getDisplayedMonth(startDate);

  if (displayedMonth === getDisplayedMonth(now)) {
    if (now >= startDate && now < endDate) {
      return (
        <div
          style={style}
          className="time-line"
          data-month={currentMonth}
          data-day={currentDay}
        >
          <div className="time-line__circle"></div>
          <div className="time-line__line"></div>
        </div>
      );
    }
  }

  return null;
};

TimeLine.propTypes = {
  dataDay: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
};

export default TimeLine;
