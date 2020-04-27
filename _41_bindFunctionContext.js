// При передаче методов объекта в качестве колбэков возникает известная проблема - потеря this.

// Как только метод передается отдельно от объекта - this теряется.
let user = {
    firstName: 'Vasya',
    sayHi() {
        console.log(`Hi, ${this.firstName}`);
    },
    say(time, phrase) {
        console.log(`[${time}] ${this.firstName}: ${phrase}`);
    }
};
setTimeout(user.sayHi, 1000); // Hi, undefined. Т.к. мы передаем метод не вызывая его, и
// setTimeout вызывает его позже уже без привязки к объекту user!!!

// Метод setTimeout в браузере имеет особенность: он устанавливает this=window для вызова функции
// (в Node.js this становится объектом таймера).
// Таким образом, для this.firstName он пытается получить window.firstName

// let f = user.sayHi; // то же самое!!! поэтому this потерялся
// setTimeout(f, 1000);

// Решение 1 - сделать функцию обертку, чтоб user доставался из замыкания.
setTimeout(() => user.sayHi(), 1000); // Hi, Vasya
// Тогда наш сетТаймаут покажет "Другой пользователь!"
// user = {
//     sayHi() {
//         console.log('Другой пользователь!')
//     }
// }
// Но теперь в нашем коде появилась небольшая уязвимость!!!
// Что произойдёт, если до момента срабатывания setTimeout (ведь задержка составляет целую секунду!)
// в переменную user будет записано другое значение? Тогда вызов неожиданно будет совсем не тот!

// ---------------------------------------------------------
// Решение 2 - привязать с помощью bind

// let bound = func.bind(context, [arg1], [arg2], ...); - можно зафиксировать this и аргументы!!!

// bind - встроенный метод функций для фиксации this
// Результатом вызова func.bind(context) является особый «экзотический объект» (термин взят из
// спецификации), который вызывается как функция и прозрачно передаёт вызов в func, при этом
// устанавливая this=context.
let funcUser = user.sayHi.bind(user);
funcUser();

// Удобный метод: bindAll (_.bindAll(obj) в lodash.)
// Если у объекта много методов и мы планируем их активно передавать, то можно привязать контекст
// для них всех в цикле://
// for (let key in user) {
//   if (typeof user[key] == 'function') {
//     user[key] = user[key].bind(user);
//   }
// }

function mul(a, b) {
    return a * b;
}
// Частичное применение - мы создаём новую функцию, фиксируя некоторые из существующих параметров.
let double = mul.bind(null, 2); // фиксируем первый аргумент (a = 2). Следующие аргументы передаются как есть.
console.log(double(2)); // 4
console.log(double(3)); // 6
// Например, у нас есть функция send(from, to, text). Потом внутри объекта user мы можем захотеть
// использовать её частный вариант: sendTo(to, text), который отправляет текст от имени текущего
// пользователя.

// Чистичное применение без контекста (есть готовый вариант _.partial из библиотеки lodash).
// Создаем вспомогательную функцию partial которая фиксирует аргументы
function partial(func, ...argsBound) {
    return function(...args) {
        return func.call(this, ...argsBound, ...args);
    }
}
user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());
user.sayNowBye = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes(), 'Bye!');
user.sayNow('Лох пидр');
user.sayNowBye();

// ---------------------------------------------------------

