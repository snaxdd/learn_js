"use strict";

function getExpensesMonth(expenses1, expenses2) {
    return expenses1 + expenses2;
}

function getAccumulatedMonth (income, expenses1, expenses2) {
    return income - (expenses1 + expenses2);
}

function getTargetMonth(ourMission, ourAccumulatedMonth) {
    return Math.ceil(ourMission / ourAccumulatedMonth);
}

function getStatusIncome(ourBudgetDay) {
    if ( ourBudgetDay >= 1200 ) {
        return "У вас высокий уровень дохода";
    } else if ( ourBudgetDay >= 600 && ourBudgetDay < 1200 ) {
        return "У вас средний уровень дохода";
    } else if ( ourBudgetDay >= 0 && ourBudgetDay < 600 ) {
        return "К сожалению у вас уровень дохода ниже среднего";
    } else {
        return "Что-то пошло не так";
    }
}

const showTypeOf = function(data) {
    let result = data + " - " + typeof data;
    return result;
};

let money = Number( prompt( "Ваш месячный доход?", 44500 ) ),
    income = "Фриланс",
    addExpenses = prompt( "Перечислите возможные расходы за рассчитываемый период через запятую", 
        "Такси, кафе, интернет" ),
    deposit = confirm( "Есть ли у вас депозит в банке?" ),
    mission = 1000000,
    period = 11,
    expenses1 = prompt( "Введите обязательную статью расходов", "Steam" ),
    amount1 = Number( prompt( "Во сколько это обойдется?", "5000" ) ), 
    expenses2 = prompt( "Введите обязательную статью расходов", "Автомойка" ),
    amount2 = Number( prompt( "Во сколько это обойдется?", "3500" ) ),
    accumulatedMonth = getAccumulatedMonth(money, amount1, amount2),
    budgetDay = accumulatedMonth / 30;

console.log( showTypeOf(money) );
console.log( showTypeOf(income) );
console.log( showTypeOf(deposit) );

console.log( `Расходы за месяц = ${ getExpensesMonth(amount1, amount2) }` );
console.log( addExpenses.toLowerCase().split(", ") );
console.log( `Цель будет достигнута через ${ getTargetMonth(mission, accumulatedMonth) } месяцев` );
console.log( `Бюджет на 1 день = ${ budgetDay } руб.` );
console.log( getStatusIncome(budgetDay) );



