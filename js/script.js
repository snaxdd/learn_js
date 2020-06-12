"use strict";

function isNumber(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
}

let money;
    
let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 3,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function () {
        appData.addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую",
            "Такси, кафе, интернет");
        appData.deposit = confirm("Есть ли у вас депозит в банке?");

        for (let i = 0; i < 2; i++) {
            let expenses = prompt("Введите обязательную статью расходов"),
                amount = prompt("Во сколько это обойдется?");

            while (!isNumber(amount)) {
                amount = prompt("Во сколько это обойдется?");
            }

            appData.expenses[expenses] = Number(amount);
        }
    },
    getExpensesMonth: function () {
        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
    },
    getTargetMonth: function () {
        let res = Math.ceil(appData.mission / appData.budgetMonth);

        if (res <= 0) {
            return "Цель не будет достигнута";
        } else {
            return `Цель будет достигнута через ${res} месяцев`;
        }
    },
    getStatusIncome: function () {
        if (appData.budgetDay >= 1200) {
            return "У вас высокий уровень дохода";
        } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
            return "У вас средний уровень дохода";
        } else if (appData.budgetDay >= 0 && appData.budgetDay < 600) {
            return "К сожалению у вас уровень дохода ниже среднего";
        } else {
            return "Что-то пошло не так";
        }
    }
};

const start = function () {
    do {
        money = prompt("Ваш месячный доход?", 44500);
    } while (!isNumber(money));

    money = Number(money);
    appData.budget = money;
};

start();
appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log(`Расходы за месяц = ${appData.expensesMonth}`);
console.log(appData.getTargetMonth());
console.log(`Уровень дохода - ${appData.getStatusIncome()}`);

console.groupCollapsed("Наша программа включает в себя данные:");
for (let key in appData) {
    console.log(`${key} - ${appData[key]}`);
}
console.groupEnd();