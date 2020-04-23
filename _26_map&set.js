// Map и Set
// Map – это коллекция ключ/значение, как и Object. Но основное отличие в том,
// что Map позволяет использовать ключи любого типа ДАЖЕ ОБЪЕКТЫ.
// Set - множество значений без ключей, где каждое значение может появляться только один раз
// !!!ПЕРЕБОР ОСУЩЕСТВЛЯЕТСЯ ВСЕГДА В ПОРЯДКЕ ДОБАВЛЕНИЯ ЭЛЕМЕНТОВ!!!

// new Map() – создаёт коллекцию.
// map.set(key, value) – записывает по ключу key значение value.
// map.get(key) – возвращает значение по ключу или undefined, если ключ key отсутствует.
// map.has(key) – возвращает true, если ключ key присутствует в коллекции, иначе false.
// map.delete(key) – удаляет элемент по ключу key.
// map.clear() – очищает коллекцию от всех элементов.
// map.size – возвращает текущее количество элементов.
// map.keys() – возвращает итерируемый объект по ключам,
// map.values() – возвращает итерируемый объект по значениям,
// map.forEach((value, key, map) => {})
// map.entries() – возвращает итерируемый объект по парам вида [ключ, значение],
// этот вариант используется по умолчанию в for..of.
// !!! Для Map Перебор происходит в том же порядке, что и добавление !!!

let john = { name: "John" };
// давайте сохраним количество посещений для каждого пользователя
let visitsCountMap = new Map();
// объект john - это ключ для значения в объекте Map
visitsCountMap.set(john, 123);
console.log(visitsCountMap.get(john)); // 123
console.log(visitsCountMap);
// Чтобы сравнивать ключи, объект Map использует алгоритм SameValueZero.
// Это почти такое же сравнение, что и ===, с той лишь разницей,
// что NaN считается равным NaN. Так что NaN также может использоваться в качестве ключа.

let recipeMap = new Map([
    ["огурец", 500],
    ["помидор", 350],
    ["лук",    50]
]);
// перебор по ключам (овощи)
for (let vegetable of recipeMap.keys()) {
    console.log(vegetable); // огурец, помидор, лук
}
// перебор по значениям (числа)
for (let amount of recipeMap.values()) {
    console.log(amount); // 500, 350, 50
}
// перебор по элементам в формате [ключ, значение]
for (let entry of recipeMap) { // то же самое, что и recipeMap.entries()
    console.log(entry); // огурец,500 (и так далее)
}

// Object.entries: Map из Object
let obj = {
    name: "John",
    age: 30
};
let map = new Map(Object.entries(obj));

// Object.fromEntries: Object из Map
// let obj = Object.fromEntries(map.entries());
let prices = Object.fromEntries([
    ['banana', 1],
    ['orange', 2],
    ['meat', 4]
]);
// now prices = { banana: 1, orange: 2, meat: 4 }


// Set

// new Set(iterable) – создаёт Set, и если в качестве аргумента был предоставлен
// итерируемый объект (обычно это массив), то копирует его значения в новый Set.
// set.add(value) – добавляет значение (если оно уже есть, то ничего не делает),
// возвращает тот же объект set.
// set.delete(value) – удаляет значение, возвращает true если value было в множестве
// на момент вызова, иначе false.
// set.has(value) – возвращает true, если значение присутствует в множестве, иначе false.
// set.clear() – удаляет все имеющиеся значения.
// set.size – возвращает количество элементов в множестве.
// set.forEach(value, valueAgain, obj) - сделано чтоб легко заменить map на set и наоборот
// for...of
// set.keys() – возвращает перебираемый объект для значений,
// set.values() – то же самое, что и set.keys(), присутствует для обратной совместимости с Map,
// set.entries() – возвращает перебираемый объект для пар вида [значение, значение],
// присутствует для обратной совместимости с Map.

// Основная «изюминка» – это то, что при повторных вызовах set.add() с одним и тем же
// значением ничего не происходит, за счёт этого как раз и получается, что каждое
// значение появляется один раз.

// ----------------------------------------------------------------

let values = ["Hare", "Krishna", "Hare", "Krishna",
    "Krishna", "Krishna", "Hare", "Hare", ":-O"
];
function unique(arr) {
    return Array.from(new Set(arr));
}
// function unique(arr) {
//     let set = new Set();
//     arr.forEach(value => {
//         set.add(value);
//     });
//     return set;
// }
console.log(unique(values));


let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];
function anagrammClean(arr) {
    let map = new Map();
    for (let value of arr) {
        let sorted = value.toLowerCase().split('').sort().join('');
        map.set(sorted, value);
    }
    return Array.from(map.values());
}
console.log(anagrammClean(arr));


let map2 = new Map();
map2.set("name", "John");
let keys = Array.from(map2.keys());
keys.push("more");
alert(keys); // name, more
