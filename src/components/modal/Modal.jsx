import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './modal.scss';
import { createEvent, deleteEvent } from '../../gateway/gateway.js';

const Modal = ({ onClose, setEvents, updateDisplayedEvents }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    console.log('handleSubmit');
    e.preventDefault();
    const newEvent = {
      title: formData.title,
      description: formData.description,
      dateFrom: new Date(formData.date + 'T' + formData.startTime).toISOString(),
      dateTo: new Date(formData.date + 'T' + formData.endTime).toISOString(),
    };
    console.log('newEvent:', newEvent);
    createEvent(newEvent)
      .then(() => {
        console.log('Event created successfully');
        updateDisplayedEvents();
        onClose();
        console.log('onClose');
      })
      .catch((error) => {
        console.error('Error creating event:', error);
      });
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button onClick={ onClose } className="create-event__close-btn">+</button>
          <form className="event-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              value={formData.title}
              onChange={handleChange}
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                value={formData.date}
                onChange={handleChange}
              />
              <input
                type="time"
                name="startTime"
                className="event-form__field"
                value={formData.startTime}
                onChange={handleChange}
              />
              <span>-</span>
              <input
                type="time"
                name="endTime"
                className="event-form__field"
                value={formData.endTime}
                onChange={handleChange}
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
            <button type="submit" className="event-form__submit-btn" onClick={handleSubmit}>
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose : PropTypes.func.isRequired,
  setEvents: PropTypes.func.isRequired
};

export default Modal;