import { swapElements } from "./util";

const [ first, second ] = document.querySelectorAll(".timetable");
const weekCount = document.querySelector(".week") as HTMLHeadingElement;

// first monday
// -2 to account for weekends, because we start displaying correct timetable at weekend before that week
const START_TIME = new Date(2022, 8, 5 - 2).getTime();
const END_TIME = new Date(2023, 4, 26).getTime();
// will change this as years go on
const START_WEEK = second;
START_WEEK != first && swapElements(first, second);

const daysSince = Math.floor((Date.now() - START_TIME) / (1000 * 60 * 60 * 24));
const isFirstWeek = (daysSince - daysSince % 7) % 2 == 0;

isFirstWeek || swapElements(first, second);
// check if weekend
if([0, 1].includes(daysSince % 7)) first.getElementsByTagName("h2")[0].innerText += " (iduci tjedan)"
else first.getElementsByTagName("h2")[0].innerText += " (trenutno)"

// +1 because END_TIME will be 00:00 at that day
const daysUntilEnd = Math.ceil((END_TIME - Date.now()) / (1000 * 60 * 60 * 24) + 1);

const weeksSince = Math.ceil((daysSince - 1) / 7)
const totalWeeks = Math.ceil((END_TIME - START_TIME) / (1000 * 60 * 60 * 24 * 7));

const displayDaysLeft = true;

const saturdayCountNow = Math.floor((Math.floor(Date.now() / (1000 * 60 * 60 * 24)) + 2) / 7);
const saturdayCountEnd = Math.floor((Math.floor(END_TIME / (1000 * 60 * 60 * 24)) + 2) / 7);

const sundayCountNow = Math.floor((Math.floor(Date.now() / (1000 * 60 * 60 * 24)) + 1) / 7);
const sundayCountEnd = Math.floor((Math.floor(END_TIME / (1000 * 60 * 60 * 24)) + 1) / 7);

const saturdays = saturdayCountEnd - saturdayCountNow;
const sundays = sundayCountEnd - sundayCountNow;

const schoolDaysUntilEnd = daysUntilEnd - sundays - saturdays;

if (daysUntilEnd <= 0)
     weekCount.innerHTML += `Gotovo!`
else
    weekCount.innerText = `Tjedan ${weeksSince}/${totalWeeks}${displayDaysLeft ? ` (${schoolDaysUntilEnd} školsk${schoolDaysUntilEnd == 1 ? "i" : schoolDaysUntilEnd <= 4 ? "a" : "ih"} dan${schoolDaysUntilEnd % 10 === 1 ? "" : "a"} do kraja)` : ''}`;

if(daysSince % 7 >= 2) {
    let idx = daysSince % 7 - 1; // Pon -> 1; Uto -> 2; etc.

    // first will always be the current week
    first.querySelectorAll("tr").forEach(row => row.children[idx].classList.add("highlighted"))
}

document.body.style["opacity"] = "1";
