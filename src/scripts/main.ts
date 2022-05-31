import { swapElements } from "./util";

const [ first, second ] = document.querySelectorAll(".timetable");
const weekCount: HTMLHeadingElement = document.querySelector(".week");

// first monday
// -2 to account for weekends, because we start displaying correct timetable at weekend before that week
const START_TIME = new Date(2021, 8, 6 - 2).getTime();
const END_TIME = new Date(2022, 5, 21).getTime();
// will change this as years go on
const START_WEEK = second;
START_WEEK != first && swapElements(first, second);

const daysSince = Math.floor((Date.now() - START_TIME) / (1000 * 60 * 60 * 24));
const isFirstWeek = (daysSince - daysSince % 7) % 2 == 0;

isFirstWeek || swapElements(first, second);
// check if weekend
if([0, 1].includes(daysSince % 7)) first.getElementsByTagName("h2")[0].innerText += " (iduci tjedan)"
else first.getElementsByTagName("h2")[0].innerText += " (trenutno)"

const daysUntilEnd = Math.floor((END_TIME - Date.now()) / (1000 * 60 * 60 * 24));

const weeksSince = Math.ceil((daysSince - 1) / 7)
const totalWeeks = Math.ceil((END_TIME - START_TIME) / (1000 * 60 * 60 * 24 * 7));

const displayLeft = true;

if (daysUntilEnd === 0)
     weekCount.innerHTML += `Gotovo!`
else
    weekCount.innerText = `Tjedan ${weeksSince}/${totalWeeks}${displayLeft ? ` (${daysUntilEnd} dan${daysUntilEnd % 10 === 1 ? "" : "a"} do kraja)` : ''}`;

if(daysSince % 7 >= 2) {
    let idx = daysSince % 7 - 1; // Pon -> 1; Uto -> 2; etc.

    // first will always be the current week
    first.querySelectorAll("tr").forEach(row => row.children[idx].classList.add("highlighted"))
}

document.body.style["opacity"] = "1";
