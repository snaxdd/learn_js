"use strict";

let myStr = "123456789012345678901234567890123"; //35 символов. 3 пробела вконце и начале.

function stringBeautify(someString) {
    if ( typeof someString !== "string" ) {       
        return alert(`Был передан тип - ${ typeof someString }`);
    } else if ( someString.trim().length > 30 ) {
        return someString.trim().slice(0, 30) + "...";
    } else {
        return someString.trim();
    } 
}

console.log( stringBeautify(myStr) );
//123456789012345678901234567890...