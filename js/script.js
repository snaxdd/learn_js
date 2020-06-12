"use strict";

const week = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота"
];

const now = new Date(),
    weekList = document.querySelector(".week_list"),
    openButton = document.querySelector("#open_week");

openButton.onclick = function () {
    weekList.innerHTML = "";

    for (let i = 0; i < week.length; i++) {
        let p = document.createElement("p");

        if (i === 0 || i === 6) {
            p.className = "out_day week_list__item";
            p.innerHTML = week[i];
            weekList.append(p);
        } else if (i === now.getDay()) {
            p.className = "current_day week_list__item";
            p.innerHTML = week[i];
            weekList.append(p);
        } else if (i === 0 && i === now.getDay() || i === 6 && now.getDay()) {
            p.className = "out_day current_day";
            p.innerHTML = week[i];
            weekList.append(p);
        } else {
            p.className = "week_list__item";
            p.innerHTML = week[i];
            weekList.append(p);
        }
    }
};