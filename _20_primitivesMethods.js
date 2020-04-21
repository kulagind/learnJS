// string, number, boolean, symbol, null, undefined - примитивные типы. Могут хранить 1 значение.
// object - может хранить множество значений (функции - это тоже объекты). Позволяют хранить функцию
// в качестве свойства объекта.

// Для обращения к методам примитивов создаётся специальный «объект-обёртка»,
// который предоставляет нужную функциональность, а после удаляется. (так обеспечивается
// легковесность примитивов).
// Примитивы могут предоставлять методы, и в то же время оставаться «лёгкими».

let str = "Привет";
console.log( str.toUpperCase() ); // ПРИВЕТ

// Вот, что на самом деле происходит в str.toUpperCase():
// 1) Строка str – примитив. В момент обращения к его свойству, создаётся специальный объект,
// который знает значение строки и имеет такие полезные методы, как toUpperCase().
// 2) Этот метод запускается и возвращает новую строку (показывается в log).
// 3) Специальный объект удаляется, оставляя только примитив str.

let n = 1.23456;
console.log( n.toFixed(2) ); // 1.23

// ------------------------------------------------------------------

let a1 = 0; // создается примитив
console.log(typeof(a1)); // number
let a2 = new Number(0); // явно создается эта самая "объект-обертка".
// Более тяжеловесное значение. Не рекомендуется! Т.к. последствия могут быть катастрофическими:
if (a2) { // выведет true!!! Т.К. объекты всегда ИСТИНА!
    console.log(typeof(a2)); // object
}

let a3 = Number('123'); // превращает строку в число

// null и undefined - самые примитивные и не имеют "объектов-оберток"

// ------------------------------------------------------------------

let str = "Привет";
str.test = 5; // (*)
alert(str.test);

// В зависимости от того, используете ли вы строгий режим (use strict) или нет,
// результат может быть:

// 1) undefined (без strict)
// 2) Ошибка (strict mode)

// В момент обращения к свойству str создаётся «объект-обёртка».
// В строгом режиме, попытка изменения этого объекта выдаёт ошибку.
// Без строгого режима, операция продолжается, объект получает свойство test,
// но после этого он удаляется, так что на последней линии str больше не имеет свойства test.