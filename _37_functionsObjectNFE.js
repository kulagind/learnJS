// В JavaScript функции – это объекты.

// свойство "name". Если его нет, то пытается определить его из контекста
function sayHi() {
    console.log("Hi");
    sayHi.counter++;
}

sayHi.counter = 0;
console.log(sayHi.name); // sayHi

// length - количество аргументов функций (не считая "...");
console.log(sayHi.length); // 0

// Пользовательские свойства
sayHi();
sayHi();

// счетчик количества вызова функции
console.log(sayHi.counter);


// !!!!!!Свойство не есть переменная!!!!!!
// Свойство функции, назначенное как sayHi.counter = 0, не объявляет локальную переменную counter внутри
// неё. Другими словами, свойство counter и переменная let counter – это две независимые вещи.

// Мы можем использовать функцию как объект, хранить в ней свойства, но они никак не влияют на её
// выполнение. Переменные – это не свойства функции и наоборот. Это два параллельных мира.

function makeCounter() {
    // вместо
    // let count = 0
    function counter() {
        return counter.count++;
    }

    counter.count = 0; // Свойство count теперь хранится прямо в функции, а не в её внешнем лексическом окружении.
    // Основное отличие в том, что если значение count живёт во внешней переменной, то оно не доступно
    // для внешнего кода. Изменить его могут только вложенные функции. А если оно присвоено как
    // свойство функции, то мы можем его получить:
    return counter;
}

let counter = makeCounter();
console.log(counter()); // 0
console.log(counter.count); // 1
console.log(counter()); // 1
console.log(counter.count); // 2

// -------------------------------------
// NFE (Named Function Expression) - это термин для Function Expression, у которого есть имя.
let sayHi2 = function func(who) { // func - это внутреннее имя функции, чтоб вызывать саму себя
    if (who) {
        console.log(`Hello, ${who}`);
    } else {
        func('func - Guest');
        try {// используем func чобы снова вызвать себя независимо от имя переменной самой функции
            sayHi2('sayHi2 - Guest'); // можно и так, но функция может быть присвоена другой переменной
            // и тогда название изменится!!!
        } catch (e) {
            console.log('Error!!!')
        }
    }
};
sayHi2('Dima');
sayHi2();
let welcome = sayHi2;
sayHi2 = null;
welcome();
// func(); ошибка - недоступно вне функци

// Есть две важные особенности имени func, ради которого оно даётся:
// 1) Оно позволяет функции ссылаться на себя же.
// 2) Оно не доступно за пределами функции.


// Трюк с «внутренним» именем, описанный выше, работает только для Function Expression и не работает
// для Function Declaration. Для Function Declaration синтаксис не предусматривает возможность
// объявить дополнительное «внутреннее» имя.
//
// Зачастую, когда нам нужно надёжное «внутреннее» имя, стоит переписать Function Declaration на
// Named Function Expression.


// ----------------------------------------------------------
function makeCounter2() {
    function counter() {
        // counter.set = (value) => {  // То же самое что и объявить в makeCounter2
        //   counter.count = value;
        // };
        // counter.decrease = function() {
        //   counter.count--;
        // };
        return ++counter.count;
    }
    counter.set = (value) => {
        counter.count = value;
    };
    counter.decrease = function() {
        counter.count--;
    };
    counter.count = 0;
    return counter;
}
let counter2 = makeCounter2();
console.log(counter2()); // 1
counter2.set(5); // 5
console.log(counter2()); // 6, т.к. 1 + 5
counter2.decrease(); // 5
counter2.decrease(); // 4
console.log(counter2()); // 5, т.к. 4 + 1

function sum(a) {
    let currentSum = a; // между вызовами должна удерживать текущее значение счетчика
    // (создается лексическое окружение при каждом вызове ())
    function func(b) { // при каждом вызове func суммирует свой аргумент со значением уже посчитанной суммы
        currentSum += b;
        return func; // Не вызывает сама себя, поэтому это НЕ РЕКУРСИЯ!!! просто возвращает себя и снаружи мы вызываем
    }
    // Symbol.toPrimitive = function() {
    //    ... можно преобразовать тут
    // }
    func.toString = function() { // преобразование необходимо, чтоб при последнем возвращении функции
        // без вызова мы вернули число вместо кода функции!!!
        return currentSum;
    }
    return func; // Чтоб заработало результат должен быть функцией, которая возвращает функцию и тд
}
console.log(sum(1)(2)(3)(1)(4));
