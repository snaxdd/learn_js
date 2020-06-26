"use strict";

const DomElement = function (
    selector = "#element",
    height = "100px",
    width = "100px",
    bg = "#7EB3FF",
    fontSize = "16px",
    text = "Hello!") {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.text = text;
};

DomElement.prototype.createElement = function (parent = "body") {
    let elemClass = this.selector[0] === "#" ? "p" : "div";

    this.newElem = document.createElement(elemClass);
    this.styleString = "height: " + this.height + "; width: " + this.width + "; background: " + this.bg +
    "; font-size: " + this.fontSize + ";";

    if (this.selector[0] === ".") {
        this.newElem.setAttribute("class", this.selector.slice(1, this.selector.length));
    } else if (this.selector[0] === "#") {
        this.newElem.setAttribute("id", this.selector.slice(1, this.selector.length));
    }

    this.newElem.setAttribute("style", this.styleString);
    this.newElem.innerText = this.text;
    document.querySelector(parent).append(this.newElem);
};

DomElement.prototype.addStyle = function (style) {
    this.styleString += style;
    this.newElem.setAttribute("style", this.styleString);
};

const newElement = new DomElement(".element");
const newElement2 = new DomElement("#element", "500px", "500px", "#f9f9f9", "12px", "Bye!");

newElement2.createElement();
newElement.createElement("#element");