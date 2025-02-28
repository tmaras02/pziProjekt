let date1 = new Date();
let year1 = date1.getFullYear();
let month1 = date1.getMonth();
let date2 = new Date();
let year2 = date2.getFullYear();
let month2 = date2.getMonth();
const inputDatesArray = ["", ""];

const day1 = document.querySelector(".calendar-dates1");
const day2 = document.querySelector(".calendar-dates2");

const currdate1 = document.querySelector(".calendar-current-date1");
const currdate2 = document.querySelector(".calendar-current-date2");

const prenexIcons1 = document.querySelectorAll(".calendar-navigation1 i");
const prenexIcons2 = document.querySelectorAll(".calendar-navigation2 i");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Function to generate the calendar, function manipulate2 is same but for generating second calendar
// through a file functions are duplicated in a way that all functions 1 manipulate with calendar1 and
// functions 2 manipulate with calendar 2
const manipulate1 = () => {
  let dayone = new Date(year1, month1, 1).getDay();

  let lastdate = new Date(year1, month1 + 1, 0).getDate();

  let dayend = new Date(year1, month1, lastdate).getDay();

  let monthlastdate = new Date(year1, month1, 0).getDate();

  // Variable to store the generated calendar HTML
  let lit = "";

  // Loop to add the last dates of the previous month
  for (let i = dayone; i > 0; i--) {
    lit += `<li class="inactive day1">${monthlastdate - i + 1}</li>`;
  }

  // Loop to add the dates of the current month
  for (let i = 1; i <= lastdate; i++) {
    // Check if the current date is today
    let isToday =
      i === date1.getDate() &&
      month1 === new Date().getMonth() &&
      year1 === new Date().getFullYear()
        ? "active"
        : "";
    lit += `<li class="${isToday} day1">${i}</li>`;
  }

  // Loop to add the first dates of the next month
  for (let i = dayend; i < 6; i++) {
    lit += `<li class="inactive day1">${i - dayend + 1}</li>`;
  }

  // Update the text of the current date element with the formatted current month and year
  currdate1.innerText = `${months[month1]} ${year1}`;

  // update the HTML of the dates element with the generated calendar
  day1.innerHTML = lit;
};

const manipulate2 = () => {
  let dayone = new Date(year2, month2, 1).getDay();
  let lastdate = new Date(year2, month2 + 1, 0).getDate();
  let dayend = new Date(year2, month2, lastdate).getDay();
  let monthlastdate = new Date(year2, month2, 0).getDate();

  let lit = "";

  for (let i = dayone; i > 0; i--) {
    lit += `<li class="inactive day2">${monthlastdate - i + 1}</li>`;
  }

  for (let i = 1; i <= lastdate; i++) {
    let isToday =
      i === date2.getDate() &&
      month2 === new Date().getMonth() &&
      year2 === new Date().getFullYear()
        ? "active"
        : "";
    lit += `<li class="${isToday} day2">${i}</li>`;
  }

  for (let i = dayend; i < 6; i++) {
    lit += `<li class="inactive day2">${i - dayend + 1}</li>`;
  }

  currdate2.innerText = `${months[month2]} ${year2}`;

  day2.innerHTML = lit;
};

manipulate1();
manipulate2();

const wantedDate1 = document.querySelectorAll(".day1");
const wantedDate2 = document.querySelectorAll(".day2");

// main logic for changing months
prenexIcons1.forEach((icon) => {
  icon.addEventListener("click", () => {
    // check witch icon is clicked so that we know if its next or previous month
    month1 = icon.id === "calendar-prev" ? month1 - 1 : month1 + 1;

    // Check if the month is out of range
    if (month1 < 0 || month1 > 11) {
      date1 = new Date(year1, month1, new Date().getDate());

      year1 = date1.getFullYear();

      month1 = date1.getMonth();
    } else {
      date1 = new Date();
    }

    // update the calendar
    manipulate1();

    const wantedDate1 = document.querySelectorAll(".day1");

    // main event for clicking and checking date
    wantedDate1.forEach((element) => {
      element.addEventListener("click", () => {
        const monthAndYear = document.getElementById("calendar-current-date1");
        const dateContainer = document.querySelector(".calendar-dates1");

        dateContainer.childNodes.forEach( element => {
          if(element.classList == "activeInput day1"){
             element.classList.remove("activeInput");
          }
        })

        const inputDate = `${element.innerText} ${monthAndYear.innerText}`;

        // starting date is added to inputDates array which collect a inputed dates
        inputDatesArray[0] = inputDate;
        element.classList = "activeInput day2";
      });
    });
  });
});

prenexIcons2.forEach((icon) => {
  icon.addEventListener("click", () => {
    month2 = icon.id === "calendar-prev" ? month2 - 1 : month2 + 1;

    if (month2 < 0 || month2 > 11) {
      date2 = new Date(year2, month2, new Date().getDate());

      year2 = date2.getFullYear();

      month2 = date2.getMonth();
    } else {
      date2 = new Date();
    }

    manipulate2();

    const wantedDate2 = document.querySelectorAll(".day2");

    wantedDate2.forEach((element) => {
      element.addEventListener("click", () => {
        const monthAndYear = document.getElementById("calendar-current-date2");

        const inputDate = `${element.innerText} ${monthAndYear.innerText}`;
        const dateContainer = document.querySelector(".calendar-dates2");

        dateContainer.childNodes.forEach( element => {
          if(element.classList == "activeInput day2"){
             element.classList.remove("activeInput");
          }
        })

        const date0 = parseDateString(
          `${element.innerText} ${monthAndYear.innerText}`
        );

        const date3 = parseDateString(inputDatesArray[0]);

        if (date0 < date3) {
          window.alert("Second date should be larger than first!");
        } else {
          inputDatesArray[1] = inputDate;
          element.classList = "activeInput day2";
        }
      });
    });
  });
});

// same as before but this one is triggered if months is not changing
wantedDate1.forEach((element) => {
  element.addEventListener("click", () => {
    const monthAndYear = document.getElementById("calendar-current-date1");
    const dateContainer = document.querySelector(".calendar-dates1");

    dateContainer.childNodes.forEach( element => {
      if(element.classList == "activeInput day1"){
         element.classList.remove("activeInput");
      }
    })

    const inputDate = `${element.innerText} ${monthAndYear.innerText}`;

    inputDatesArray[0] = inputDate;
    element.classList = "activeInput day1";
  });
});

wantedDate2.forEach((element) => {
  element.addEventListener("click", () => {
    const monthAndYear = document.getElementById("calendar-current-date2");

    const inputDate = `${element.innerText} ${monthAndYear.innerText}`;

    const dateContainer = document.querySelector(".calendar-dates2");

    dateContainer.childNodes.forEach( element => {
      if(element.classList == "activeInput day2"){
         element.classList.remove("activeInput");
      }
    })

    const date0 = parseDateString(
      `${element.innerText} ${monthAndYear.innerText}`
    );

    const date3 = parseDateString(inputDatesArray[0]);

    if (date0 < date3) {
      window.alert("Second date should be larger than first!");
    } else {
      inputDatesArray[1] = inputDate;
      element.classList = "activeInput day2";
    }
  });
});

// function that converts a string into a Date object
function parseDateString(dateString) {
  const parts = dateString.split(/\s+/);

  const day = parseInt(parts[0], 10);

  const month = isNaN(parts[1])
    ? getMonthIndex(parts[1])
    : parseInt(parts[1], 10) - 1;

  const year = parseInt(parts[2], 10);

  return new Date(year, month, day);
}

// function for getting a month from a number
function getMonthIndex(monthName) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return months.indexOf(monthName);
}