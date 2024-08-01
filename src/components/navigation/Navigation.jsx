import React from 'react';
import PropTypes from 'prop-types';
import { days } from '../../utils/dateUtils.js';
import classnames from 'classnames';
import './navigation.scss';

const Navigation = ({ weekDates }) => {
  const today = new Date();

  return (
    <header className="calendar__header">
      {weekDates.map((dayDate) => {
        const isToday = dayDate.toDateString() === today.toDateString();
        const dayNameClassName = classnames('day-label__day-name', {
          'today-name': isToday,
        });
        const dayNumberClassName = classnames('day-label__day-number', {
          'today-number': isToday,
        });

        return (
          <div key={dayDate} className="calendar__day-label day-label">
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
