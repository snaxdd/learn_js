let num = 266219,
    result = 1;

for (let i = 0; i < String(num).length; i++) {
    result *= String(num)[i];
}

console.log( "Произведение чисел = " + result );

document.querySelector('.result').innerHTML = String(result ** 3)[0] +
    String(result ** 3)[1];

// Первые 2 цифры полученного числа = 21

