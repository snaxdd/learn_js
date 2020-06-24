"use strict";

const DomElement = function() {
    this.selector = "";
    this.height = "";
    this.width = "";
    this.bg = "";
    this.fontSize = "";
};

DomElement.prototype.createElement = function(parent) {
    this.newElem = document.createElement("div");
    this.styleString = "height: " + this.height + "; width: " + this.width + "; background: " + this.bg +
    "; font-size: " + this.fontSize + ";";

    if (this.selector[0] === ".") {
        this.newElem.setAttribute("class", this.selector.slice(1, this.selector.length));    
    } else if (this.selector[0] === "#") {
        this.newElem.setAttribute("id", this.selector.slice(1, this.selector.length));
    }

    this.newElem.setAttribute("style", this.styleString);
    document.querySelector(parent).append(this.newElem);
};

DomElement.prototype.addText = function(text, color) {
    this.newElem.innerText = text;
    this.styleString += " color: " + color + ";";
    this.newElem.setAttribute("style", this.styleString);
};

const newElement = new DomElement();

newElement.selector = "#elem";
newElement.height = "100px";
newElement.width = "300px";
newElement.bg = "#000";
newElement.fontSize = "32px";

newElement.createElement("body");
newElement.addText("Новый текст", "white");