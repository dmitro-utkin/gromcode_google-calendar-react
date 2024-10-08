import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './modal.scss';
import { createEvent, updateEvent } from '../../gateway/gateway.js';

const Modal = ({ onClose, updateDisplayedEvents, events, isEditMode }) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    description: '',
    color: 'default-color',
  });

  useEffect(() => {
    if (events) {
      const eventStartDateTime = new Date(events.dateFrom);
      const eventEndDateTime = new Date(events.dateTo);  
      const eventDate = eventStartDateTime.toLocaleDateString('en-CA');
      const startTime = eventStartDateTime.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});
      const endTime = eventEndDateTime.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'});
  
      setFormData({
        title: events.title || '',
        date: eventDate ,
        startTime,
        endTime,
        description: events.description || '',
        color: events.color || 'default-color',
      });
    }
  }, [events]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();


    const updatedEvent = {
      title: formData.title,
      description: formData.description,
      dateFrom: new Date(formData.date + 'T' + formData.startTime),
      dateTo: new Date(formData.date + 'T' + formData.endTime),
      color: formData.color,
    };

    if (isEditMode) {
      updateEvent(events.id, updatedEvent)
        .then(() => {
          updateDisplayedEvents();
          onClose();
        })
        .catch(error => {
          console.error('Error updating event:', error);
        });
    } else {
      createEvent(updatedEvent)
        .then(() => {
          updateDisplayedEvents();
          onClose();
        })
        .catch(error => {
          console.error('Error creating event:', error);
        });
    }
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event">
          <button onClick={onClose} className="create-event__close-btn">
            +
          </button>
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
            />
            <input type="hidden" name="color" value={formData.color} />
            <button type="submit" className="event-form__submit-btn" onClick={handleSubmit}>
              {isEditMode ? 'Update' : 'Create'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};


Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  updateDisplayedEvents: PropTypes.func.isRequired,
  events: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  isEditMode: PropTypes.bool.isRequired,
};

export default Modal;
