// Свойство __proto__ считается устаревшим, и по стандарту оно должно поддерживаться только браузерами.

// Современные же методы это://
// - Object.create(proto, [descriptors]) – создаёт пустой объект со свойством [[Prototype]],
// указанным как proto, и необязательными дескрипторами свойств descriptors.
// - Object.getPrototypeOf(obj) – возвращает свойство [[Prototype]] объекта obj.
// - Object.setPrototypeOf(obj, proto) – устанавливает свойство [[Prototype]] объекта obj как proto.

let animal = {
    eats: true
};
let rabbit = Object.create(animal);
console.log(rabbit.eats);
console.log(Object.getPrototypeOf(rabbit) === animal); // true
console.log(Object.setPrototypeOf(rabbit, {}));
console.log(Object.getPrototypeOf(rabbit) === animal); // false, т.к. сменили прототип

// У Object.create есть необязательный второй аргумент: дескрипторы свойств. Мы можем добавить
// дополнительное свойство новому объекту таким образом:
let rabbit2 = Object.create(animal, {
    jumps: {
        value: true
    }
});
console.log(rabbit2.jumps); // true

// клон obj c тем же прототипом (с поверхностным копированием свойств)
// let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Не меняйте [[Prototype]] существующих объектов, если важна скорость!
// Изменение прототипа «на лету» с помощью Object.setPrototypeOf или obj.__proto__= –
// очень медленная операция, которая ломает внутренние оптимизации для операций доступа к
// свойствам объекта. Так что лучше избегайте этого кроме тех случаев, когда вы знаете,
// что делаете, или же когда скорость JavaScript для вас не имеет никакого значения.
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

let obj = {};
let key = prompt('What\'s the key?', '__proto__');
obj[key] = 'some value';
console.log(obj[key]); // object - не some value
// __proto__ это аксессор - устанавливается сеттером, который позволяет установить либо объект либо null!!!!!

// __proto__ – это способ доступа к свойству [[Prototype]], это не само свойство [[Prototype]].

let obj2 = Object.create(null); // при наследовании от null можно устанавливать __proto__
// любое значение! Т.к. наследования геттера и сеттера для прото не произошло!!!
let key2 = prompt("What's the key?", "__proto__");
obj2[key2] = "some value";
console.log(obj2[key2]); // "some value"
// console.log(obj2.toString()); // Error - нету toString
console.log(Object.keys(obj2)); // работает!


// Ещё методы:
// - Object.keys(obj) / Object.values(obj) / Object.entries(obj) – возвращают массив всех
// перечисляемых собственных строковых ключей/значений/пар ключ-значение.
// - Object.getOwnPropertySymbols(obj) – возвращает массив всех собственных символьных ключей.
// - Object.getOwnPropertyNames(obj) – возвращает массив всех собственных строковых ключей.
// - Reflect.ownKeys(obj) – возвращает массив всех собственных ключей.
// - obj.hasOwnProperty(key): возвращает true, если у obj есть собственное (не унаследованное)
// свойство с именем key.

// Все методы, которые возвращают свойства объектов (такие как Object.keys и другие),
// возвращают «собственные» свойства. Если мы хотим получить и унаследованные,
// можно воспользоваться циклом for..in.

// -------------------------------------------------------------
let dictionary = Object.create(null);
// Остальные флаги в дескрипторе по умолчанию имею значение ЛОЖЬ
Object.defineProperty(dictionary, 'toString', {
    value: function() {
        return Object.keys(this).join(',');
    }
})
dictionary.apple = 'Apple';
dictionary.__proto__ = 'test';
for (let key in dictionary) console.log(key);
console.log(dictionary.toString());
