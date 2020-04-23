// map.keys(), map.values(), map.entries() - игнорируют символьные свойства!!!
// Для структур: Map, Set, Array!!!!

// Для простых объектов:
// Object.keys(obj); // массив ключей
// Object.values(obj); // массив значений
// Object.entries(obj); // массив пар [ключ, значение]

// 1) Первое отличие в том, что мы должны вызвать Object.keys(obj), а не obj.keys().
// Почему так? Основная причина – гибкость.
// Помните, что объекты являются основой всех сложных структур в JavaScript.
// У нас может быть объект data, который реализует свой собственный метод
// data.values(). И мы всё ещё можем применять к нему стандартный метод
// Object.values(data).
// 2) Второе отличие в том, что методы вида Object.* возвращают «реальные» массивы,
// а не просто итерируемые объекты. Это в основном по историческим причинам.

// Для использования map или filter в объектах нужно использовать Object.entries(obj)
// с последующим вызовом Object.fromEntries() - преобразует массив в объект.
let prices = {
    banana: 1,
    orange: 2,
    meat: 4,
};

let doublePrices = Object.fromEntries(
    // преобразовать в массив, затем map, затем fromEntries обратно объект
    Object.entries(prices).map(([key, value]) => [key, value * 2])
);

// -----------------------------------
let salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
};

function sumSalaries(salaries) {
    let sum = 0;
    for (let value of Object.values(salaries)) {
        sum += value;
    }
    return sum;
}
console.log(sumSalaries(salaries));


let user = {
    name: 'Dima',
    age: 25
}

function count(obj) {
    return Object.keys(obj).length;
}
console.log(count(user));
