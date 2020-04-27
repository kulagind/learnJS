// Помимо значения value, свойства объекта имеют три специальных атрибута
// (так называемые «флаги»).
//
// writable – если true, свойство можно изменить, иначе оно только для чтения.
// enumerable – если true, свойство перечисляется в циклах, в противном случае циклы его игнорируют.
// configurable – если true, свойство можно удалить, а эти атрибуты можно изменять, иначе этого делать нельзя.

// let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);
// Метод позволяет получить полную информацию о свойствах и возвращает "дескриптор"
let user = {
    name: "John"
};
let descriptor = Object.getOwnPropertyDescriptor(user, 'name');
console.log( JSON.stringify(descriptor, null, 2 ) );
/* дескриптор свойства:
{
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/

// Чтобы изменить флаги можно использовать метод:
// Object.defineProperty(obj, propertyName, descriptor);
Object.defineProperty(user, 'age', {
    value: 25
});
// Например, здесь создаётся свойство age, все флаги которого имеют значение false
let descriptor2 = Object.getOwnPropertyDescriptor(user, 'age');
console.log( JSON.stringify(descriptor2, null, 2 ) );


// Никто не сможет перезаписать свойство, пока не обновит флаг
// Ошибки появятся только в строгом режиме use strict
Object.defineProperty(user, 'name', {
    writable: false
});
user.name = 'Pete'; // присваивания не произойдет!!! Игнор - в нестрогом, ошибка - в строгом режиме
console.log(user.name); // John


// Неперечислимое свойство
// Встроенный метод toString в объектах - неперечислимый, его не видно в цикле for...in.
user.toString = function () { // перезапишем метод
    return this.name;
}
for (let key in user) console.log(key); // name, toString - теперь метод toString стал перечислимым
Object.defineProperty(user, 'toString', {
    enumerable: false
}); // сделаем его неперечислимым!
for (let key in user) console.log(key); // name
console.log(Object.keys(user)); // [name] - age и toString скрыты от перечислений


// Неконфигурируемое свойство. configurable = false
// Определение свойства как неконфигурируемого – это дорога в один конец. Мы не сможем отменить
// это действие, потому что defineProperty не работает с неконфигурируемыми свойствами.
Object.defineProperty(user, 'name', {
    configurable: false,
    writable: false
});
delete user.name; // игнор! т.к. свойство запечатано
console.log(user);
// defineProperty не работает с запечатанными свойствами!

// Object.defineProperty(user, 'name', {
//     configurable: true
// }); // ОШИБКА!!! Свойство запечатано навечно!

// defineProperties - позволяет переопределить сразу много свойств
// Object.defineProperties(obj, {
//   prop1: descriptor1,
//   prop2: descriptor2
//   // ...
// });

// Object.getOwnPropertyDescriptors(obj) - получить все дескрипторы свойств сразу
// let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
// КЛОНИРОВАНИЕ ЧЕРЕЗ ПРИСВАИВАНИЕ НЕ КОПИРУЕТ ФЛАГИ!
// - Так что если нам нужен клон «получше», предпочтительнее использовать Object.defineProperties.
// - Другое отличие в том, что for..in игнорирует символьные свойства, а Object.getOwnPropertyDescriptors
// возвращает дескрипторы всех свойств, включая свойства-символы.

// Дескрипторы свойств работают на уровне конкретных свойств.//
// Но ещё есть методы, которые ограничивают доступ ко всему объекту:
// - Object.preventExtensions(obj) - Запрещает добавлять новые свойства в объект.
// - Object.seal(obj) - Запрещает добавлять/удалять свойства. Устанавливает configurable: false
// для всех существующих свойств.
// - Object.freeze(obj) - Запрещает добавлять/удалять/изменять свойства. Устанавливает
// configurable: false, writable: false для всех существующих свойств.

// А также есть методы для их проверки:
// - Object.isExtensible(obj) - Возвращает false, если добавление свойств запрещено, иначе true.
// - Object.isSealed(obj) - Возвращает true, если добавление/удаление свойств запрещено и для всех
// существующих свойств установлено configurable: false.
// - Object.isFrozen(obj) - Возвращает true, если добавление/удаление/изменение свойств запрещено,
// и для всех текущих свойств установлено configurable: false, writable: false.
