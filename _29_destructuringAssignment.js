// Деструктурирующее присваивание – это специальный синтаксис, который позволяет нам
// «распаковать» массивы или объекты в кучу переменных, так как иногда они более удобны.
// Не нарушает сам массив!!! Просто копирует в переменные
// РАБОТАЕТ с ЛЮБЫМ ПЕРЕБИРАЕМЫМ ОБЪЕКТОМ!!!
// let {prop : varName = default, ...rest} = object;
// let [item1 = default, item2, ...rest] = array;

let arr = ['Ilya', 'Kantor'];
// Деструктурированное присваивание:
let [firstname, surname] = arr;
// Теперь можно использовать переменные вместо элементов массива
console.log(firstname);
console.log(surname);
// отлично работает со сплитом. Ненужные элементы можно пропустить запятыми!!!
let [fname, , age] = 'Ilya Kantor 25'.split(' '); // fname = 'Илья'; age = 25
let [a, b, c] = 'abc';
let [one, two, three] = new Set([1, 2, 3]);

let user = {
    name: "John",
    age: 30
};
// Для Map тоже самое!!!
for (let [key, value] of Object.entries(user)) {
    console.log(key, value); // name John, затем age 30
}

// ----------------------------------------------

// Остаточные параметры "..."
let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
console.log(name1);
console.log(name2);
console.log(rest); // ["Consul", "of the Roman Republic"] массив с оставшимися элементами

let [firstn, surn] = []; // будут присвоены indefined
let [firstn2 = 'default value', surn2 = ''] = []; // будут присвоены значения по умолчанию
let [name3 = prompt('name?'), surname3 = prompt('surname?')] = ["Julius"];
// prompt будет запущен только при отсутствии значения присваивания

// ----------------------------------------------

// Деструктуризация объекта
let {var1, var2} = {var1: 100, var2: 'valuevar2'}; // запись в пермененные свойств объекта
console.log(var1);
console.log(var2);

// порядок свойств не имеет значения!
let {height, width, title} = { title: "Menu", height: 200, width: 100 }; // height: 200 и тд...
let {height2: h, width2: w, title2} = { title2: "Menu", height2: 200, width2: 100 };
// h = 200, w = 100, title2 = 'Menu';
// Двоеточие ":" значит что куда идет. так же можно использовать и значение по умолчанию после ":"!
let {width3: w3 = 100, height3: h3 = 200, title3} = {title3: 'Hi'}; // w3 = 100, h3 = 200, title3 = 'Hi'

// let {title} = options; // где options объект, содержащий свойство title.
// Будет взять только title!

// let {title, ...rest} = options; // title = options.title, rest - объект с остальными свойствами!
// Будет взять только title!

// Для деструктуризации без let необходимо заключить в (). Чтоб Javascript видел что это не просто блок кодаю
let a1, b1, c1;
({a1, b1, c1} = {b1: 'B', a1: 'A', c1: 'C'});

// Для извлечения вложенных данных, нужно создать вложенные переменные для деструктуризации!!!
let options = {
    size: {
        width4: 100,
        height4: 200
    },
    items: ["Cake", "Donut"],
    extra: true
};
// деструктуризация разбита на несколько строк для ясности
let {
    size: { // положим size сюда
        width4,
        height4
    },
    items: [item1, item2], // добавим элементы к items
    title4 = "Menu" // отсутствует в объекте (используется значение по умолчанию)
} = options;
console.log(title4);  // Menu
console.log(width4);  // 100
console.log(height4); // 200
console.log(item1);  // Cake
console.log(item2);  // Donut

// ----------------------------------------------

// "Умные аргументы функций" - объект со значениями по умолчанию
// (деструктурирующее присваивание):
let options2 = {
    title: "My menu",
    items: ["Item1", "Item2"]
};
// она немедленно извлекает свойства в переменные
function showMenu({title = "Untitled", width = 200, height = 100, items = []}) {
    // title, items – взято из options,
    // width, height – используются значения по умолчанию
    console.log( `${title} ${width} ${height}` ); // My Menu 200 100
    console.log( items ); // ['Item1', 'Item2']
}
showMenu(options2);

// Синтаксис такой же, как и для деструктурирующего присваивания!!!!
// function somefunc({
//   incomingProperty: varName = defaultValue
//   ...
// });
// somefunc(); // ОШИБКА!!! - т.к. для значений по умолчанию, нужно передать пустой объект!
// somefunc({}); // Вот так норм!
// Можно исправить это, сделав передаваемый объект, пустым объектом по умолчанию!
// function somefunc({
//   incomingProperty: varName = defaultValue
//   ...
// } = {});
// somefunc(); // вот теперь норм!

// ----------------------------------------------

let user2 = {
    name: "John",
    years: 30
};
let {name: name4, years: age2, isAdmin = false} = user2;
console.log(name4, age2, isAdmin);

let salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
};
function topSalary(salaries) {
    let specialist = null;
    let maxSalary = 0;
    for (let [name, salary] of Object.entries(salaries)) {
        if (maxSalary < salary) {
            maxSalary = salary;
            specialist = name;
        }
    }
    return [specialist, maxSalary];
}
console.log(topSalary(salaries));
