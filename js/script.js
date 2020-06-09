"use strict";

let myStr = "   Lorem ipsum dolor sit amet, consect   "; //35 символов. 3 пробела вконце и начале.

function stringBeautify(someString) {
    if ( typeof someString !== "string" ) {       
        return alert(`Был передан тип - ${ typeof someString }`);
    } else if ( someString.trim().length > 30 ) {
        return someString.trim().slice(0, 29) + "...";
    } else {
        return someString.trim();
    } 
}

console.log( stringBeautify(myStr) );
//Lorem ipsum dolor sit amet, c...