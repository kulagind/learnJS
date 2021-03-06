// let и const ведут себя одинаково по отношению к лексическому окружению, области видимости!

// Но var – это совершенно другой зверь, берущий своё начало с давних времён. Обычно var не используется
// в современных скриптах, но всё ещё может скрываться в старых.

// Для var не существует блочной области видимости.
// Область видимости переменных var ограничивается либо функцией, либо, если переменная глобальная,
// то скриптом. Такие переменные доступны за пределами блока:
if (true) {
    var test = true; // используем var вместо let}
}
console.log(test); // true, переменная существует вне блока if

for (var i = 0; i < 10; i++) {
    // ...
}
console.log(i); // 10

// !!!var всплывает хойстится (hoisting)!!! Можно использовать ДО объявления в коде.
// Даже внутри блока IF который никогда не выполнится переменная объявляется и всплывает.
function sayHi() {
    phrase = 'Hello'; // переменная уже объявлена и сейчас только присваивается
    if (false) {
        var phrase;
    }
    console.log(phrase);
}
sayHi();

// Объявления переменных «всплывают», но присваивания значений – нет.
