import React, { useState } from 'react';
import Modal  from '../modal/Modal';
import { getDisplayedMonth, getWeekStartDate } from '../../utils/dateUtils';
import './header.scss';

const Header = ({ weekStartDate, setWeekStartDate }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);



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
        <button className="navigation__today-btn button">Today</button>
        <button className="icon-button navigation__nav-icon">
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="icon-button navigation__nav-icon">
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-month"></span>
      </div>
      {showModal && <Modal onClose={closeModal} />} 
    </header>
  );
};

export default Header;
