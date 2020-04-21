// циклы
let i = 0;
while (i < 3) {
  console.log(i);
  i++;
} // 0, 1, 2. Т.е. выполняется пока условие истинно. 3 итерации цикла.
let k = 3;
while (k) console.log(k--);

// do {body} while (condition) - выолнится 1 раз 100%, а далее по условиям
let l = 0;
do {
  console.log(l++);
} while (l < 3);

// for (начало - выполняется 1 раз при входе в цикл; условие - если ЛОЖЬ, то цикл останавливается; шаг - выполняется после каждой итерации и перед условием).
// При объявлении переменной в цикле, переменная i существует только в теле цикла!
for (let i = 0; i < 3; i++) {
  console.log(i);
}

// Можно пропустить любую часть FOR. Если убрать все, получится бесконечный цикл.
let j = 0;
for (; j < 3; ) {
  console.log(j++);
}
console.log(j); // 3

// break и continue - не являются выражениями и не могут быть использованы с тернарным оператором!
// break - прерывает цикл в любой момент
let sum = 0;
while (true) {
  let value = +prompt("Insert a number", "");
  if (!value) break; // прекратит выполнение когда число не передано
  sum += value;
}
alert(`Sum is ${sum}`);

let value;
do {
  value = prompt("Insert a number more than 100", "");
} while (value <= 100 && value);

// continue - прекращение текущей и переход к следующей итерации
for (let i = 0; i < 10; i++) {
  if (i % 2 == 0) continue;
  console.error(i); // 1, 3, 5, 7, 9
}

// МЕТКИ. break и continue можно прерывать циклы на любую вложенность с помощью меток.
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    let input = prompt(`Value is (${i};${j})`, "");
    // если пустая строка или отмена, то выйти из обоих циклов
    if (!input) break outer;
  }
}
alert("готово!");

let i2 = 0;
while (++i2 < 5) console.warn(i2); // 1,2,3,4
let i3 = 0;
while (i3++ < 5) console.error(i3); // 1,2,3,4,5

// четные числа
for (let i = 2; i <= 10; i++) {
  if (i % 2 != 0) continue;
  console.log(i); // 2,4,6,8,10
}

// вывод простых чисел
let n = +prompt("insert N from 1 to 1000000", "");
console.log(`Простые числа от 1 до ${n}`);
nIterator: for (let i = 1; i <= n; i++) {
  let j = i - 1;
  while (j > 1) {
    if (i % j == 0) continue nIterator;
    j--;
  }
  console.log(i);
}
