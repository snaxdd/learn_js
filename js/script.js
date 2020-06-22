"use strict";

let color = document.querySelector(".wrapper span"),
    button = document.querySelector("#generate"),
    buttonAuto = document.querySelector("#generate-auto"),
    body = document.querySelector("body");

const randomNumber = function(max) {
    return Math.floor(Math.random() * max);
};

const generateRandomColor = function() {
    const red = randomNumber(256).toString(16),
        green = randomNumber(256).toString(16),
        blue = randomNumber(256).toString(16);

    return "#" + red + green + blue;    
};

button.addEventListener("click", function() {
    color.innerHTML = generateRandomColor();
    body.style = "background-color: " + generateRandomColor();
});

buttonAuto.addEventListener("click", function() {
    setInterval(function() {
        color.innerHTML = generateRandomColor();
        body.style = "background-color: " + generateRandomColor();
    }, 1000);
});