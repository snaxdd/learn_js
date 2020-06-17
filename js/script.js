"use strict";

const book = document.querySelectorAll(".book"),
    books = document.querySelector(".books"),
    body = document.querySelector("body"),
    adv = document.querySelector(".adv");

book[0].insertAdjacentElement("beforebegin", book[1]);
book[0].insertAdjacentElement("afterend", book[4]);
book[4].insertAdjacentElement("afterend", book[3]);
book[3].insertAdjacentElement("afterend", book[5]);

body.setAttribute('style', 'background-image: url(/image/you-dont-know-js.jpg);');

book[4].childNodes[1].childNodes[1].innerText = "Книга 3. this и Прототипы Объектов";

adv.remove();

/*Заголовки 2 книги*/

let book2 = [];

for (let i = 0; i < book[0].childNodes[3].children.length; i++) {
    book2[i] = book[0].childNodes[3].children[i];
}

book2[1].insertAdjacentElement("afterend", book2[3]);
book2[3].insertAdjacentElement("afterend", book2[6]);
book2[6].insertAdjacentElement("afterend", book2[8]);
book2[8].insertAdjacentElement("afterend", book2[4]);
book2[9].insertAdjacentElement("afterend", book2[2]);

/*Заголовки 5 книги*/

let book5 = [];

for (let i = 0; i < book[5].childNodes[3].children.length; i++) {
    book5[i] = book[5].childNodes[3].children[i];
}

book5[1].insertAdjacentElement("afterend", book5[9]);
book5[9].insertAdjacentElement("afterend", book5[3]);
book5[3].insertAdjacentElement("afterend", book5[4]);
book5[2].insertAdjacentElement("afterend", book5[6]);
book5[6].insertAdjacentElement("afterend", book5[7]);

/*Заголовки 6 книги*/

let book6 = [];

for (let i = 0; i < book[2].childNodes[3].children.length; i++) {
    book6[i] = book[2].childNodes[3].children[i];
}

let newHead = document.createElement("li");
newHead.innerText = "Глава 8: За пределами ES6";

book6[8].after(newHead);
