// симфолы сравниваются каждый с каждым. Как закончилась одна из строк - сравнение прекратилось
console.log("Z" > "A"); // true
console.log("Za" > "Aaaaaaa"); // true
console.log("Aa" > "Aaaaaaa"); // false
console.log("2" > "12"); // true

// при сравнении разных типов JS приводит каждое из них к числу!
console.log("2" > 1); // true
console.log(true == 1); // true
console.log(1 == "1"); // true

// === строгое сравнение, без приведения типов
console.log(true == 1); // true
console.log(true === 1); // false
console.log(1 === 1); // true
console.log(1 === "1"); // false

// null and undefined
console.log(null == undefined); // true - специальное правило языка. Они равны друг другу и не равны остальным!
console.log(null === undefined); // false

console.log(null > 0); // false - не преобразует в числа!
console.log(null == 0); // false - т.к. особое правило, что null == undefined и ничему больше
console.log(null >= 0); // true !!! - преобразует в числа!

// добавить проверки для сравнение < > <= >= если есть вероятность что там будет null/undefined
