"use strict";

const daysOfTheWeekRus = "Воскресенье, Понедельник, Вторник, Среда, Четверг, Пятница, Суббота",
    daysOfTheWeekEng = "Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday";

function UsersAnswers(qeustion, defAnswer = "") {
    let lowCase = prompt(qeustion, defAnswer);

    if (lowCase === null) {
        return null;
    } else {
        return lowCase.toLowerCase();
    }
}

let lang = UsersAnswers("Укажите язык дней недели - ru/en ?", "ru"),
    namePerson = UsersAnswers("Укажите Ваше имя :", "Артем");

//Вариант с IF ELSE
console.group("Вариант с IF ELSE");
if ( lang !== null && lang === "ru" ) {
    console.log( daysOfTheWeekRus );
} else if ( lang !== null && lang === "en" ) {
    console.log( daysOfTheWeekEng );
} else {
    console.log( "Хорошего дня!" );
}
console.groupEnd();

//Вариант с SWITCH CASE
console.group("Вариант с SWITCH CASE");
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
console.groupEnd();

//Вариант с многомерным массивом
console.group("Вариант с многомерным массивом");
let mas = [
    [daysOfTheWeekRus],
    [daysOfTheWeekEng],
];

let result = ( lang === "ru" ) ? console.log( mas[0][0] ) : ( lang === "en" ) ?
    console.log( mas[1][0] ) : console.log( "Хорошего дня!" );
console.groupEnd();

//Задание с именами
console.group("Задание с именами");
let resultName = ( namePerson === "артем" || namePerson === "артём" ) ? console.log("Директор") :
    ( namePerson === "максим" ) ? console.log( "Преподаватель" ) : console.log( "Студент" );
console.groupEnd();