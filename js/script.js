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
                return alert("Поздравляем Вы выйграли!");
            } else {
                return userAnswer(gameResult(ourNumber)(answer));
            }
        } else if (answer === null) {
            return alert("Хорошего дня!");
        }

        userAnswer("Введите корректное значение");
    };

    userAnswer("Введите число от 1 до 100");
};

const letsPlay = confirm("Сыграем в игру \"Угадай число?\"");

if (letsPlay) {
    startAGame();
}