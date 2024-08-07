import React, { useState } from "react";
import PropTypes from "prop-types";
import { deleteEvent, updateEvent } from "../../gateway/gateway";
import "./event.scss";

const Event = ({ id, height, marginTop, title, time }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const eventStyle = {
    height,
    marginTop,
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleDelete = () => {
    deleteEvent(id).then(() => {
      console.log("Event deleted successfully");
      handleClosePopup();
    }).catch((error) => {
      console.error("Failed to delete event:", error);
    });
  };

  return (
    <div>
      <div style={eventStyle} className="event" onClick={handleOpenPopup}>
        <div className="event__title">{title}</div>
        <div className="event__time">{time}</div>
      </div>
      {isPopupOpen && (
        <div className="popup">
          <div className="popup__content">
            <button className="popup__close-btn" onClick={handleClosePopup}>
              x
            </button>
            <div className="popup__actions">
              <div className="events-btn">
                <button className="button events-btn__edit-btn">
                  <i className="fas fa-pen"></i>
                  Edit
                </button>
              </div>
              <div className="events-btn">
                <button className="button events-btn__color-btn">
                  <i className="fas fa-palette"></i>
                  Color
                </button>
                <div className="colors">
                  <button className="colors__item default-color"></button>
                  <button className="colors__item green"></button>
                  <button className="colors__item orange"></button>
                  <button className="colors__item blue"></button>
                </div>
              </div>
              <div className="events-btn">
                <button className="button events-btn__delete-btn" onClick={handleDelete}>
                  <i className="fas fa-trash"></i>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Event.propTypes = {
  height: PropTypes.number.isRequired,
  marginTop: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default Event;
