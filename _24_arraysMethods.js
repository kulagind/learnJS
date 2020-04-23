// Шпаргалка по методам массива:
//
// Для добавления/удаления элементов:
//
// push (...items) – добавляет элементы в конец,
// pop() – извлекает элемент с конца,
// shift() – извлекает элемент с начала,
// unshift(...items) – добавляет элементы в начало.
// splice(pos, deleteCount, ...items) – начиная с индекса pos, удаляет deleteCount элементов и вставляет items.
// slice(start, end) – создаёт новый массив, копируя в него элементы с позиции start до end (не включая end).
// concat(...items) – возвращает новый массив: копирует все члены текущего массива и добавляет к нему items. Если какой-то из items является массивом, тогда берутся его элементы.
// Для поиска среди элементов:
//
// indexOf/lastIndexOf(item, pos) – ищет item, начиная с позиции pos, и возвращает его индекс или -1, если ничего не найдено.
// includes(value) – возвращает true, если в массиве имеется элемент value, в противном случае false.
// find/filter(func) – фильтрует элементы через функцию и отдаёт первое/все значения, при прохождении которых через функцию возвращается true.
// findIndex похож на find, но возвращает индекс вместо значения.
// Для перебора элементов:
//
// forEach(func) – вызывает func для каждого элемента. Ничего не возвращает.
// Для преобразования массива:
//
// map(func) – создаёт новый массив из результатов вызова func для каждого элемента.
// sort(func) – сортирует массив «на месте», а потом возвращает его.
// reverse() – «на месте» меняет порядок следования элементов на противоположный и возвращает изменённый массив.
// split/join – преобразует строку в массив и обратно.
// reduce(func, initial) – вычисляет одно значение на основе всего массива, вызывая func для каждого элемента и передавая промежуточный результат между вызовами.
// Дополнительно:
//
// Array.isArray(arr) проверяет, является ли arr массивом.
// Обратите внимание, что методы sort, reverse и splice изменяют исходный массив.
//
// Изученных нами методов достаточно в 99% случаев, но существуют и другие.
//
// arr.some(fn)/arr.every(fn) проверяет массив.
//
// Функция fn вызывается для каждого элемента массива аналогично map. Если какие-либо/все результаты вызовов являются true, то метод возвращает true, иначе false.
//
// arr.fill(value, start, end) – заполняет массив повторяющимися value, начиная с индекса start до end.
//
// arr.copyWithin(target, start, end) – копирует свои элементы, начиная со start и заканчивая end, в собственную позицию target (перезаписывает существующие).

// ------------------------------------------------------------------

// В методах массива отрицательные элементы позволяют
// оперировать массивом с конца

// Удаление элементов
// delete - оставляет пустой элемент в массиве.

// Швейцарский нож массивов!
// .splice(index, deleteCount, elem1, ..., elemN);
// Начинает с позиции index, удаляет количество элементов deleteCount
// и вставляет на их место элементы elem1...elemN.
// Возвращает массив удаленных элементов

let arr = ["Я", "изучаю", "JavaScript", "прямо", "сейчас"];
arr.splice(0, 3, "Давай", "танцевать"); // удалить 3 первых элемента и заменить их другими
console.log(arr) // теперь ["Давай", "танцевать", "прямо", "сейчас"]

// .slice(start, end) копирует элементы с индекса start до индекса end не включая
let test = ['t', 'e', 's', 't'].slice(-2); // [s, t] 2 индекса с конца. Возвращает новый массив

// arr.concat(arg1, ..., argN); - создает массив сохраняя данные из arr и доп. значения arg
// или данные из массивов arg. Если arg - объект, то он будет добавлен не раскрываясь.
// НО! Symbol.isConcatSpreadable

let arr2 = [1, 2];
let arrayLike = {
    0: "что-то",
    1: "ещё",
    [Symbol.isConcatSpreadable]: true, // позволяет раскрывать объект при .concat
    length: 2
};
console.log(arr2.concat(arrayLike)); // [1, 2, "что-то", "ещё"]

// forEach() - запускает перебор всех элементов массива с индексами!
arr.forEach((item, index, array) => {
    console.log('item:', item, '| index:', index, '| array:', array);
})

// Поиск в массиве
// indexOf / lastIndexOf / includes
// - arr.indexOf(item, from) ищет item, начиная с индекса from, и возвращает индекс,
// на котором был найден искомый элемент, в противном случае -1.
// - arr.lastIndexOf(item, from) – то же самое, но ищет справа налево.
// - arr.includes(item, from) – ищет item, начиная с индекса from, и возвращает true,
// если поиск успешен.
// Обратите внимание, что методы используют строгое сравнение ===.
// Таким образом, если мы ищем false, он находит именно false, а не ноль.
const arr3 = [NaN];
console.log(arr3.indexOf(NaN)); // -1 (должен быть 0, но === проверка на равенство не работает для NaN)
console.log(arr3.includes(NaN));// true (верно)

// find / findIndex
let result = arr.find(function (item, index, array) {
    // если true - возвращается текущий элемент и перебор прерывается
    // если все итерации оказались ложными, возвращается undefined
});

let users = [
    {id: 1, name: "Вася"},
    {id: 2, name: "Петя"},
    {id: 3, name: "Маша"}
];
let user = users.find(item => item.id === 1);
console.log(user.name); // Вася

// filter
// Синтаксис этого метода схож с find, но filter возвращает массив из всех подходящих элементов/
let someUsers = users.filter(item => item.id < 3); // возвращает массив, состоящий из двух первых пользователей
console.log(someUsers.length); // 2

// Преобразование массива
// .map - вызывает функцию для каждого элемента массива и
// возвращает массив результатов выполнения этой функции.
let result2 = arr.map(function (item, index, array) {
    // возвращается новое значение вместо элемента
});

// .sort - сортирует элементы в массиве изменяя его
// По умолчанию элементы сортируются как строки.
// sort() - черный ящик и сравнивание хаотично элементы, по разным алгоритмам
function compareNumeric(a, b) {
    if (a > b) return 1;
    if (a === b) return 0;
    if (a < b) return -1;
}

let arr4 = [1, 2, 15];
arr4.sort((a, b) => {
    console.log(a, '<>', b)
});
// !!! Если compareFunction(a, b) меньше 0, сортировка поставит a по меньшему индексу,
// чем b, то есть, a идёт первым.
// !!! Если compareFunction(a, b) вернёт 0, сортировка оставит a и b неизменными по
// отношению друг к другу, но отсортирует их по отношению ко всем другим
// элементам. Обратите внимание: стандарт ECMAscript не гарантирует данное
// поведение, и ему следуют не все браузеры (например, версии Mozilla по крайней
// мере, до 2003 года).
// !!! Если compareFunction(a, b) больше 0, сортировка поставит b по меньшему индексу,
// чем a.
// !!! Функция compareFunction(a, b) должна всегда возвращать одинаковое значение для
// определённой пары элементов a и b. Если будут возвращаться непоследовательные
// результаты, порядок сортировки будет не определён.

// можем посмотреть сравниваемые элементы
arr4.sort(compareNumeric); // передаем функцию для сортировки массива
console.log(arr4);  // 1, 2, 15

// arr.reverse - меняет порядок элементов arr на обратный, возвращает arr с изм. порядком

// .split / .join
// split(delim, elemCount); делит строку на массив по разделителю delim
// с количеством элементов elemCount, если элементов больше - остальные будут отброшены
let names = 'Вася, Петя, Маша';
let arrNames = names.split(', '); // [Вася, Петя, Маша]

// join(str) - склеивает массив в строку с разделителем str
let str = arrNames.join('-=-'); // Вася-=-Петя-=-Маша

//  reduce / reduceRight
// Эти методы чуть сложнее, Они используются для вычисления какого-нибудь
// единого значения на основе всего массива. Метод arr.reduceRight работает аналогично,
// но проходит по массиву справа налево.
// let value = arr.reduce(function(previousValue, item, index, array) {
//     // ...
// }, [initialValue]);
// Аргументы:
// previousValue – результат предыдущего вызова этой функции, равен initial при первом вызове (если передан initial),
// item – очередной элемент массива,
// index – его индекс,
// array – сам массив.
// при отсутствии initial в качестве первого значения берётся первый элемент
// массива, а перебор стартует со второго.
let nums = [1, 2, 3, 4, 5];
let res = nums.reduce((sum, current) => sum + current, 0);
console.log(res); // 15

// Array.isArray(value) - true если value явл. массивом

// Большинство методов поддерживают «thisArg» - последний аргумент после func.
// передает контекст this для функции
let army = {
    minAge: 18,
    maxAge: 27,
    canJoin(user) {
        return user.age >= this.minAge && user.age < this.maxAge;
    }
};
let users2 = [
    {age: 16},
    {age: 20},
    {age: 23},
    {age: 30}
];
// найти пользователей, для которых army.canJoin возвращает true
let soldiers = users2.filter(army.canJoin, army);
// Вызов users.filter(army.canJoin, army) можно заменить на
let soldiersAgain = users2.filter(user => army.canJoin(user)) // который делает то же самое.
// Последняя запись используется даже чаще, так как функция-стрелка более наглядна.

// ------------------------------------------------------------------

function camelize(str) {
    return str
        .split('-')
        .map((word, index) => {
            return index === 0 ? word : word[0].toUpperCase() + word.slice(1);
        })
        .join('');
}

console.log(camelize('background-color')); // backgroundColor


function filterRange(arr, a, b) {
    return arr
        .filter(elem => {
            return b >= elem && elem >= a;
        })
}

let arrr = [1, 2, 3, 4, 6, 8, 9];
console.log(filterRange(arrr, 3, 7));
console.log(arrr);


function filterRangeInPlace(arr, a, b) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < a || arr[i] > b) {
            arr.splice(i, 1);
            i--;
        }
    }
}

let arr5 = [5, 3, 8, 1];
filterRangeInPlace(arr5, 1, 4); // удалены числа вне диапазона 1..4
console.log(arr5); // [3, 1]


let arr6 = [5, 2, 1, -10, 8];
console.log(arr6);
arr6.sort((a, b) => b - a);
// function decreaseSorting(arr) {
//     arr.sort((a, b) => {
//          if (a > b) return -1;
//          if (a === b) return 0;
//          if (a < b) return 1;
//     });
// }
// decreaseSorting(arr6)
console.log(arr6)


let arr7 = ['HTML', 'JavaScript', 'CSS'];

function copySorted(arr) {
    return [...arr].sort(); // либо arr.slice().sort();
}

console.log(copySorted(arr7));
console.log(arr7);


function Calculator() {
    this._operators = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
    }

    this.calculate = function (str) {
        let arrExpression = str.split(' ');
        try {
            let result = this._operators[arrExpression[1]](+arrExpression[0], +arrExpression[2]);
            return isNaN(result) ? {errorCode: 1, errorMessage: 'Insert correct numbers'} : result;
        } catch (error) {
            if (error) return {
                errorCode: 2,
                errorMessage: `Please use an existing operator (${Object.keys(this._operators)})`
            }
        }
    }

    this.addMethod = function (name, func) {
        this._operators[name] = func;
    }

    this.removeMethod = function (name) {
        delete this._operators[name];
    }

    return this;
}

let calc = new Calculator();
console.log(calc.calculate('3 / 7')); // {errorCode: 2, errorMessage: "Please use an existing operator (+,-)"}
console.log(calc.calculate('f + 7')); // {errorCode: 1, errorMessage: "Insert correct numbers"}
console.log(calc.calculate('3 - 7')); // -4
calc.addMethod('*', (a, b) => a * b);
calc.addMethod('**', (a, b) => a ** b);
calc.addMethod('/', (a, b) => a / b);
console.log(calc.calculate('3 ** 2')); // 9
console.log(calc.calculate('3 / 2')); // 1.5
console.log(calc.calculate('3 * 2')); // 6
calc.removeMethod('**'); // удалит метод
calc.removeMethod('*/'); // ничего не удалит


let users3 = [
    {
        name: 'Dima',
        age: 25,
        surname: 'Kulagin',
        id: 1,
    },
    {
        name: 'Evgeniia',
        age: 24,
        surname: 'Kulagina',
        id: 2,
    },
    {
        name: 'Grut',
        age: 250,
        surname: 'Pupkin',
        id: 3,
    },
]

// let names2 = [];
// users3.forEach(user => {names2.push(user.name)});
let names2 = users3.map(item => item.name);
console.log(names2);


// let usersMapped = users3.map(user => {
//     return {
//         fullName: `${user.name} ${user.surname}`,
//         id: user.id
//     }
// });
let usersMapped = users3.map(user => ({
    fullName: `${user.name} ${user.surname}`,
    id: user.id
}));
console.log(usersMapped);


function sortByField(users, field) {
    users.sort((a, b) => a[field] - b[field]);
}

sortByField(users3, 'age');
console.log(users3);


// function shuffle(array) {
//     array.sort((a, b) => {
//        let random = Math.random();
//        console.log(random);
//        if (random < 1/3) return -1;
//        if (random < 2/3) return 0;
//        if (random < 1) return 1;
//     })
// }
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

let array1 = [1, 2, 3, 4, 5, 6];
shuffle(array1);
console.log(array1);
// В данном случае вероятности выпадения одних буду выше вероятности выпадения других,
// из за особенности метода sort!!!
// Для корректного решения лучше воспользоваться алгоритмом "Тасование Фишера — Йетса";
// + этот алгоритм намного быстрее, т.к. нет затрат на сортирвоку
function shuffleFisherYetz(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
        [array[i], array[j]] = [array[j], array[i]]; // меняет местами элементы
    }
}


function getAverageField(array, field) {
    return array.reduce((sum, current) => sum + current[field], 0) / array.length;
}
console.log(getAverageField(users3, 'age'));


