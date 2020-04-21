let number = 1; // 1
alert(number); // для вывода преобразует в "1"
number = String(number); // "1"
number = Number(number); // 1

let age = Number("hello world"); // NaN
// !!!численные преобразования!!!
// undefined -> NaN
// null -> 0
// true/fale -> 1/0
// string -> 0(если пустая строка)/NaN

alert(1 + "2"); // "12"
alert(`1` + 2); // "12"

// !!!логическое преобразование!!!
// 0, "", null, undefined, NaN -> false
// остальное -> true
Boolean("0"); // -> true !!!!!!
Boolean(" "); // -> true !!!!!! Пробел тоже true

console.log("" + 1 + 0); // "10"
console.log("" - 1 + 0); // -1
console.log(true + false); // 1
console.log("2" * "3"); // 6
console.log(4 + 5 + "px"); // "9px"
console.log("$" + 5); // "$5"
console.log("4" - 2); // 2
console.log(7 / 0); // Infinity
console.log(" -9 " + 5); // " -9 5"
console.log(" -9 " - 5); // -14
console.log(null + 1); // 1
console.log(undefined + 1); // NaN
console.log(" \t \n" - 2); // -2
