document.addEventListener('DOMContentLoaded', (event) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    alert("You are not authorized. Please log in first.");
    return;
  }

  fetchEvents();

  async function fetchEvents() {
    try {
      const response = await fetch('https://localhost:7171/api/Events', {   
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }

      const events = await response.json();
      displayEvents(events);
    } catch (error) {
      console.error(error);
      alert('An error occurred while fetching events.');
    }
  }

  function displayEvents(events) {
    const eventsList = document.getElementById('events-list');
    eventsList.innerHTML = '';

    events.forEach((event, index) => {
      if (index % 4 === 0) {
        // Create a new row for every 4 events
        const rowElement = document.createElement('div');
        rowElement.classList.add('row');
        eventsList.appendChild(rowElement);
      }

      const eventElement = document.createElement('div');
      eventElement.classList.add('col-lg-3', 'col-md-6', 'event-item');
      eventElement.innerHTML = `
        <div class="event">
          <img src="${event.imageUrl}" class="img-fluid" alt="${event.name}">
          <div class="details">
            <h3>${event.name}</h3>
            <p>${event.description}</p>
            <a href="${event.url}" class="btn btn-primary">Learn More</a>
          </div>
        </div>
      `;

      // Append the event element to the latest row
      eventsList.lastChild.appendChild(eventElement);
    });
  }
});
