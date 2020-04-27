// Массив является объектом и ведет себя как объект
let arr = new Array("яблоко", "груша");
let arr3 = new Array(2); // создаст пустой массив длиной 2
let arr2 = ['apple', 'orange', 'melone'];

console.log(arr2[0]);
arr2[0] = 'pineapple';
arr2.push('qiwi');
console.log(arr2);

// ОЧЕРЕДЬ: .shift <-- ARRAY <-- .push
// .push - добавить в конец
// .shift - удаляет начальный элемент сдвигая очередь,
// так что 2ой становится 1ым и тд (возвращает удаленный элемент)

// СТЕК: ARRAY <-- .push
//             --> .pop
// .pop - удалить последний элемент и возвращает его

// .unshift - добавить эл. в начало массива

// Возможно, но неправильно!!!:
// - Добавление нечислового свойства, например: arr.test = 5.
// - Создание «дыр», например: добавление arr[0], затем arr[1000]
// (между ними ничего нет).
// - Заполнение массива в обратном порядке, например:
// arr[1000], arr[999] и т.д.

// Методы push/pop выполняются быстрее чем shift/unshift, тк:
// Операция shift должна выполнить 3 действия:
// 1) Удалить элемент с индексом 0.
// 2) Сдвинуть все элементы влево, заново пронумеровать их,
// заменив 1 на 0, 2 на 1 и т.д.
// 3) Обновить свойство length .

// Так shift и unshift - дорогостоящии операции, т.к. надо переиндексировать весь массив.

// Перебор массива:
// метод for...in - ооочень медленный, поэтому не рекомендуется для массивов
for (let fruit of arr2) {
    console.log(fruit);
}
// !!! для доступа к индексам нужно перебирать стандартным методом for

// length можно переписать вручную! - тогда массив сократится
// или добавятся пустые элементы
// arr.length = 0 - самый простой способ почистить массив

// !!!!!!Массивы выполняют ТОЛЬКО преобразование toString!!!!!!!
// toString - вернуть элементы разделенные запятой

// ---------------------------------------------------------

let styles = ['jazz', 'blues'];
console.log(styles);
styles.push('rock\'n\'roll');
console.log(styles);
styles[Math.floor((styles.length - 1) / 2)] = 'classic';
console.log(styles);
styles.shift()
console.log(styles);
styles.unshift('Rap', 'Raggy');
console.log(styles);

function sumInput() {
    const numbers = [];
    while (true) {
        let value = prompt('Введите число', '');
        if (value === '' || value === null || !isFinite(value)) break;
        numbers.push(+value);
    }
    let sum = 0;
    for (let number of numbers) {
        sum += number;
    }
    return sum;
}
console.log(sumInput());

// найти максимальную сумму последжовательных элементов
function getMaxSubSum(arr) {
    let partialSum = 0;
    let maxSum = 0;
    for (let number of arr) {
        partialSum += number;
        maxSum = Math.max(maxSum, partialSum);
        if (partialSum < 0) partialSum = 0;
    }
    return maxSum;
}
