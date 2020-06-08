"use strict";

let money = prompt( "Ваш месячный доход?", 44500 ),
    income = "Фриланс",
    addExpenses = prompt( "Перечислите возможные расходы за рассчитываемый период через запятую", 
        "Такси, кафе, интернет" ),
    deposit = confirm( "Есть ли у вас депозит в банке?" ),
    mission = 1000000,
    period = 11,
    expenses1 = prompt( "Введите обязательную статью расходов", "Steam" ),
    amount1 = prompt( "Во сколько это обойдется?", "5000" ), 
    expenses2 = prompt( "Введите обязательную статью расходов", "Автомойка" ),
    amount2 = prompt( "Во сколько это обойдется?", "3500" ),
    budgetMonth = Number(money) - (Number(amount1) + Number(amount2)),
    budgetDay = budgetMonth / 30;

console.log( "Money: " + typeof money );
console.log( "Income: " + typeof income );
console.log( "Deposit: " + typeof deposit );
console.log( "Длина строки addExpenses = " + addExpenses.length + " символа" );
console.log( "Период равен " + period + " месяцев" );
console.log( "Цель заработать " + mission + " рублей" );
console.log( addExpenses.toLowerCase().split(", ") );
console.log( "Бюджет на месяц с учетом дохода за 1 месяц и 2 обяз. расходов = " + budgetMonth );
console.log( "Цель будет достигнута через: " + ( Math.ceil(mission / budgetMonth) ) + " месяцев." );
console.log( "Бюджет на 1 день = " + Math.floor(budgetDay) + " рублей" );

if ( budgetDay >= 1200 ) {
    console.log( "У вас высокий уровень дохода" );
} else if ( budgetDay >= 600 && budgetDay < 1200 ) {
    console.log( "У вас средний уровень дохода" );
} else if ( budgetDay >= 0 && budgetDay < 600 ) {
    console.log( "К сожалению у вас уровень дохода ниже среднего" );
} else {
    console.log( "Что-то пошло не так" );
}