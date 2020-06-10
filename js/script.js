"use strict";

function isNumber(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
}

function getAccumulatedMonth(income, sum) {
    return income - sum;
}

function getTargetMonth(ourMission, ourAccumulatedMonth) {
    let res = Math.ceil(ourMission / ourAccumulatedMonth);

    if (res <= 0) {
        return "Цель не будет достигнута";
    } else {
        return `Цель будет достигнута через ${res} месяцев`;
    }
}

function getStatusIncome(ourBudgetDay) {
    if (ourBudgetDay >= 1200) {
        return "У вас высокий уровень дохода";
    } else if (ourBudgetDay >= 600 && ourBudgetDay < 1200) {
        return "У вас средний уровень дохода";
    } else if (ourBudgetDay >= 0 && ourBudgetDay < 600) {
        return "К сожалению у вас уровень дохода ниже среднего";
    } else {
        return "Что-то пошло не так";
    }
}

const showTypeOf = function (data) {
    let result = data + " - " + typeof data;
    return result;
};

let money,
    income = "Фриланс",
    addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую",
        "Такси, кафе, интернет"),
    deposit = confirm("Есть ли у вас депозит в банке?"),
    mission = 1000000,
    period = 11,
    expenses = [];
    

let start = function () {
    do {
        money = prompt("Ваш месячный доход?", 44500);
    } while ( !isNumber(money) );

    money = Number(money);
};

start();

let getExpensesMonth = function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt("Введите обязательную статью расходов");
        let amount = prompt("Во сколько это обойдется?");

        while (!isNumber(amount)) {
            amount = prompt("Во сколько это обойдется?");
        }

        sum += Number(amount);
    }

    return sum;
};

let expensesAmount = getExpensesMonth();
let accumulatedMonth = Number( getAccumulatedMonth(money, expensesAmount) ),
    budgetDay = accumulatedMonth / 30;

console.log( showTypeOf(money) );
console.log( showTypeOf(income) );
console.log( showTypeOf(deposit) );

console.log(`Расходы за месяц = ${ expensesAmount }`);
console.log( addExpenses.toLowerCase().split(", ") );
console.log( getTargetMonth(mission, accumulatedMonth) );
console.log(`Бюджет на 1 день = ${ budgetDay } руб.`);
console.log( getStatusIncome(budgetDay) );