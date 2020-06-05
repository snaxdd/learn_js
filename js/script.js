let money = 65535,
    income = "Фриланс",
    addExpenses = "Интернет, Steam, Такси",
    deposit = true,
    mission = 1000000,
    period = 11,
    budgetDay = money / 30;

console.log( "Money: " + typeof money );
console.log( "Income: " + typeof income );
console.log( "Deposit: " + typeof deposit );
console.log( "Длина строки addExpenses = " + addExpenses.length + " символа" );
console.log( "Период равен " + period + " месяцев" );
console.log( "Цель заработать " + mission + " рублей" );
console.log( addExpenses.toLowerCase().split(", ") );
console.log( "Бюджет на 1 день = " + budgetDay + " рублей" );
