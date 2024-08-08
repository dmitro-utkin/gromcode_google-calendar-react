import React, { useState } from "react";
import Modal from "../modal/Modal";
import { getDisplayedMonth, getWeekStartDate } from "../../utils/dateUtils";
import PropTypes from "prop-types";
import "./header.scss";

const Header = ({
  weekStartDate,
  setWeekStartDate,
  addEvent,
  setEvents,
  events,
  updateDisplayedEvents,
}) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const changeWeek = (days) => {
    const newWeekStartDate = new Date(weekStartDate);
    newWeekStartDate.setDate(newWeekStartDate.getDate() + days);
    setWeekStartDate(newWeekStartDate);
  };

  return (
    <header className="header">
      <button className="button create-event-btn" onClick={openModal}>
        <div className="button-image">
          <svg className="google-plus" viewBox="0 0 36 36">
            <path fill="#34A853" d="M16 16v14h4V20z"></path>
            <path fill="#4285F4" d="M30 16H20l-4 4h14z"></path>
            <path fill="#FBBC05" d="M6 16v4h10l4-4z"></path>
            <path fill="#EA4335" d="M20 16V6h-4v14z"></path>
            <path fill="none" d="M0 0h36v36H0z"></path>
          </svg>
        </div>
        Create
      </button>
      <div className="navigation">
        <button
          className="navigation__today-btn button"
          onClick={() => setWeekStartDate(getWeekStartDate(new Date()))}
        >
          Today
        </button>
        <button
          className="icon-button navigation__nav-icon"
          onClick={() => changeWeek(-7)}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          className="icon-button navigation__nav-icon"
          onClick={() => changeWeek(7)}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-month">
          {getDisplayedMonth(weekStartDate)}
        </span>
      </div>
      {showModal && (
        <Modal
          onClose={closeModal}
          addEvent={addEvent}
          events={events}
          setEvents={setEvents}
          updateDisplayedEvents={updateDisplayedEvents}
        />
      )}
    </header>
  );
};

Header.propTypes = {
  weekStartDate: PropTypes.instanceOf(Date).isRequired,
  setWeekStartDate: PropTypes.func.isRequired,
  addEvent: PropTypes.func.isRequired,
  setEvents: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
  updateDisplayedEvents: PropTypes.func.isRequired,
};

export default Header;
