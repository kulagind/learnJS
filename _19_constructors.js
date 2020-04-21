// Функция-конструктор предназначены для создания множества однотипных объектов

// Когда функция вызывается как new User(...), происходит следующее://
// 1) Создаётся новый пустой объект, и он присваивается this.
// 2) Выполняется код функции. Обычно он модифицирует this, добавляет туда новые свойства.
// 3) Возвращается значение this.

// let date = new Date и new Date() - равнозначны, если вызов конструктора без аргументов.
// для лучшей читабельности кода, рекомендуется всегда ставить скобки!

function User(name) { // функция конструктор должна писаться с большой буквы (всеобщее соглашение)
// показывающее что функция является конструктором и нужно вызывать через new!

    // this = {}; неявно

    this.name = name;
    this.sayHi = function() {
        console.log("I'am", this.name);
    }

    console.log('new.target:', new.target); // можно проверить вызвана через оператор new или
    // без него. Возвращает либо тело функции, либо undefined.
    // Можно переадресовывать при вызове без new

    // return this; неявно. Пустой return так же возвращает объект this
}

let dima = new User('Dima');// вызов функции-конструктора обязательно через new!
dima.sayHi();

// -----------------------------------------------------

function Calculator() {
    this.read = function () {
        this.a = +prompt('a', 0);
        this.b = +prompt('b', 0);
    }
    this.sum = function () {
        return this.a + this.b;
    }
    this.mul = function () {
        return this.a * this.b;
    }
}
let calculator = new Calculator();
calculator.read();
console.log(calculator.sum());
console.log(calculator.mul());

function Accumulator(number) {
    this.value = number;
    this.read = function () {
        let value = +prompt('Insert a number', 0);
        this.value += value;
    }
}
let accumulator = new Accumulator(2);
accumulator.read();
accumulator.read();
console.log(accumulator.value);
