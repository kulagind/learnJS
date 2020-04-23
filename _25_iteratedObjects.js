// Чтобы сделать объект итерируемым (и позволить for...of с ним работать), нужно
// добавить встроенный метод с именем Symbol.iterator
//
// 1) Когда цикл for..of запускается, он вызывает этот метод один раз (или выдаёт ошибку,
// если метод не найден). Этот метод должен вернуть итератор – объект с методом next.
// 2) Дальше for..of работает только с этим возвращённым объектом.
// 3) Когда for..of хочет получить следующее значение, он вызывает метод next()
// этого объекта.
// 4) Результат вызова next() должен иметь вид {done: Boolean, value: any},
// где done=true означает, что итерация закончена, в противном случае value содержит
// очередное значение.
let range = {
    from: 1,
    to: 5
};

// 1. вызов for..of сначала вызывает эту функцию
range[Symbol.iterator] = function() {

    // ...она возвращает объект итератора:
    // 2. Далее, for..of работает только с этим итератором, запрашивая у него новые значения
    return {
        current: this.from,
        last: this.to,

        // 3. next() вызывается на каждой итерации цикла for..of
        next() {
            // 4. он должен вернуть значение в виде объекта {done:.., value :...}
            if (this.current <= this.last) {
                return { done: false, value: this.current++ };
            } else {
                return { done: true };
            }
        }
    };
};

// теперь работает!
for (let num of range) {
    console.log(num); // 1, затем 2, 3, 4, 5
}


// Строка - перебираемый объект
for (let char of "test") {
    // срабатывает 4 раза: по одному для каждого символа
    console.log( char ); // t, затем e, затем s, затем t
}
// Работает корректно даже с суррогатными парами
let str = '𝒳😂';
for (let char of str) {
    console.log( char ); // 𝒳, а затем 😂
}


// Явная итерация. Вручную, прямыми вызовами
let str2 = 'Hello';
// The same as for...of. But it's more flexible. We can stop iteration in any time.
let iterator = str2[Symbol.iterator]();
while (true) {
    let result = iterator.next();
    if (result.done) break;
    console.log(result.value);
}


// Псевдомассив - это объект с индексами и length, но он не может быть проитерирован

// Итерируемые объекты и псевдомассивы.
// Для работы с ними как с "настоящими массивами" применяется метод Array.from!!!
let arrayLike = {
    0: "Hello",
    1: "World",
    length: 2
};
let arr = Array.from(arrayLike); // создаем массив на основе псевдомассива или итерируемого объекта
console.log(arr);
let arr2 = Array.from(range);
console.log(arr2);

// Array.from(obj[, mapFn, thisArg]) - Необязательный второй аргумент может быть
// функцией, которая будет применена к каждому элементу перед добавлением в массив,
// а thisArg позволяет установить this для этой функции.
let arr3 = Array.from(range, num => num * num);
console.log(arr3); // 1,4,9,16,25
