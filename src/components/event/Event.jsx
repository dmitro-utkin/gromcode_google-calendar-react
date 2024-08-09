import React, { useState } from "react";
import PropTypes from "prop-types";
import { deleteEvent, updateEvent, getEventById } from "../../gateway/gateway";
import Modal from "../modal/Modal.jsx";
import "./event.scss";

const Event = ({
  id,
  height,
  marginTop,
  title,
  time,
  description,
  updateDisplayedEvents,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const eventStyle = {
    height,
    marginTop,
  };

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  const handleDelete = async () => {
    try {
      await deleteEvent(id);
      handleClosePopup();
      updateDisplayedEvents();
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  const handleEdit = () => {
    setIsModalOpen(true);
    console.log("Edit event:", id);
    handleClosePopup();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div style={eventStyle} className="event" onClick={handleOpenPopup}>
        <div className="event__title">{title}</div>
        <div className="event__time">{time}</div>
        <div className="event__description">{description}</div>
      </div>
      {isPopupOpen && (
        <div className="popup">
          <div className="popup__content">
            <button 
            className="popup__close-btn" 
            onClick={handleClosePopup}>
              x
            </button>
            <div className="popup__actions">
              <div className="events-btn">
                <button
                  className="button events-btn__edit-btn"
                  onClick={handleEdit}
                >
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
                <button
                  className="button events-btn__delete-btn"
                  onClick={handleDelete}
                >
                  <i className="fas fa-trash"></i>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && (
        <Modal
          onClose={handleCloseModal}
          updateDisplayedEvents={updateDisplayedEvents}
          events={id}
          id={id}
          title={title}
          description={description}
          time={time}
        />
      )}
    </div>
  );
};

Event.propTypes = {
  id: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  marginTop: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  updateDisplayedEvents: PropTypes.func.isRequired,
};

export default Event;
