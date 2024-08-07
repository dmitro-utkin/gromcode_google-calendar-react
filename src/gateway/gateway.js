const serverUrl = "https://6666ad4da2f8516ff7a45a72.mockapi.io/api/v1/events";

export const createEvent = (eventDate) =>
  fetch(serverUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(eventDate),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Internal Server Error. Can't display events`);
    }
  });

export const getEvents = () =>
  fetch(serverUrl).then((res) => {
    if (!res.ok) {
      throw new Error(`Internal Server Error. Can't display events`);
    }
    return res.json().then((events) =>
      events.map((event) => ({
        ...event,
        id: Number(event.id), // Перетворення id в число
        dateFrom: new Date(event.dateFrom),
        dateTo: new Date(event.dateTo),
      }))
    );
  });

export const updateEvent = (eventId, eventData) =>
  fetch(`${serverUrl}/${eventId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(eventData),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Internal Server Error. Can't update event`);
    }
  });

export const deleteEvent = (eventId) =>
  fetch(`${serverUrl}/${eventId}`, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Internal Server Error. Can't display events`);
    }
  });
