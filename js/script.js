"use strict";

const regButton = document.getElementById("userRegister"),
    loginButton = document.getElementById("userLogin"),
    notificationSpan = document.querySelector(".login_frame__notifications_box span"),
    userList = document.querySelector(".user_frame__list");

const nameRegEx = /^[А-ЯA-Z][а-яa-z]+(\s[А-ЯA-Z][а-яa-z]+)/;
const months = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Ноября",
    "Декабря",
];

const recordToStorage = function(data) {
    const serialObj = JSON.stringify(data);

    localStorage.setItem("userData", serialObj);
};

const readFromStorage = function() {
    const returnObj = JSON.parse(localStorage.getItem("userData"));

    if (returnObj !== null) {
        return returnObj;
    } else {
        return [];
    }
};

const userData = readFromStorage();

const userRegistration = function() {
    const obj = {
        firstName: "",
        lastName: "",
        login: "",
        pass: 0,
        regDate: ""
    };

    const nameLastName = prompt("Введите Имя и Фамилию с загл. букв");

    if (nameRegEx.test(nameLastName)) {
        obj.firstName = nameLastName.split(" ")[0];
        obj.lastName = nameLastName.split(" ")[1];
    } else {
        return userRegistration();
    }

    do {
        obj.login = prompt("Введите Login");
    } while (obj.login === null || obj.login === "");
    
    do {
        obj.pass = prompt("Введите пароль");
    } while (obj.pass === null || obj.pass === "");

    const currentDate = new Date();
    
    obj.regDate = currentDate.getDate() + " " + months[currentDate.getMonth()] + 
        " " + currentDate.getFullYear() + " г., " + currentDate.getHours() + ":" +
        currentDate.getMinutes() + ":" + currentDate.getSeconds();

    return obj;
};

const userListLoad = function(data) {
    userList.innerHTML = "";

    if (data.length !== 0) {
        data.forEach(function(item) {
            let element = document.createElement("li");
            element.innerText = "Имя: " + item.firstName + ", Фамилия: " + item.lastName +
            ", Регистрация: " + item.regDate;
            element.innerHTML += '<span class="user_frame__list__close">X</span>';

            userList.append(element);

            const remove = element.querySelector(".user_frame__list__close");

            remove.addEventListener("click", function() {
                userData.splice(userData.indexOf(item), 1);
                userListLoad(userData);
                recordToStorage(userData);
            });
        });
    }
};

const userSearch = function(data, login, pass) {
    if (data.length !== 0) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].login === login && data[i].pass === pass) {
                return data[i];
            } 
        }

        return false;
    }
};

const userAutorization = function() {
    let login,
        pass;
    
    do {
        login = prompt("Введите Login");
    } while (login === null || login === "");
    
    do {
        pass = prompt("Введите пароль");
    } while (pass === null || pass === "");

    let result = userSearch(userData, login, pass);

    if (result !== false) {
        notificationSpan.innerText = "Привет, " + result.firstName;
    } else {
        alert("Пользователь не найден");
    }
};

regButton.addEventListener("click", function() {
    userData.push(userRegistration());
    recordToStorage(userData);
    userListLoad(userData);
});

loginButton.addEventListener("click", function() {
    userAutorization();
});

userListLoad(userData);

console.log(userSearch(userData, "ramzes666", "12345"));