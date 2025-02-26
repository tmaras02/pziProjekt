// Get the calendar container element from the DOM
const calendarContainer = document.getElementById("calendar-container");

// Set initial current month and year to today's date
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Initialize selected start and end dates for range selection
let selectedStartDate = null;
let selectedEndDate = null;

// Function to create the calendar for a given year and month
function createCalendar(year, month) {
    // Set up the calendar header with month navigation and current month display
    calendarContainer.innerHTML = `
        <div class="calendar-header">
            <button id="prev-month" class="calendar-nav">&lt;</button>
            <div id="current-month">${new Date(year, month).toLocaleString("default", { month: "long" })} ${year}</div>
            <button id="next-month" class="calendar-nav">&gt;</button>
        </div>
        <div class="calendar-days">
            <div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div><div>Sun</div>
        </div>
        <div class="calendar-grid"></div>
    `;

    // Add event listeners for previous and next month buttons
    document.getElementById("prev-month").addEventListener("click", () => changeMonth(-1));
    document.getElementById("next-month").addEventListener("click", () => changeMonth(1));

    // Render the days for the given year and month
    renderDays(year, month);
}

// Function to render the days of a specific month and year
function renderDays(year, month) {
    // Get the calendar grid element from the DOM
    const grid = calendarContainer.querySelector(".calendar-grid");
    grid.innerHTML = ""; // Clear any previous content

    // Calculate the first day of the month and adjust it to start from Monday
    const firstDay = new Date(year, month, 1).getDay();
    const adjustedFirstDay = (firstDay + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Create empty cells for days before the first day of the month
    for (let i = 0; i < adjustedFirstDay; i++) {
        grid.appendChild(document.createElement("div"));
    }

    // Create cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement("div");
        dayCell.textContent = day;
        dayCell.className = "day-cell";

        // Format the current date for comparison with selected dates
        const currentDate = new Date(year, month, day).toISOString().split("T")[0];
        if (currentDate === selectedStartDate || currentDate === selectedEndDate) {
            dayCell.classList.add("selected-date");
        }

        // Add click event listener to each day cell for date selection
        dayCell.addEventListener("click", () => selectDate(year, month, day));
        grid.appendChild(dayCell);
    }
}

// Function to handle date selection
function selectDate(year, month, day) {
    const selectedDate = new Date(year, month, day).toISOString().split("T")[0];
    if (selectedDate === selectedStartDate) {
        // If the clicked date is the start date, unmark it
        selectedStartDate = null;
        selectedEndDate = null;
    } else if (selectedDate === selectedEndDate) {
        // If the clicked date is the end date, unmark it
        selectedEndDate = null;
    } else if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
        // If no start date is selected or both dates are selected, set the new start date
        selectedStartDate = selectedDate;
        selectedEndDate = null;
    } else {
        // If only the start date is selected, set the end date if the selected date is later
        if (new Date(selectedDate) >= new Date(selectedStartDate)) {
            selectedEndDate = selectedDate;
        } else {
            // Update the start date if the selected date is earlier
            selectedStartDate = selectedDate;
        }
    }
    renderDays(year, month); // Re-render days to reflect the selected dates
}

// Function to change the current month
function changeMonth(direction) {
    currentMonth += direction; // Increment or decrement the current month
    if (currentMonth < 0) {
        currentMonth = 11; // Wrap around to December if going back from January
        currentYear--; // Decrease the year
    } else if (currentMonth > 11) {
        currentMonth = 0; // Wrap around to January if going forward from December
        currentYear++; // Increase the year
    }
    createCalendar(currentYear, currentMonth); // Re-create the calendar with the new month and year
}


// Function to filter events based on selected dates
function filterEventsByDate() {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML = "";
    
    if (!selectedStartDate) {
        // If no date is selected, show all events
        events.forEach(event => renderEvent(event));
    } else {
        events.forEach(event => {
            const eventStartDate = new Date(event.startDate).toISOString().split("T")[0];
            const eventEndDate = new Date(event.endDate).toISOString().split("T")[0];
            
            if ((selectedStartDate === selectedEndDate && eventStartDate <= selectedStartDate && eventEndDate >= selectedStartDate) || 
                (eventStartDate >= selectedStartDate && eventEndDate <= selectedEndDate)) {
                renderEvent(event);
            }
        });
    }
}

document.getElementById("calendar-container").addEventListener("click", filterEventsByDate);
createCalendar(currentYear, currentMonth);
