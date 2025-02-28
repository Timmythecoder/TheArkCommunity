
  import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
  import { getDatabase, ref, push, onValue, update, remove } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';

  const firebaseConfig = {
    apiKey: "AIzaSyDv6WpFw6J4qGj7q0h-8iWtIGPeImQbCBE",
    authDomain: "the-ark-community-kids-club.firebaseapp.com",
    projectId: "the-ark-community-kids-club",
    storageBucket: "the-ark-community-kids-club.firebasestorage.app",
    messagingSenderId: "26143306799",
    appId: "1:26143306799:web:fc6aa3a67bac0a78a882da"
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);


  const eventTableBody = document.getElementById("eventTableBody");
  const eventTitleInput = document.getElementById("eventTitle");
  const eventDateInput = document.getElementById("eventDate");
  const eventTimeInput = document.getElementById("eventTime");
  const eventDescriptionInput = document.getElementById("eventDescription");


  function addEvent() {
      const title = eventTitleInput.value.trim();
      const date = eventDateInput.value;
      const time = eventTimeInput.value;
      const description = eventDescriptionInput.value.trim();

      if (!title || !date || !time || !description) {
          alert("All fields are required.");
          return;
      }

      const eventsRef = ref(db, "events");
      push(eventsRef, {
          title,
          date,
          time,
          description
      }).then(() => {
          alert("Event added successfully.");
          clearInputs();
      }).catch((error) => {
          alert("Error adding event: " + error.message);
      });
  }


  function fetchEvents() {
      const eventsRef = ref(db, "events");
      onValue(eventsRef, (snapshot) => {
          eventTableBody.innerHTML = "";
          snapshot.forEach((childSnapshot) => {
              const eventId = childSnapshot.key;
              const eventData = childSnapshot.val();
              addEventRow(eventId, eventData);
          });
      });
  }


  function addEventRow(eventId, eventData) {
      const row = document.createElement("tr");

      row.innerHTML = `
          <td>${eventData.title}</td>
          <td>${eventData.date}</td>
          <td>${eventData.time}</td>
          <td>${eventData.description}</td>
          <td>
              <button onclick="editEvent('${eventId}')">Edit</button>
              <button onclick="deleteEvent('${eventId}')">Delete</button>
          </td>
      `;

      eventTableBody.appendChild(row);
  }

  // Edit an event
  function editEvent(eventId) {
      const title = prompt("Enter new title:");
      const date = prompt("Enter new date (YYYY-MM-DD):");
      const time = prompt("Enter new time (HH:MM):");
      const description = prompt("Enter new description:");

      if (!title || !date || !time || !description) {
          alert("All fields are required.");
          return;
      }

      const eventRef = ref(db, `events/${eventId}`);
      update(eventRef, {
          title,
          date,
          time,
          description
      }).then(() => {
          alert("Event updated successfully.");
      }).catch((error) => {
          alert("Error updating event: " + error.message);
      });
  }

  // Delete an event
  function deleteEvent(eventId) {
      if (!confirm("Are you sure you want to delete this event?")) return;

      const eventRef = ref(db, `events/${eventId}`);
      remove(eventRef).then(() => {
          alert("Event deleted successfully.");
      }).catch((error) => {
          alert("Error deleting event: " + error.message);
      });
  }


  function clearInputs() {
      eventTitleInput.value = "";
      eventDateInput.value = "";
      eventTimeInput.value = "";
      eventDescriptionInput.value = "";
  }

  // Fetch events on page load
  fetchEvents();
