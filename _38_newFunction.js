// let func = new Function([arg1, arg2, ...argN], body);
// Функция создается полностью на "лету" из строки.
// Динамически сформировать тело функции

// Созданная через new функция получается в качестве лексического окружения ссылку
// на глобальный объект
let sum = new Function('a', 'b', 'return a + b');
console.log(sum(1, 2));
let sayHi = new Function('alert("Hi")');
sayHi();

function getFunc2() {
    let value = "test";
    let func = function() { console.log(value); };
    return func;
}
getFunc2()(); // "test", из лексического окружения функции getFunc

function getFunc() {
    let value = "test";
    let func = new Function('console.log(value)');
    return func;
}
getFunc()(); // ошибка: value не определено
