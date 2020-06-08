"use strict";

const daysOfTheWeekRus = "Воскресенье, Понедельник, Вторник, Среда, Четверг, Пятница, Суббота",
    daysOfTheWeekEng = "Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday";

let lang = prompt("Укажите язык дней недели - ru/en ?", "ru");

/*
if ( lang !== null && lang.toLowerCase() === "ru" ) {
    console.log( daysOfTheWeekRus );
} else if ( lang !== null && lang.toLowerCase() === "en" ) {
    console.log( daysOfTheWeekEng );
} else {
    console.log( "Хорошего дня!" );
}
*/

/* 
switch (lang) {
    case "ru": 
        console.log( daysOfTheWeekRus );
        break;
    case "en":
        console.log( daysOfTheWeekEng );
        break;
    default:
        console.log( "Хорошего дня!" );
}
*/

/*
let mas = [
    [daysOfTheWeekRus],
    [daysOfTheWeekEng],
];

let result = lang === "ru" ? console.log( mas[0][0] ) : console.log( mas[1][0] ); 
*/