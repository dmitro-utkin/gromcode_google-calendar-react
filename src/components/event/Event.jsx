import React, { useState } from 'react';
import { deleteEvent, getEventById, updateEvent } from '../../gateway/gateway';
import Modal from '../modal/Modal.jsx';
import PropTypes from 'prop-types';
import './event.scss';

const Event = ({
  id,
  height,
  marginTop,
  title,
  time,
  description,
  color,
  updateDisplayedEvents,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [eventColor, setEventColor] = useState(color || 'default-color');

  const eventStyle = {
    height,
    marginTop,
    backgroundColor: eventColor,
  };

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  const handleDelete = async () => {
    try {
      await deleteEvent(id);
      handleClosePopup();
      updateDisplayedEvents();
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  const handleEdit = async () => {
    try {
      const event = await getEventById(id);
      setEventData(event);
      setIsModalOpen(true);
      handleClosePopup();
    } catch (error) {
      console.error('Failed to fetch event:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEventData(null);
  };

  const toggleColorPicker = () => {
    setIsColorPickerOpen(!isColorPickerOpen);
  };

  const handleColorChange = async color => {
    try {
      const event = await getEventById(id);
      const updatedEvent = { ...event, color };
      await updateEvent(id, updatedEvent);
      setEventColor(color);
      setIsColorPickerOpen(false);
      handleClosePopup();
      updateDisplayedEvents();
    } catch (error) {
      console.error('Failed to update event color:', error);
    }
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
            <button className="popup__close-btn" onClick={handleClosePopup}>
              x
            </button>
            <div className="popup__actions">
              <div className="events-btn">
                <button className="button events-btn__edit-btn" onClick={handleEdit}>
                  <i className="fas fa-pen" />
                  Edit
                </button>
              </div>
              <div className="events-btn">
                <button className="button events-btn__color-btn" onClick={toggleColorPicker}>
                  <i className="fas fa-palette" />
                  Color
                </button>
                {isColorPickerOpen && (
                  <div className="colors">
                    <button
                      className="colors__item aqua"
                      onClick={() => handleColorChange('aqua')}
                    />
                    <button
                      className="colors__item greenyellow"
                      onClick={() => handleColorChange('greenyellow')}
                    />
                    <button
                      className="colors__item orange"
                      onClick={() => handleColorChange('orange')}
                    />
                    <button
                      className="colors__item hotpink"
                      onClick={() => handleColorChange('hotpink')}
                    />
                  </div>
                )}
              </div>
              <div className="events-btn">
                <button className="button events-btn__delete-btn" onClick={handleDelete}>
                  <i className="fas fa-trash" />
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
          events={{ ...eventData, color: eventColor }}
          isEditMode={true}
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
  color: PropTypes.string,
  updateDisplayedEvents: PropTypes.func.isRequired,
};

export default Event;
