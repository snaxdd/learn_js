"use strict";
class DomElement {
    constructor(selector = "#element", height = "100px", width = "100px",
        bg = "#7EB3FF", fontSize = "16px", text = "Hello!") {
        this.selector = selector;
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
        this.text = text;
    }

    createElement(parent = "body") {
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
    }

    addStyle(style) {
        this.styleString += style;
        this.newElem.setAttribute("style", this.styleString);
    }

    setPosition() {
        let pos = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        };

        return (event) => {
            switch (event.key) {
                case "ArrowUp":
                    pos.top -= 10;
                    break;
                case "ArrowRight":
                    pos.left += 10;
                    break;
                case "ArrowDown":
                    pos.top += 10;
                    break;
                case "ArrowLeft":
                    pos.left -= 10;
                    break;
            }

            this.newElem.setAttribute("style", this.styleString + `position: absolute;` +
                `top: ${pos.top}px;` + `right: ${pos.right}px;` + 
                `bottom: ${pos.bottom}px;` + `left: ${pos.left}px;`);
        };
    }

}

const newElement = new DomElement("#element", "100px", "100px", "#000", "12px", "Bye!");

document.addEventListener("DOMContentLoaded", () => {
    newElement.createElement("html");
});

const move = newElement.setPosition();

document.addEventListener("keydown", (e) => {
    move(e);
});


