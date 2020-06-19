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

    if (mas !== "" && mas !== undefined && mas !== null) {
        for (let i = 0; i < mas.length - 1; i++) {
            res += firstUppercase(mas[i]) + ",";
        }

        res += firstUppercase(mas[mas.length - 1]);
    }

    return res;
}

/*Interface elemets - buttons & checkboxes*/
const calculate = document.getElementById("start"),
    incomeAddBtn = document.getElementsByTagName("button")[0],
    expensesAddBtn = document.getElementsByTagName("button")[1],
    depositCheckbox = document.querySelector("#deposit-check");

/*Interface elemets - fields collections*/
const additionalIncomeFields = document.querySelectorAll(".additional_income-item");

/*Interface elemets - fields value`s*/
const budgetMonthValue = document.getElementsByClassName("budget_month-value")[0],
    budgetDayValue = document.getElementsByClassName("budget_day-value")[0],
    expensesMonthValue = document.getElementsByClassName("expenses_month-value")[0],
    addIncomeValue = document.getElementsByClassName("additional_income-value")[0],
    addExpensesValue = document.getElementsByClassName("additional_expenses-value")[0],
    incomePeriodValue = document.getElementsByClassName("income_period-value")[0],
    targetMonthValue = document.getElementsByClassName("target_month-value")[0];

/*Interface elemets - fields*/
let salaryAmountField = document.querySelector(".salary-amount"),
    incomeTitleFiled = document.querySelector(".income-title"),
    expensesTitleField = document.querySelector(".expenses-title"),
    expensesItems = document.querySelectorAll(".expenses-items"),
    addExpensesField = document.querySelector(".additional_expenses-item"),
    targetAmountField = document.querySelector(".target-amount"),
    periodSelectRange = document.querySelector(".period-select"),
    incomeItems = document.querySelectorAll(".income-items"),
    periodAmount = document.querySelector(".period-amount");

let appData = {
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddBtn);
        expensesItems = document.querySelectorAll(".expenses-items");

        if (expensesItems.length === 3) {
            expensesAddBtn.style.display = "none";
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector(".expenses-title").value,
                cashExpenses = item.querySelector(".expenses-amount").value;

            if (itemExpenses !== "" && cashExpenses !== "") {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    addIncomeBlock: function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAddBtn);
        incomeItems = document.querySelectorAll(".income-items");

        if (incomeItems.length === 3) {
            incomeAddBtn.style.display = "none";
        }
    },
    getIncome: function() {
        incomeItems.forEach(function(item) {
            let itemIncome = item.querySelector(".income-title").value,
                cashIncome = item.querySelector(".income-amount").value;

            if (itemIncome !== "" && cashIncome !== "") {
                appData.income[itemIncome] = cashIncome;
            }
        });

        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },
    getAddExpenses: function() {
        let addExpenses = addExpensesField.value.split(",");

        addExpenses.forEach(function(item) {
            item = item.trim();

            if (item !== "") {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function() {
        additionalIncomeFields.forEach(function(item) {
            let itemValue = item.value.trim();

            if (itemValue !== "") {
                appData.addIncome.push(itemValue);
            }
        });
    },
    start: function () {
        appData.budget = salaryAmountField.value;
        appData.getExpenses();   
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getIncome();
        appData.getBudget();
        appData.showResult();
    },
    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        addExpensesValue.value = appData.addExpenses.join(", ");
        addIncomeValue.value = appData.addIncome.join(", ");
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcSavedMoney();
        periodSelectRange.addEventListener("input", function(){
            incomePeriodValue.value = appData.calcSavedMoney();
        });
    },
    getExpensesMonth: function () {
        appData.expensesMonth = 0;

        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },
    getBudget: function () {
        appData.budgetMonth = (+appData.budget + appData.incomeMonth) - +appData.expensesMonth;
        appData.budgetDay = +Math.ceil(appData.budgetMonth / 30);
    },
    getTargetMonth: function () {
        let res = Math.ceil(targetAmountField.value / appData.budgetMonth);

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
        return appData.budgetMonth * periodSelectRange.value;
    },
    periodAmountChange: function() {
        periodAmount.innerHTML = periodSelectRange.value;
    }
};

console.log(`Расходы за месяц = ${appData.expensesMonth}`);
console.log(appData.getTargetMonth());
console.log(`Уровень дохода - ${appData.getStatusIncome()}`);

console.groupCollapsed("Наша программа включает в себя данные:");
for (let key in appData) {
    if (appData[key].constructor === Object) {
        console.groupCollapsed(key + ":");
        for (let data in appData[key]) {
            console.log(`${data} - ${appData[key][data]}`);
        }
        console.groupEnd();
    } else {
        console.log(`${key}: ${appData[key]}`);
    }
}
console.groupEnd();

appData.getInfoDeposit();
console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());

//console.log(massiveToString(appData.addExpenses));

calculate.addEventListener("click", appData.start);
salaryAmountField.addEventListener("input", function() {
    if (salaryAmountField.value !== "") {
        calculate.disabled = false;
    } else {
        calculate.disabled = true;
    }
});
expensesAddBtn.addEventListener("click", appData.addExpensesBlock);
incomeAddBtn.addEventListener("click", appData.addIncomeBlock);
periodSelectRange.addEventListener("input", appData.periodAmountChange);