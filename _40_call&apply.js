// декоратор - спец. функция, которая принимает другую функцию и изменяет ее поведение
function slow(x) {
    console.log(`Called with ${x}`);
    // здесь могут быть ресурсоёмкие вычисления
    return x;
}

function cachingDecorator(func) {
    let cache = new Map();
    return function(x) {
        if (cache.has(x)) {    // если кеш содержит такой x,
            return cache.get(x); // читаем из него результат
        }
        let result = func.call(this, x); // иначе, привязываем this в качестве контекста,
        // тк позже мы вызываем ее через нужный объект, передаем аргумент х и вызываем функцию.
        cache.set(x, result); // и кешируем (запоминаем) результат
        return result;
    };
}
slow = cachingDecorator(slow);

// отделяя кешируюшикой код и тд от остального кода мы сохраняем чистоту и простотy

let worker = {
    someMethod() {
        return 1;
    },
    slow(x) {
        console.log(`Called with ${x}`);
        // здесь могут быть ресурсоёмкие вычисления
        return x * this.someMethod();
    }
}
console.log(worker.slow(1));
// Контекст не передается!!! Поэтому с объектами так работать не получится.
// Декоратор передает выхов отдельному методу, но без контекста.
worker.slow = cachingDecorator(worker.slow);
console.log(worker.slow(2)); // ОШИБКА, не удается прочитать свойство someMethod.
// Ошибка исчезла, когда мы добавили метод call и передали контекст.

// -------------------------------------------------------------------
// Перенаправление вызова - передача всех аргументов с контекстом.

// let wrapper = function() { // из внешнего кода его не отличить от вызова исходной функции
//   return func.apply(this, arguments);
// };

// func.call(context, arg1, arg2, ...) - функция для привязки контекста и мгновенного вызова
// Для перебираемых объектов
function sayHi(phrase) {
    console.log(this.name, phrase);
}
let user = { name: "John" };
let admin = { name: "Admin" };
// используем 'call' для передачи различных объектов в качестве 'this'
sayHi.call( user, 'Hello' ); // John
sayHi.call( admin, 'Bye' ); // Admin

// -------------------------------------------------------------------
// func.apply(context, [arg1, arg2, ...]) - функция для привязки контекста и мгновенного вызова
// Для псевдомассива
// Вероятнее быстрее чем call, т.к. движки JS лучше оптимизируют его
let worker2 = {
    someMethod() {
        return 1;
    },
    slow(x, y) {
        console.log(`Called with ${x} | ${y}`);
        // здесь могут быть ресурсоёмкие вычисления
        return x * y * this.someMethod();
    }
}
function cachingDecorator2(func, hash) {
    let cache = new Map();
    return function() {
        let key = hash(arguments); // создаем функцию хэш, это создания одного ключа по всем (2м) аргументам
        if (cache.has(key)) {    // если кеш содержит такой x,
            return cache.get(key); // читаем из него результат
        }
        let result = func.apply(this, arguments); // иначе, привязываем this в качестве контекста,
        // тк позже мы вызываем ее через нужный объект, передаем аргумент х и вызываем функцию.
        cache.set(key, result); // и кешируем (запоминаем) результат
        return result;
    };
}
function hash(args) {
    return args[0] + ',' + args[1];
}

worker.slow = cachingDecorator2(worker2.slow, hash);
console.log(worker2.slow(3,5));
console.log(worker2.slow(3,5)); // из кеша

// ---------------------------------------------------------------
// Заимствование метода.

// function hash2() {
//     return arguments.join(); // Ошибка, т.к. agruments - псевдомассив и не имеет метода join
// }

// Мы берём (заимствуем) метод join из обычного массива [].join. И используем [].join.call,
// чтобы выполнить его в контексте arguments.
function hash2() {
    return [].join.call(arguments);
}
console.log(hash2(1,2,3,4));

// Это связано с тем, что внутренний алгоритм встроенного метода arr.join(glue) очень прост.
// Взято из спецификации практически «как есть»:
// 1) Пускай первым аргументом будет glue или, в случае отсутствия аргументов, им будет запятая ","
// 2) Пускай result будет пустой строкой "".
// 3) Добавить this[0] к result.
// 4) Добавить glue и this[1].
// 5) Добавить glue и this[2].
// 6) …выполнять до тех пор, пока this.length элементов не будет склеено.
// 7) Вернуть result.
// Таким образом, технически он принимает this и объединяет this[0], this[1]… и т.д. вместе.
// Он намеренно написан так, что допускает любой псевдомассив this (не случайно, многие методы
// следуют этой практике). Вот почему он также работает с this=arguments.

// ---------------------------------------------------------------

function work(a, b) {
    console.log(a + b);
}
function spy(func) {
    function funcWork(...args) {
        funcWork.calls.push(args);
        return func.apply(this, arguments);
    }
    funcWork.calls = []; // создаем свойство у функции
    return funcWork;
}
work(1,2)
work = spy(work);
work(1,2);
work(3,2);
console.log(work.calls);


function f(x) {
    console.log(x);
}
function delay(func, ms) {
    return function() {
        setTimeout(() => f.apply(this, arguments), ms);
    }
    // function delayFunc() {
    //     setTimeout(() => {
    //         console.log('delayed on:', ms, 'ms');
    //         return func(...arguments);
    //     }, ms);
    // }
    // return delayFunc;
}
f('Hello');
let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);
f1000('Bye');
f1500('Bye again');


function debounce(f, ms) {
    let isInProcess = false;
    return function() {
        if (isInProcess) return;
        f.apply(this, arguments)
        isInProcess = true;
        setTimeout(() => isInProcess = false, ms);
    }
}
let fdebounced = debounce(f, 1000);
fdebounced('Hi');
fdebounced('Hi2'); // игнор
setTimeout(() => fdebounced('Hi-100'), 100); // игнор
setTimeout(() => fdebounced('Hi-1100'), 1100);
setTimeout(() => fdebounced('Hi-1500'), 1500); // игнор


// отличие от дебаунс в том что последний вызов функции будет выполнен после назначенного времени тротлинга
function throttle(func, ms) {
    let isThrottled = false, savedArgs, savedThis;
    return function wrapper() {
        if (isThrottled) {
            savedArgs = arguments;
            savedThis = this;
            return;
        }
        func.apply(this, arguments);
        isThrottled = true;
        setTimeout(() => {
            isThrottled = false;
            if (savedArgs) {
                wrapper.apply(savedThis, savedArgs);
                savedArgs = savedThis = null;
            }
        }, ms);
    }
}

let f1 = throttle(f, 2000);

f1('throttle 1'); // выполнится сразу
f1('throttle 2'); // игнор
f1('throttle 3'); // игнор
f1('throttle 4'); // выполнится через 2с
