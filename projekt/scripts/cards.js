// cards.js - Handles event creation, editing, and deleting

const cardsContainer = document.getElementById("cards-container");
const addEventButton = document.getElementById("add-event-button");

// Function to add a new event and open edit modal instantly
function addNewEvent() {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const newEvent = {
        title: "New Event " + (events.length + 1),
        description: "Event description",
        location: "Default Location",
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date().toISOString().split("T")[0],
        thumbnail: "path/to/default/thumbnail.jpg"
    };
    saveEvent(newEvent);
    renderEvent(newEvent);
    editEvent(newEvent.title); // Open edit modal immediately
}

if (addEventButton) {
    addEventButton.addEventListener("click", addNewEvent);
}

// Function to save an event to localStorage
function saveEvent(event) {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    events.push(event);
    localStorage.setItem("events", JSON.stringify(events));
}

// Function to load and render stored events
function loadEvents() {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    events.forEach(event => renderEvent(event));
}

// Function to render event cards dynamically
function renderEvent(event) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <img src="${event.thumbnail}" alt="${event.title} Thumbnail" class="event-thumbnail">
        <h3>${event.title}</h3>
        <p>${event.description}</p>
        <p>${event.location}</p>
        <p>${event.startDate} - ${event.endDate}</p>
        <button class="edit-event">Edit</button>
        <button class="delete-event">Delete</button>
    `;
    
    card.querySelector(".edit-event").addEventListener("click", () => editEvent(event.title));
    card.querySelector(".delete-event").addEventListener("click", () => deleteEvent(event.title));
    
    cardsContainer.appendChild(card);
}

// Function to edit an event
function editEvent(title) {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const eventIndex = events.findIndex(event => event.title === title);
    if (eventIndex === -1) return;
    
    const event = events[eventIndex];
    const editForm = document.createElement("div");
    editForm.classList.add("edit-modal");
    editForm.innerHTML = `
        <div class="modal-content">
            <h2>Edit Event</h2>
            ${createInputField("Title", "edit-title", event.title)}
            ${createTextareaField("Description", "edit-description", event.description)}
            ${createInputField("Location", "edit-location", event.location)}
            ${createDateInputField("Start Date", "edit-start-date", event.startDate)}
            ${createDateInputField("End Date", "edit-end-date", event.endDate)}
            ${createInputField("Thumbnail URL", "edit-thumbnail", event.thumbnail)}
            <p id="error-message" class="error-message">End date cannot be before start date.</p>
            <button id="save-edit">Save</button>
            <button id="cancel-edit">Cancel</button>
        </div>
    `;
    document.body.appendChild(editForm);
    
    document.getElementById("save-edit").addEventListener("click", () => {
        const newTitle = document.getElementById("edit-title").value.trim();
        const newDescription = document.getElementById("edit-description").value.trim();
        const newLocation = document.getElementById("edit-location").value.trim();
        const newStartDate = document.getElementById("edit-start-date").value;
        const newEndDate = document.getElementById("edit-end-date").value;
        const newThumbnail = document.getElementById("edit-thumbnail").value.trim();
        const errorMessage = document.getElementById("error-message");
        
        if (!newTitle || !newDescription || !newLocation || !newStartDate || !newEndDate || !newThumbnail) {
            errorMessage.textContent = "All fields must be filled out.";
            errorMessage.style.display = "block";
            return;
        }
        
        if (new Date(newEndDate) < new Date(newStartDate)) {
            errorMessage.textContent = "End date cannot be before start date.";
            errorMessage.style.display = "block";
            return;
        }
        
        events[eventIndex] = { title: newTitle, description: newDescription, location: newLocation, startDate: newStartDate, endDate: newEndDate, thumbnail: newThumbnail };
        localStorage.setItem("events", JSON.stringify(events));
        document.body.removeChild(editForm);
        reloadEvents();
    });
    
    document.getElementById("cancel-edit").addEventListener("click", () => {
        document.body.removeChild(editForm);
    });
}

// Function to delete an event
function deleteEvent(title) {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const updatedEvents = events.filter(event => event.title !== title);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    reloadEvents();
}

// Function to reload events dynamically
function reloadEvents() {
    cardsContainer.innerHTML = "";
    loadEvents();
}

// Utility functions for creating input fields
function createInputField(label, id, value) {
    return `<label>${label}<input type="text" id="${id}" value="${value}"></label>`;
}

function createTextareaField(label, id, value) {
    return `<label>${label}<textarea id="${id}">${value}</textarea></label>`;
}

function createDateInputField(label, id, value) {
    return `<label>${label}<input type="date" id="${id}" value="${value}"></label>`;
}

// Load events on page load
loadEvents();
