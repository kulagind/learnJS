// JSON (JavaScript Object Notation) – это общий формат для представления значений и объектов.
// JavaScript предоставляет методы:
// JSON.stringify для преобразования объектов в JSON.
// let json = JSON.stringify(value[, replacer, space])
// - value - Значение для кодирования.
// - replacer - Массив свойств для кодирования или функция соответствия function(key, value).
// В качестве replacer мы можем использовать функцию, а не массив. Получает каждую пару
// ключ-значение, исключая массивы и вложенность и применяется рекурсивно!
// Значение this внутри replacer – это объект, который содержит текущее свойство.
// - space - Дополнительное пространство (отступы), используемое для форматирования.

// JSON.parse для преобразования JSON обратно в объект.
// let value = JSON.parse(str, [reviver]);
// str - JSON для преобразования в объект.
// reviver - Необязательная функция, которая будет вызываться для каждой пары
// (ключ, значение) и может преобразовывать значение. Восстанавливать даты и тд.
// Ревивер работает и для вложенных объектов

let student = {
    name: 'John',
    age: 30,
    isAdmin: false,
    courses: ['html', 'css', 'js'],
    wife: null
};
let json = JSON.stringify(student);
console.log(typeof json); // string
console.log(json); // объект в строке. JSON-форматированный или сериализованный объект.
// Можно отправить его по сети или сохранить куда-нибудь

// Обратите внимание, что объект в формате JSON имеет несколько важных отличий от
// объектного литерала:
// 1) Строки используют двойные кавычки. Никаких одинарных кавычек или обратных
// кавычек в JSON. Так 'John' становится "John".
// 2) Имена свойств объекта также заключаются в двойные кавычки. Это обязательно.
// Так age:30 становится "age":30.

// JSON.stringify может быть применён и к примитивам.

// JSON поддерживает следующие типы данных:
// - Объекты { ... }
// - Массивы [ ... ]
// - Примитивы:
// - строки,
// - числа,
// - логические значения true/false,
// - null.
// JSON является независимой от языка спецификацией для данных, поэтому JSON.stringify
// пропускает некоторые специфические свойства объектов JavaScript:
// - Свойства-функции (методы).
// - Символьные свойства.
// - Свойства, содержащие undefined.

// число в JSON остаётся числом
console.log( JSON.stringify(1) ) // 1

// строка в JSON по-прежнему остаётся строкой, но в двойных кавычках
console.log( JSON.stringify('test') ) // "test"

console.log( JSON.stringify(true) ); // true

console.log( JSON.stringify([1, 2, 3]) ); // [1,2,3]


let user = {
    sayHi() { // будет пропущено
        alert("Hello");
    },
    [Symbol("id")]: 123, // также будет пропущено
    something: undefined // как и это - пропущено
};

console.log( JSON.stringify(user) ); // {} (пустой объект)


let meetup2 = {
    title: "Conference",
    room: {
        number: 23,
        participants: ["john", "ann"]
    }
};
console.log( JSON.stringify(meetup2) );
/* вся структура преобразована в строку:
{
  "title":"Conference",
  "room":{"number":23,"participants":["john","ann"]},
}
*/


// !!!!!!!!!!!!!!!Важное ограничение: не должно быть циклических ссылок.
let room = {
    number: 23
};
let meetup = {
    title: "Conference",
    participants: [{name: "john"}, {name: "ann"}]
};
meetup.place = room;       // meetup ссылается на room
room.occupiedBy = meetup; // room ссылается на meetup
// JSON.stringify(meetup); // Ошибка: Преобразование цикличной структуры в JSON
console.log(JSON.stringify(meetup, ['title', 'participants', 'place', 'name', 'number'])); // Ошибка: Преобразование цикличной структуры в JSON
// Первый вызов – особенный. Ему передаётся специальный «объект-обёртка»:
// {"": meetup}. Другими словами, первая (key, value) пара имеет пустой ключ,
// а значением является целевой объект в общем. Вот почему первая строка из примера
// ниже будет ":[object Object]".
console.log(JSON.stringify(meetup, function replacer(key, value) {
    return (key === 'occupiedBy') ? undefined : value;
}));

// --------------------------------------------------------------
// JSON.stringify автоматически вызывает метод toJSON у объекта если он присутствует

let room2 = {
    number: 23,
    toJSON() { // пишем что возвращать при преобразовании к JSON (вызове toJSON)
        return this.number;
    }
};
let meetup3 = {
    title: 'conference',
    room2
};
console.log( JSON.stringify(meetup3) );

/*
  {
    "title":"Conference",
    "room": 23
  }
*/

// -----------------------------------------------------------------
// JSON.parse - декодировать строку
// let value = JSON.parse(str, [reviver]);
// str - JSON для преобразования в объект.
// reviver - Необязательная функция, которая будет вызываться для каждой пары
// (ключ, значение) и может преобразовывать значение.

// строковый массив
let numbers = "[0, 1, 2, 3]";
numbers = JSON.parse(numbers);
console.log( numbers[1] ); // 1

// распарсить строку
let user2 = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';
user2 = JSON.parse(user2);
console.log( user2.friends[1] ); // 1

// Обычный JSON настолько строг не потому, что его разработчики ленивы,
// а потому, что позволяет легко, надёжно и очень быстро реализовывать алгоритм
// кодирования и чтения.
// Типичные ошибки, при написании JSON вручную
// let json = `{
//   name: "John",                     // Ошибка: имя свойства без кавычек
//   "surname": 'Smith',               // Ошибка: одинарные кавычки в значении (должны быть двойными)
//   'isAdmin': false                  // Ошибка: одинарные кавычки в ключе (должны быть двойными)
//   "birthday": new Date(2000, 2, 3), // Ошибка: не допускается конструктор "new", только значения.
//   "friends": [0,1,2,3]                     // Здесь всё в порядке
// }`;


let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
let meetup4 = JSON.parse(str);
// console.log( meetup4.date.getDate() ); // Error! начением meetup.date является
// строка, а не Date объект. Как JSON.parse мог знать, что он должен был
// преобразовать эту строку в Date?

// Передадим функцию восстановления reviver вторым значением:
let meetup5 = JSON.parse(str, function(key, value) {
    if (key === 'date') return new Date(value);
    return value;
});
console.log(meetup5.date.getDate()); // 30
// Это работает и для вложенных объектов

// ---------------------------------------------------------
let user3 = {
    name: 'Vasiliy Ivanovich',
    age: 35
}
console.log(JSON.stringify(user3));
console.log(JSON.parse(JSON.stringify(user3)));


let room6 = {
    number: 23
};
let meetup6 = {
    title: "Совещание",
    occupiedBy: [{name: "Иванов"}, {name: "Петров"}],
    place: room6
};
room6.occupiedBy = meetup6;
meetup6.self = meetup6;

// Здесь нам также нужно проверить key =="", чтобы исключить первый вызов,
// где значение value равно meetup.
console.log(JSON.stringify(meetup6, function replacer(key, value) {
    return (key !== "" && value === meetup6) ? undefined : value;
}));
