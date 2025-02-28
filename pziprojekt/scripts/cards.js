// cards.js - Handles event creation and deleting

const cardsContainer = document.getElementById("cards-container");
const addEventButton = document.getElementById("add-event-button");

// Function to add a new event and open edit modal instantly
function addNewEvent() {
    const titleEl = document.getElementById("title");
    const descriptionEl = document.getElementById("description");
    const locationEl = document.getElementById("location");
    const urlEl = document.getElementById("url");

    const events = JSON.parse(localStorage.getItem("events")) || [];

    if(!titleEl.value
        || !descriptionEl.value
        || !locationEl.value
        || !urlEl.value
        || (inputDatesArray[0] == "")
        || (inputDatesArray[1] == "")
    ){
        alert("Insert all info about event!");
    }else{
        const newEvent = {
            title: titleEl.value,
            description: descriptionEl.value,
            location: locationEl.value,
            startDate: new Date(inputDatesArray[0]).toLocaleString().split(",")[0],
            endDate: new Date(inputDatesArray[1]).toLocaleString().split(",")[0],
            thumbnail: urlEl.value
        };

        console.log(newEvent);
        console.log(events)
        events.push(newEvent);
        localStorage.setItem("events", JSON.stringify(events));
        alert("Evenet added succesfully!");

        titleEl.value = "";
        descriptionEl.value = "";
        locationEl.value = "";
        urlEl.value = "";
    }
}

if (addEventButton) {
    addEventButton.addEventListener("click", addNewEvent);
}
