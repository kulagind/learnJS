let message = "hello";
message = 20; // динамическая типизация!

// -2^53 < NUMBER < 2^53 (16 цифр)
let n = 123;
n = 12.3;

alert(1 / 0); // Infinity
alert("hello" / 2); // NaN - Not a number! вычислительная ошибка
alert("1" / 2); // преобразование типа. Ответ 0.5

const bigInt = 12345678910111213141516171819202122232425n; // bigInt - число произвольной длины! нужно добавить "n". Поддерживается не всеми браузерами.

// STRING
let str = "hello";
let str2 = "hello";
let str3 = `hello`;
alert(`${str3}, World!`);

// BOOLEAN
let isGreen = true;
let isBlue = 4 > 1; // true
let isRed = false;

// NULL
let age = null; // ничего, значение неизвестно

// UNDEFINED - значение не было присвоено
let x;
alert(x); // undefined

typeof 0; // number
typeof 0; // number

typeof null == "object"; // ошибка в языке
typeof function() {} == "function"; // именно для функций

// object, symbol описаны в след уроках!
