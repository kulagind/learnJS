// Стрелочные функции – это не просто «сокращение», чтобы меньше писать.
// У них есть ряд других полезных особенностей.
// У них также нет super!

// При написании JavaScript-кода часто возникают ситуации, когда нам нужно написать небольшую функцию,
// которая будет выполнена где-то ещё.
// Например:
// arr.forEach(func) – func выполняется forEach для каждого элемента массива.
// setTimeout(func) – func выполняется встроенным планировщиком.
// …и так далее.
// Это очень в духе JavaScript – создать функцию и передать её куда-нибудь.
// И в таких функциях мы обычно не хотим выходить из текущего контекста.
// Здесь как раз и полезны стрелочные функции.

// !!!!!!!!У стрелочных функций нет this и arguments!!!!!!!! его значение берется снаружи объекта
let group = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],

    showList() {
        this.students.forEach(
            student => console.log(this.title + ': ' + student) // this берется у объекта group.
            // если бы мы передали не стрелочную функцию, то this бы потерялся в теле функции внутри forEach
            // this.students.forEach(function(student) {
            //       // Error: Cannot read property 'title' of undefined
            //       alert(this.title + ': ' + student)
            // });
        );
    }
};
group.showList();

// Существует тонкая разница между стрелочной функцией => и обычной функцией, вызванной с .bind(this):
// .bind(this) создаёт «связанную версию» функции.
// Стрелка => ничего не привязывает. У функции просто нет this. При получении значения this – оно,
// как обычная переменная, берётся из внешнего лексического окружения.

// У стрелочных функции также нет переменной arguments.
// Это отлично подходит для декораторов, когда нам нужно пробросить вызов с текущими this и arguments.
function defer(f, ms) {
    return function() {
        setTimeout(() => f.apply(this, arguments), ms) // arguments берется у функции выше таймаута
    };
}
// То же самое но без стрелочной функции.
// function defer(f, ms) {
//   return function(...args) {
//     let ctx = this;
//     setTimeout(function() {
//       return f.apply(ctx, args); // Т.к. у function() - есть this и переменная arguments,
//       то нам нужно передавать их записывая в переменную ctx и получая аргументы ...args в функции
//     }, ms);
//   };
// }
function sayHi(who) {
    console.log('Hello, ' + who);
}
let sayHiDeferred = defer(sayHi, 2000);
sayHiDeferred("John"); // выводит "Hello, John" через 2 секунды
