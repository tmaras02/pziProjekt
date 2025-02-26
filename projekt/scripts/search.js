const searchBox = document.getElementById("search-box");
const locationFilter = document.getElementById("location-filter");

async function populateLocations() {
    const response = await fetch(
        "https://raw.githubusercontent.com/samayo/country-json/refs/heads/master/src/country-by-capital-city.json"
    );
    const data = await response.json();
    data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.city || item.country;
        option.textContent = `${item.city ? item.city + ", " : ""}${item.country}`;
        locationFilter.appendChild(option);
    });
}

function filterEvents() {
    const query = searchBox.value.toLowerCase();
    const location = locationFilter.value;
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
        const matchesQuery = card.textContent.toLowerCase().includes(query);
        const matchesLocation = location === "all" || card.textContent.includes(location);
        card.style.display = matchesQuery && matchesLocation ? "" : "none";
    });
}

searchBox.addEventListener("input", filterEvents);
locationFilter.addEventListener("change", filterEvents);

populateLocations();
