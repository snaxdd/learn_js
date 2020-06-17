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

const months = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Ноября',
    'Декабря',
];

const dateA = document.querySelector("#date-a"),
    dateAInterval = document.querySelector("#date-a-interval"),
    dateB = document.querySelector("#date-b");

let newDate = new Date();

function timeDeclensions(type, time) {
    if (type === "hours") {
        if (time > 5 && time < 20) {
            return "часов";
        } else if ((time % 10) === 2 || (time % 10) === 3 || (time % 10) === 4) {
            return "часа";
        } else if ((time % 10) === 1 && time !== 11) {
            return "час";
        } else {
            return "часов";
        }
    } else if (type === "minutes") {
        if (time > 5 && time < 20) {
            return "минут";
        } else if ((time % 10) === 2 || (time % 10) === 3 || (time % 10) === 4) {
            return "минуты";
        } else if ((time % 10) === 1 && time !== 11) {
            return "минута";
        } else {
            return "минут";
        }
    } else if (type === "seconds") {
        if (time > 5 && time < 20) {
            return "секунд";
        } else if ((time % 10) === 2 || (time % 10) === 3 || (time % 10) === 4) {
            return "секунды";
        } else if ((time % 10) === 1 && time !== 11) {
            return "секунда";
        } else {
            return "секунд";
        }
    }
}

function getDateStr() {
    let result = "Сегодня " + week[newDate.getDay()] + " " + newDate.getUTCDate() + " " +
        months[newDate.getMonth()] + " " + newDate.getFullYear() + " года, " +
        newDate.getHours() + " " + timeDeclensions("hours", newDate.getHours()) + " " +
        newDate.getMinutes() + " " + timeDeclensions("minutes", newDate.getMinutes()) + " " +
        newDate.getSeconds() + " " + timeDeclensions("seconds", newDate.getSeconds());

    return result;
}

dateA.innerHTML = getDateStr();

function addZeroToNum(num) {
    if (String(num).length === 1) {
        return "0" + num;
    } else {
        return num;
    }
}

function getDateWithZero() {
    let result = addZeroToNum(newDate.getUTCDate()) + "." + addZeroToNum(newDate.getMonth() + 1) +
        "." + newDate.getUTCFullYear() + " - " + addZeroToNum(newDate.getHours()) + ":" +
        addZeroToNum(newDate.getMinutes()) + ":" + addZeroToNum(newDate.getSeconds());

    return result;
}

function timeUpdate() {
    newDate = new Date();
    dateAInterval.innerHTML = getDateStr();
    dateB.innerHTML = getDateWithZero();
}

setInterval(timeUpdate, 1000);