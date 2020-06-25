"use strict";

const calculate = document.getElementById("start"),
    cancel = document.getElementById("cancel"),
    incomeAddBtn = document.getElementsByTagName("button")[0],
    expensesAddBtn = document.getElementsByTagName("button")[1],
    depositCheckbox = document.querySelector("#deposit-check"),
    additionalIncomeFields = document.querySelectorAll(".additional_income-item"),
    budgetMonthValue = document.getElementsByClassName("budget_month-value")[0],
    budgetDayValue = document.getElementsByClassName("budget_day-value")[0],
    expensesMonthValue = document.getElementsByClassName("expenses_month-value")[0],
    addIncomeValue = document.getElementsByClassName("additional_income-value")[0],
    addExpensesValue = document.getElementsByClassName("additional_expenses-value")[0],
    incomePeriodValue = document.getElementsByClassName("income_period-value")[0],
    targetMonthValue = document.getElementsByClassName("target_month-value")[0],
    incomeBlock = document.querySelector(".income"),
    expensesBlock = document.querySelector(".expenses");

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

class AppData {
    constructor() {
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
    }

    addExpensesBlock() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);

        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAddBtn);
        expensesItems = document.querySelectorAll(".expenses-items");

        expensesItems[expensesItems.length - 1].querySelector(".expenses-title").value = "";
        expensesItems[expensesItems.length - 1].querySelector(".expenses-amount").value = "";

        if (expensesItems.length === 3) {
            expensesAddBtn.setAttribute("style", "display: none;");
        }

        namesPlaceholderFields = document.querySelectorAll("[placeholder=\"Наименование\"]");
        this.addTextValidationEvent(namesPlaceholderFields);

        digitsPlaceholderFields = document.querySelectorAll("[placeholder=\"Сумма\"]");
        this.addDigitstValidationEvent(digitsPlaceholderFields);
    }

    getExpenses() {
        expensesItems.forEach((item) => {
            let itemExpenses = item.querySelector(".expenses-title").value,
                cashExpenses = item.querySelector(".expenses-amount").value;

            if (itemExpenses !== "" && cashExpenses !== "") {
                this.expenses[itemExpenses] = cashExpenses;
            }
        });
    }

    addIncomeBlock() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAddBtn);
        incomeItems = document.querySelectorAll(".income-items");
    
        incomeItems[incomeItems.length - 1].querySelector(".income-title").value = "";
        incomeItems[incomeItems.length - 1].querySelector(".income-amount").value = "";
    
        if (incomeItems.length === 3) {
            incomeAddBtn.setAttribute("style", "display: none;");
        }
    
        namesPlaceholderFields = document.querySelectorAll("[placeholder=\"Наименование\"]");
        this.addTextValidationEvent(namesPlaceholderFields);
    
        digitsPlaceholderFields = document.querySelectorAll("[placeholder=\"Сумма\"]");
        this.addDigitstValidationEvent(digitsPlaceholderFields);
    }

    getIncome() {
        incomeItems.forEach((item) => {
            let itemIncome = item.querySelector(".income-title").value,
                cashIncome = item.querySelector(".income-amount").value;
    
            if (itemIncome !== "" && cashIncome !== "") {
                this.income[itemIncome] = cashIncome;
            }
        });
    
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }

    getAddExpenses() {
        let addExpenses = addExpensesField.value.split(",");
    
        addExpenses.forEach((item) => {
            item = item.trim();
    
            if (item !== "") {
                this.addExpenses.push(item);
            }
        });
    }

    getAddIncome() {
        additionalIncomeFields.forEach((item) => {
            let itemValue = item.value.trim();
    
            if (itemValue !== "") {
                this.addIncome.push(itemValue);
            }
        });
    }

    start() {
        this.budget = salaryAmountField.value;
        this.getExpenses();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getIncome();
        this.getBudget();
        this.showResult();
    }

    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        addExpensesValue.value = this.addExpenses.join(", ");
        addIncomeValue.value = this.addIncome.join(", ");
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcSavedMoney();
        periodSelectRange.addEventListener("input", () => {
            incomePeriodValue.value = this.calcSavedMoney();
        });
    }

    getExpensesMonth() {
        this.expensesMonth = 0;
    
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    }

    getBudget() {
        this.budgetMonth = (+this.budget + this.incomeMonth) - +this.expensesMonth;
        this.budgetDay = +Math.ceil(this.budgetMonth / 30);
    }

    getTargetMonth() {
        let res = Math.ceil(targetAmountField.value / this.budgetMonth);
    
        if (res <= 0) {
            return "Цель не будет достигнута";
        } else {
            return `Цель будет достигнута через ${res} месяцев`;
        }
    }

    getStatusIncome() {
        if (this.budgetDay >= 1200) {
            return "У вас высокий уровень дохода";
        } else if (this.budgetDathis0 && this.budgetDay < 1200) {
            return "У вас средний уровень дохода";
        } else if (this.budgetDay >= 0 && this.budgetDay < 600) {
            return "К сожалению у вас уровень дохода ниже среднего";
        } else {
            return "Что-то пошло не так";
        }
    }

    calcSavedMoney() {
        return this.budgetMonth * periodSelectRange.value;
    }

    periodAmountChange() {
        periodAmount.innerHTML = periodSelectRange.value;
    }

    reset() {
        const allInputs = document.querySelector(".main").querySelectorAll("input[type=text]");
    
        allInputs.forEach(function (item) {
            item.value = "";
        });
    
        periodSelectRange.value = 1;
        periodAmount.innerText = 1;
        depositCheckbox.checked = false;
        calculate.disabled = true;
    
        const appDataClean = new AppData();
        const appDataProp = Object.assign({}, appDataClean);
    
        for (let key in appDataProp) {
            this[key] = appDataProp[key];
        }
    
        this.deleteAllNodeElems(incomeBlock, ".income-items");
        this.deleteAllNodeElems(expensesBlock, ".expenses-items");
    
        incomeBlock.querySelector(".income-title").after(incomeItems[0]);
        expensesBlock.querySelector(".expenses-title").after(expensesItems[0]);
    
        incomeAddBtn.setAttribute("style", "display: block;");
        expensesAddBtn.setAttribute("style", "display: block;");
    }

    addEventListeners() {
        this.addDigitstValidationEvent(digitsPlaceholderFields);
        this.addTextValidationEvent(namesPlaceholderFields);
    
        calculate.addEventListener("click", () => {
            this.start();
            this.blockLeftSideInputs(true);
            calculate.setAttribute("style", "display: none;");
            cancel.setAttribute("style", "display: block;");
        });
    
        cancel.addEventListener("click", () => {
            this.reset();
            this.blockLeftSideInputs(false);
            calculate.setAttribute("style", "display: block;");
            cancel.setAttribute("style", "display: none;");
        });
    
        salaryAmountField.addEventListener("input", function () {
            if (salaryAmountField.value !== "") {
                calculate.disabled = false;
            } else {
                calculate.disabled = true;
            }
        });
    
        expensesAddBtn.addEventListener("click", () => {
            this.addExpensesBlock();
        });
        incomeAddBtn.addEventListener("click", () => {
            this.addIncomeBlock();
        });
        periodSelectRange.addEventListener("input", () => {
            this.periodAmountChange();
        });
    }

    isNumber(num) {
        return !isNaN(parseFloat(num)) && isFinite(num);
    }

    rusTextValid(string) {
        let newStr = "",
            regexp = /[А-я]/,
            value = string.value;
    
        for (let i = 0; i < value.length; i++) {
            if (regexp.test(value[i]) || value[i] === " " || value[i] === ",") {
                newStr += value[i];
            }
        }
    
        return newStr;
    }

    addTextValidationEvent(collection) {
        collection.forEach((item) => {
            item.addEventListener("input", () => {
                item.value = this.rusTextValid(item);
            });
        });
    }

    digitsValid(digit) {
        let newDigits = "",
            value = digit.value;
    
        for (let i = 0; i < value.length; i++) {
            if (this.isNumber(value[i])) {
                newDigits += value[i];
            }
        }
    
        return newDigits;
    }

    addDigitstValidationEvent(collection) {
        collection.forEach((item) => {
            item.addEventListener("input", () => {
                item.value = this.digitsValid(item);
            });
        });
    }

    deleteAllNodeElems(parent, childClass) {
        const elems = parent.querySelectorAll(childClass);
    
        elems.forEach(function (item) {
            item.remove();
        });
    }

    blockLeftSideInputs(data) {
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
}

const appData = new AppData();
appData.addEventListeners();










