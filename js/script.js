"use strict";

const DomElement = function() {
    this.selector = "";
    this.height = "";
    this.width = "";
    this.bg = "";
    this.fontSize = "";
};

DomElement.prototype.createElement = function(parent) {
    const newElem = document.createElement("div");
    const styleString = "height: " + this.height + "; width: " + this.width + "; background: " + this.bg +
    "; font-size: " + this.fontSize;

    if (this.selector[0] === ".") {
        newElem.setAttribute("class", this.selector);    
    } else if (this.selector[0] === "#") {
        newElem.setAttribute("id", this.selector);
    }

    newElem.setAttribute("style", styleString);
    document.querySelector(parent).append(newElem);
};

const newElement = new DomElement();

newElement.selector = "#elem";
newElement.height = "100px";
newElement.width = "300px";
newElement.bg = "#000";
newElement.fontSize = "32px";

newElement.createElement("body");