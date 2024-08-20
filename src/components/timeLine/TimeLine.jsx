import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './timeLine.scss';
import { getDisplayedMonth, getWeekStartDate } from '../../utils/dateUtils';

const MILLISECONDS_IN_A_MINUTE = 60000;

const TimeLine = ({ dataDay, month }) => {
  const [style, setStyle] = useState({
    top: `${new Date().getMinutes() - 2.5}px`,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStyle({ top: `${new Date().getMinutes() - 2.5}px` });
    }, MILLISECONDS_IN_A_MINUTE);

    return () => clearInterval(interval);
  }, []);

  const now = new Date();
  const currentMonth = getDisplayedMonth(getWeekStartDate(now));

  const currentDay = now.getDate();

  if (currentDay !== dataDay || currentMonth !== month) {
    return null;
  }
  return (
    <div style={style} className="time-line" data-day={dataDay} data-month={month}>
      <div className="time-line__circle"></div>
      <div className="time-line__line"></div>
    </div>
  );
};

TimeLine.propTypes = {
  dataDay: PropTypes.number.isRequired,
  month: PropTypes.string.isRequired,
};

export default TimeLine;
