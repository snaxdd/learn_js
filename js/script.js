"use strict";

const generateNum = function (max) {
    function getNumber() {
        return Math.ceil(Math.random() * max);
    }

    return getNumber();
};

const isNumber = function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
};

const startAGame = function () {
    const ourNumber = generateNum(100);
    console.log(`Загаданное число = ${ourNumber}`);

    let userPoints = 10;

    function getCount() {
        let count = 10;
    
        return function() {
            return count--;
        }; 
    }

    const counter = getCount();
    let health = counter();

    const gameResult = function (secretNum) {
        return function (userNumber) {
            function compareNumbers() {
                if (userNumber > secretNum) {
                    return "Загаданное число меньше";
                } else if (userNumber < secretNum) {
                    return "Загаданное число больше";
                } else {
                    return true;
                }
            }

            return compareNumbers();
        };
    };
    
    const userAnswer = function (message) {
        const answer = prompt(message);

        if (isNumber(answer)) {
            if (gameResult(ourNumber)(answer) === true) {
                const res = confirm("Поздравляем Вы выйграли! Хотели бы сыграть еще?");

                if (res) {
                    startAGame();
                } else {
                    return alert("Хорошего дня!");
                }
            } else {
                health = counter();

                if (health === 0) {
                    const res = confirm("Попытки закончились, хотите сыграть еще ?");

                    if (res) {
                        startAGame();
                    } else {
                        return alert("Хорошего дня!");
                    }
                } else {
                    return userAnswer(`${gameResult(ourNumber)(answer)} осталось ${health} попыток`);
                }
            }
        } else if (answer === null) {
            return alert("Хорошего дня!");
        } else {
            userAnswer("Введите корректное значение");
        }  
    };

    userAnswer("Введите число от 1 до 100");
};

const letsPlay = confirm("Сыграем в игру \"Угадай число?\"");

if (letsPlay) {
    startAGame();
} else {
    alert("Хорошего дня!");
}