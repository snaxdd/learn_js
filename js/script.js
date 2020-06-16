"use strict";

function isNumber(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
}

function isText(text) {
    if (text !== null && text !== "") {
        for (let i = 0; i < text.length; i++) {
            if (isNumber(text[i])) {
                return false;
            }
        }
    
        return true;
    }
    
    return false;
}

function promptValid(validType, question, defaultAnswer = "") {
    if (validType === "text") {
        let result = prompt(question, defaultAnswer);

        if (isText(result)) {
            return String(result);
        } else {
            return promptValid(validType, question, defaultAnswer);
        }
    } else if (validType === "number") {
        let result = prompt(question, defaultAnswer);

        if (isNumber(result)) {
            return Number(result);
        } else {
            return promptValid(validType, question, defaultAnswer);
        }
    }
}

function firstUppercase(str) {
    let res = "";

    for (let i = 0; i < str.length; i++) {
        if (i === 0) {
            res += str[i].toUpperCase();
        } else {
            res += str[i].toLowerCase();
        }
    }

    return res;
}

function splitString(str) {
    if (str !== null && str !== "") {
        return str.toLowerCase().split(",");
    }
}

function massiveToString(mas) {
    let res = "";

    if (mas !== "" && mas !== undefined && mas !== null ) {
        for (let i = 0; i < mas.length - 1; i++) {
            res += firstUppercase(mas[i]) + ",";
        }

        res += firstUppercase(mas[mas.length - 1]);
    }

    return res;
}

let money;

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function () {
        if (confirm("Есть ли у Вас доп. заработок?")) {
            let itemIncome = promptValid("text", "Какой доп заработок?"),
                cashIncome = promptValid("number", "Сколько в месяц Вы зарабатываете на этом?");

            appData.income[itemIncome] = cashIncome;
        }

        appData.addExpenses = splitString(prompt("Перечислите возможные расходы за рассчитываемый период через запятую",
        "Такси, кафе, интернет"));
        appData.deposit = confirm("Есть ли у вас депозит в банке?");

        for (let i = 0; i < 2; i++) {
            let expenses = promptValid("text", "Введите обязательную статью расходов"),
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
        appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
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
    },
    getInfoDeposit: function () {
        if (appData.deposit) {
            appData.percentDeposit = promptValid("number", "Какой годовой процент?", "10");
            appData.moneyDeposit = promptValid("number", "Какая сумма заложена?", "10000");
        }
    },
    calcSavedMoney: function () {
        return appData.budgetMonth * appData.period;
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

appData.getInfoDeposit();
console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());

console.log(massiveToString(appData.addExpenses));

