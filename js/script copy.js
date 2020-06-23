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

function rusTextValid(field) {
    let newStr = "",
        regexp = /[А-я]/,
        value = field.value;

    for (let i = 0; i < value.length; i++) {
        if (regexp.test(value[i]) || value[i] === " " || value[i] === ",") {
            newStr += value[i];
        }
    }

    return newStr;
}

function addTextValidationEvent(collection) {
    collection.forEach(function (item) {
        item.addEventListener("input", function () {
            item.value = rusTextValid(item);
        });
    });
}

function digitsValid(field) {
    let newDigits = "",
        value = field.value;

    for (let i = 0; i < value.length; i++) {
        if (isNumber(value[i])) {
            newDigits += value[i];
        }
    }

    return newDigits;
}

function addDigitstValidationEvent(collection) {
    collection.forEach(function (item) {
        item.addEventListener("input", function () {
            item.value = digitsValid(item);
        });
    });
}

function deleteAllNodeElems(parent, childClass) {
    const elems = parent.querySelectorAll(childClass);

    elems.forEach(function(item) {
        item.remove();
    });
}

/*Interface elemets - buttons & checkboxes*/
const calculate = document.getElementById("start"),
    cancel = document.getElementById("cancel"),
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
    periodAmount = document.querySelector(".period-amount"),
    namesPlaceholderFields = document.querySelectorAll("[placeholder=\"Наименование\"]"),
    digitsPlaceholderFields = document.querySelectorAll("[placeholder=\"Сумма\"]"),
    leftSideFieldsCollection = document.querySelector(".data").querySelectorAll("input[type=text]");

/*Interface elements - containers*/

const incomeBlock = document.querySelector(".income"),
    expensesBlock = document.querySelector(".expenses");

function blockLeftSideInputs(data) {
    leftSideFieldsCollection = document.querySelector(".data").querySelectorAll("input[type=text]");

    if (data) {
        leftSideFieldsCollection.forEach(function (elem) {
            elem.disabled = true;
        });
        incomeAddBtn.disabled = true;
        expensesAddBtn.disabled = true;
    } else {
        leftSideFieldsCollection.forEach(function (elem) {
            elem.disabled = false;
        });
        incomeAddBtn.disabled = false;
        expensesAddBtn.disabled = false;
    }
}

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
    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);

        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddBtn);
        expensesItems = document.querySelectorAll(".expenses-items");

        expensesItems[expensesItems.length - 1].querySelector(".expenses-title").value = "";
        expensesItems[expensesItems.length - 1].querySelector(".expenses-amount").value = "";

        if (expensesItems.length === 3) {
            expensesAddBtn.style.display = "none";
        }

        namesPlaceholderFields = document.querySelectorAll("[placeholder=\"Наименование\"]");
        addTextValidationEvent(namesPlaceholderFields);

        digitsPlaceholderFields = document.querySelectorAll("[placeholder=\"Сумма\"]");
        addDigitstValidationEvent(digitsPlaceholderFields);
    },
    getExpenses: function () {
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector(".expenses-title").value,
                cashExpenses = item.querySelector(".expenses-amount").value;

            if (itemExpenses !== "" && cashExpenses !== "") {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    addIncomeBlock: function () {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAddBtn);
        incomeItems = document.querySelectorAll(".income-items");

        incomeItems[incomeItems.length - 1].querySelector(".income-title").value = "";
        incomeItems[incomeItems.length - 1].querySelector(".income-amount").value = "";

        if (incomeItems.length === 3) {
            incomeAddBtn.style.display = "none";
        }

        namesPlaceholderFields = document.querySelectorAll("[placeholder=\"Наименование\"]");
        addTextValidationEvent(namesPlaceholderFields);

        digitsPlaceholderFields = document.querySelectorAll("[placeholder=\"Сумма\"]");
        addDigitstValidationEvent(digitsPlaceholderFields);
    },
    getIncome: function () {
        incomeItems.forEach(function (item) {
            let itemIncome = item.querySelector(".income-title").value,
                cashIncome = item.querySelector(".income-amount").value;

            if (itemIncome !== "" && cashIncome !== "") {
                appData.income[itemIncome] = cashIncome;
            }
        });

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    },
    getAddExpenses: function () {
        let addExpenses = addExpensesField.value.split(",");

        addExpenses.forEach(function (item) {
            item = item.trim();

            if (item !== "") {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function () {
        additionalIncomeFields.forEach(function (item) {
            let itemValue = item.value.trim();

            if (itemValue !== "") {
                appData.addIncome.push(itemValue);
            }
        });
    },
    start: function () {
        this.budget = salaryAmountField.value;
        this.getExpenses();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getIncome();
        this.getBudget();
        this.showResult();
        console.log(appData);
    },
    showResult: function () {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        addExpensesValue.value = this.addExpenses.join(", ");
        addIncomeValue.value = this.addIncome.join(", ");
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();
        periodSelectRange.addEventListener("input", function () {
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
        } else if (appData.budgetDathis0 && appData.budgetDay < 1200) {
            return "У вас средний уровень дохода";
        } else if (appData.budgetDay >= 0 && appData.budgetDay < 600) {
            return "К сожалению у вас уровень дохода ниже среднего";
        } else {
            return "Что-то пошло не так";
        }
    },
    calcSavedMoney: function () {
        return appData.budgetMonth * periodSelectRange.value;
    },
    periodAmountChange: function () {
        periodAmount.innerHTML = periodSelectRange.value;
    },
    reset: function () {
        const allInputs = document.querySelector(".main").querySelectorAll("input[type=text]");

        allInputs.forEach(function (item) {
            item.value = "";
        });
        
        periodSelectRange.value = 1;
        periodAmount.innerText = 1;
        depositCheckbox.checked = false;
        calculate.disabled = true;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;

        deleteAllNodeElems(incomeBlock, ".income-items");
        deleteAllNodeElems(expensesBlock, ".expenses-items");

        incomeBlock.querySelector(".income-title").after(incomeItems[0]);
        expensesBlock.querySelector(".expenses-title").after(expensesItems[0]);
        
        incomeAddBtn.style = "display: block;";
        expensesAddBtn.style = "display: block;";
    }
};

addDigitstValidationEvent(digitsPlaceholderFields);
addTextValidationEvent(namesPlaceholderFields);
calculate.addEventListener("click", function () {
    appData.start();
    blockLeftSideInputs(true);
    calculate.style = "display:none;";
    cancel.style = "display: block;";
});
cancel.addEventListener("click", function() {
    appData.reset();
    blockLeftSideInputs(false);
    calculate.style = "display: block;";
    cancel.style = "display: none;";
});
salaryAmountField.addEventListener("input", function () {
    if (salaryAmountField.value !== "") {
        calculate.disabled = false;
    } else {
        calculate.disabled = true;
    }
});

expensesAddBtn.addEventListener("click", appData.addExpensesBlock);
incomeAddBtn.addEventListener("click", appData.addIncomeBlock);
periodSelectRange.addEventListener("input", appData.periodAmountChange);



