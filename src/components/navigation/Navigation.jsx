import React, { useState, useEffect } from 'react';

import { getItem } from '../../utils/storage.js';
import { generateWeekRange, days } from '../../utils/dateUtils.js';
import './navigation.scss';

const Navigation = () => {
  const [weekDates, setWeekDates] = useState([]);
  const [today] = useState(new Date());

  useEffect(() => {
    const displayedWeekStart = getItem('displayedWeekStart');
    const weekDays = generateWeekRange(displayedWeekStart);
    setWeekDates(weekDays);
  }, []);

  return (
    <header className="calendar__header">
      {weekDates.map((dayDate) => {
        const isToday = dayDate.toDateString() === today.toDateString();
        const todayNameClass = isToday ? 'today-name' : '';
        const todayDayClass = isToday ? 'today-number' : '';

        return (
          <div className="calendar__day-label day-label" key={dayDate}>
            <span className={`day-label__day-name ${todayNameClass}`}>{days[dayDate.getDay()]}</span>
            <span className={`day-label__day-number ${todayDayClass}`}>{dayDate.getDate()}</span>
          </div>
        );
      })}
    </header>
  );
};

export default Navigation;

// const Navigation = ({ weekDates }) => {
//   return (
//     <header className="calendar__header">
//       {weekDates.map((dayDate) => (
//         <div className="calendar__day-label day-label">
//           <span className="day-label__day-name">{days[dayDate.getDay()]}</span>
//           <span className="day-label__day-number">{dayDate.getDate()}</span>
//         </div>
//       ))}
//     </header>
//   );
// };

// export default Navigation;
