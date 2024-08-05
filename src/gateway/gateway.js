const baseUrl = 'https://6666ad4da2f8516ff7a45a72.mockapi.io/api/v1/events';

export const createEvent = eventDate =>
  fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(eventDate)
  }).then(response => {
    if (!response.ok) {
      throw new Error(`Internal Server Error. Can't display events`);
    }
  });

export const fetchEvent = () =>
  fetch(baseUrl).then(res => {
    if (!res.ok) {
      throw new Error(`Internal Server Error. Can't display events`);
    }
    return res.json().then(events =>
      events.map(event => ({
        ...event,
        dateFrom: new Date(event.dateFrom),
        dateTo: new Date(event.dateTo)
      }))
    );
  });

export const deleteEvent = eventId =>
  fetch(`${baseUrl}/${eventId}`, {
    method: 'DELETE'
  }).then(response => {
    if (!response.ok) {
      throw new Error(`Internal Server Error. Can't display events`);
    }
  });