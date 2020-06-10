"use strict";

const arr = [
    "29123",
    "3345",
    "12354",
    "442362",
    "232153",
    "131225",
    "432355"
];

const showNumbers = function (arr) {
    arr.forEach(element => {
        if (element[0] === "2" || element[0] === "4") {
            console.log(element);
        }
    });
};

showNumbers(arr);

const numberDivider = function (n) {
    let count = 0;

    for (let i = 1; i <= n; i++) {
        if (n % i === 0) {
            count++;
        }
    }

    return count;
};

const primeNumber = function (n) {
    for (let i = 1; i <= n; i++) {
        if ( numberDivider(i) === 2 ) {
            console.log(`${i} - делители этого числа 1 и ${i}`);
        }
    }
};

primeNumber(100);

