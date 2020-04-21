// Ключами могут быть только строки и символы
// через конструктор объекта
let user = new Object({
    name: 'John',
    "is likes birds": true // если в ключе несколько слов,
    // записывается через кавычки и обращаться к ним только через []
});

console.log(user["is likes birds"]);
// user.is likes birds - ошибка при обращении

// через литерал объекта
let user2 = {
    a: 1,
    b: 2
};

console.log(user2.a);
// ===
let key = 'a';
console.log(user2[key]); // можно обращаться по динамическому ключу
delete user2.b;

// создание динамического ключа
let fruit = prompt('какой фрукт купить?', 'apple');
let user3 = {
    [fruit]: 5
}
// === То же самое!
let user4 = {};
user4[fruit] = 5;

let name = 'Dima';
let age = 25;
let user5 = {
    name, // name: name
    age // age: age
}

// зарезервированные имена для объектов разрешены
// особое свойство __proto__ - всегда должно быть объектом
let obj = {
    0: 'test', // 0 приводится к строке
    for: 1,
    let: 2,
    return: 3
}
console.log(obj.for + obj.let + obj.return);
// obj['0'] равен вызову obj[0]
// -------------------------------------------------------

// ОПЕРАТОР IN для проверки наличия свойства объекта
let user6 = {name: 'Dima', test: undefined};
console.log(user6.noSuchProperty); // undefined
console.log(user6.noSuchProperty === undefined); // true, не понятно свойство
// отсутствует или его значение undefined
console.log('noSuchProperty' in user6); // false, свойства нет!
console.log('name' in user6); // true

// ВАЖНО
console.log(user6.test === undefined); // true, не понятно свойство отсутствует
// или его значение undefined
console.log('test' in user6); // true, свойство есть!

// ЦИКЛ for...in
for (let key in user6) {
    console.log('for...in key:', key, '| for...in value:', user6[key]);
}
// -------------------------------------------------------

// ВАЖНО!!!!
// целочисленные ключи при переборке объекта идут в порядке возрастания!!!
// остальные ключи в порядке добавления
let countries = {
    '+2': 'Number, but it will be after other numbers',
    someKey: 1,
    '26': 'Germany',
    49: 'Russia',
    undefinedKey: undefined,
    100: 'UK',
    name: 'Somebodys name',
    '+99': 'Number, but it will be after other numbers',
    1: 'USA',
}
for (let key in countries) {
    console.log(key); // 1, 26, 49, 100, +2, someKey, undefinedKey, name, +99 - строки
    console.log(+key); // 1, 26, 49, 100, 2, NaN, NaN, NaN, 99 - числа
}
// -------------------------------------------------------

// Объекты хранятся и копируются по ссылке.
// Переменная хранит не сам объект, а его "адрес в памяти"/"ссылку"
// Копирование
let obj1 = {a: 1};
let obj2 = {a: 1};
let obj3 = obj1; // передаем ссылку объекта1 в объект3
console.log(obj1 == obj2); // false - не равны!
console.log(obj1 == obj3); // true - т.к. ссылаются на один и тот же объект в памяти!
obj1.a = 'changed';
console.log(obj3.a); // 'changed';
// -------------------------------------------------------

// объект объявленный через const может быть изменен!!!
// НО! не может быть переопределен (присвоено другое значение)
const obj4 = {
    name: 'John'
}
obj4.name = 'Dima';
obj4['age'] = 25;
console.log(obj4);
// -------------------------------------------------------

// Object.assign(dest, src1, ..., srcN);
// Копировать свойства объектов srcN в объект dest и возвращает объект dest
let objDest = {
    user: 'John',
    job: 'front-end'
}
let objSrc1 = {
    user: 'Dima', // свойство перезаписывается
    age: 25
}
let objSrc2 = {
    surname: 'Kulagin'
}
Object.assign(objDest, objSrc1, objSrc2); // копировать свойства
console.log(objDest); // {user: Dima, job, age, surname}
let clone = Object.assign({}, objDest); // поверхностно клонировать объект
// (так же как и через цикл, но короче!)
console.log(objDest == clone); // false - разные объекты

// !!!НО!!! свойства - объекты копируются ссылками и нужно делать проверку
// не является ли свойство объектом, чтоб копировать и его структуру тоже.
// это называется - Глубокое клонирование
// в библиотеке lodash метод .cloneDeep(obj) - для глубокого клонирвоания!
// -------------------------------------------------------

console.log('Tasks after title');

const task1 = {};
task1.name = 'John';
task1['surname'] = 'Smith';
task1.name = 'Pete';
delete task1.name;

function isEmpty(obj) {
    for (let prop in obj) {
        return false;
    }
    return true;
}

function shallowSum(obj) {
    let sum = 0;
    for (let prop in obj) {
        sum += obj[prop];
    }
    return sum;
}

function multiplyNumeric(obj) {
    for (let prop in obj) {
        if (typeof(obj[prop]) === 'number') {
            obj[prop] *= 2;
        }
    }
}
