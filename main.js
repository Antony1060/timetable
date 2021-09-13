const [ first, second ] = document.querySelectorAll(".timetable");
const weekCount = document.querySelector(".week");

// first monday
// -2 to account for weekends, because we start displaying correct timetable at weekend before that week
const START_TIME = new Date(2021, 8, 6 - 2).getTime();
// will change this as years go on
const START_WEEK = second;
START_WEEK != first && swap(first, second);

const daysSince = Math.floor((Date.now() - START_TIME) / (1000 * 60 * 60 * 24));
const isFirstWeek = (daysSince - daysSince % 7) % 2 == 0;

isFirstWeek || swap(first, second);
// check if weekend
if([0, 1].includes(daysSince % 7)) first.getElementsByTagName("h2")[0].innerText += " (iduci tjedan)"
else first.getElementsByTagName("h2")[0].innerText += " (trenutno)"

const displayLeft = false;
weekCount.innerText += ` ${Math.ceil((daysSince - 1) / 7)}/41${displayLeft ? ` (${Math.floor((new Date(2022, 5, 18).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} dan(a) do kraja)` : ''}`;

document.body.style["opacity"] = 1;

function swap(el1, el2) {
    const tempHtml = el2.innerHTML;
    el2.innerHTML = el1.innerHTML;
    el1.innerHTML = tempHtml;
}