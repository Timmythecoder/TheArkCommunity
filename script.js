import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDv6WpFw6J4qGj7q0h-8iWtIGPeImQbCBE",
    authDomain: "the-ark-community-kids-club.firebaseapp.com",
    projectId: "the-ark-community-kids-club",
    storageBucket: "the-ark-community-kids-club.firebasestorage.app",
    messagingSenderId: "26143306799",
    appId: "1:26143306799:web:fc6aa3a67bac0a78a882da"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to fetch
function loadEvents() {
    const eventsContainer = document.getElementById("events-container");
    eventsContainer.innerHTML = "<p>Loading events...</p>";

    const eventsRef = ref(database, "events");
    onValue(eventsRef, (snapshot) => {
        const events = snapshot.val();
        eventsContainer.innerHTML = ""; // Clear loading text

        if (events) {
            Object.keys(events).forEach((eventID) => {
                const event = events[eventID];

                // Format date and time
                const rawDate = new Date(`${event.date} ${event.time}`);
                const formattedDate = rawDate.toLocaleDateString("en-GB", {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                });
                const formattedTime = rawDate.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                });

// event element
                const eventElement = document.createElement("div");
                eventElement.classList.add("event-item");
                eventElement.style.marginBottom = "20px";

                eventElement.innerHTML = `
                <div class="event-block">
                    <img src="${event.image}" alt="${event.title}" class="event-photo">
                    <div>
                        <h3 class="event-title">${event.title}</h3>
                        <p class="event-description">${event.description}</p>
                        <p class="event-time">📅 ${formattedDate} ⏰ ${formattedTime}</p>
                    </div>
                </div>
            `;

                // Add click event to enlarge the photo
                eventElement.querySelector(".event-photo").addEventListener("click", () => {
                    const modal = document.getElementById("photo-modal");
                    const modalPhoto = document.getElementById("modal-photo");
                    modalPhoto.src = event.image;
                    modal.style.display = "flex";
                });

                eventsContainer.appendChild(eventElement);
            });
        } else {
            eventsContainer.innerHTML = "<p>No events found.</p>";
        }
    });
}


document.getElementById("photo-modal").addEventListener("click", (e) => {
    if (e.target.classList.contains("close-modal") || e.target.id === "photo-modal") {
        document.getElementById("photo-modal").style.display = "none";
    }
});


document.addEventListener("DOMContentLoaded", loadEvents);



   window.onload = function () {
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        mainContent.style.display = 'block';
    }, 2000);
};