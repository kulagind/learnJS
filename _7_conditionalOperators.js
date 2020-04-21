// if и ?
// преобразует выражение в скобках к логическому типу
let year = prompt("What year is now?", "");
if (year == 2020) {
  alert("Correct!");
} else {
  alert("Wrong!");
}

// ? - тернарный оператор
let XXIcentery = year > 1999 ? "yes" : "no";

// может использоваться несколько ? подряды
let centery =
  year > 1999
    ? "21 centery or later"
    : year > 1899
    ? "20 centery"
    : "erlier than 20 centery";
console.log(centery);

// #1
let a = prompt("a");
let b = prompt("b");
let result = a + b < 4 ? "мало" : "много";
alert(result);

// #2
let isDirector = confirm("Are you a director?");
let message = !isDirector ? "Привет" : "Здравствуйте!";
alert(message);

