let globalMessage = "мир!"; // глобальная переменная
let globalName = "Диман!"; // глобальная переменная
let animal = "пес"; // глобальная переменная
function showMessage() {
  let message = "Привет"; // локальная переменная
  globalName = "Брюс!"; // заменяем глобальную переменную, т.к. нет локальной с таким именем
  let animal = "кот"; // локальная переменная
  console.log(`${message} ${globalMessage}`);
  console.log(animal); // кот
}
// console.log(message); // message is not defined
console.log(globalName); // Диман!
showMessage();
console.log(animal); // пес
console.log(globalName); // Брюс!

function showMessage2(from, text = "значение аргумента по умолчанию") {
  // arguments: from and text, but function get only copy of arguments so that you can change values inside the function. Если аргумент не указан и задан по умолчанию, то значение будет undefined
  from = `**${from}**`;
  alert(`${from}: ${text}`);
}
showMessage2("Дима", "Как дела?");
showMessage2("Дима");

function sayHello() {
  alert("Hello!");
}
function showMessage3(from, text = sayHello()) {
  // выполнится sayHello() если не передано значение text
  alert(from, text);
}
function showMessage4(from, text = sayHello) {
  alert(from, text);
  text();
}
showMessage3("Аня"); // sayHello() выполнится первым, затем тело функции
showMessage4("Иван"); // sayHello() выполнится вторым

// В старых версиях JS можно встретить явную проверку на отсутствие параметров по умолчанию
function showMessage5(from, text) {
  if (text === undefined) {
    text = "текст отсутствует";
  }
  console.log(from, text);
}

// ВОЗВРАТ. Если функция не возвращает ничего или пустой return, то автоматически возвращается undefined! return; аналогичен return undefined;
// Никогда не переносите выражение из return на след. строку иначе оно не выполнится.
function sum(a, b) {
  return a + b; // после return код нечитается. Можно использовать без значения для мгновенного выхода из функции. Для этого поставьте скобки: return(можно писать с новой строки)
}
let result = sum(1, 2);
console.warn(result);

// checkPermission - плохое название функции если она будет выводить сообщение с текстом о доступе. Она должна только выполнять проверку и возвращать результат проверки.
