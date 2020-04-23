// При вычитании дат получаем миллисекунды!!!

let now = new Date();
console.log(now);
console.log(now.getTime());
console.log(+now); // === now.getTime()

// 0 соответствует 01.01.1970 UTC+0
let Jan01_1970 = new Date(0);
console.log(Jan01_1970);

// теперь добавим 24 часа и получим 02.01.1970 UTC+0
let Jan02_1970 = new Date(24 * 3600 * 1000);
console.log(Jan02_1970);
// Датам до 1 января 1970 будут соответствовать отрицательные таймстампы, например

// Таймштамп - количество миллисекунд, прошедших с начала 1970 года.
// Легковесное численное представление даты. Из таймстампа всегда можно получить
// дату с помощью new Date(timestamp) и преобразовать существующий объект Date в
// таймстамп, используя метод date.getTime() (см. ниже).

// Если аргумент всего один, и это строка, то из неё «прочитывается» дата.
// Алгоритм разбора – такой же, как в Date.parse.
let date = new Date("2017-01-26");
// Время не указано, поэтому оно ставится в полночь по Гринвичу и
// меняется в соответствии с часовым поясом места выполнения кода
// Так что в результате можно получить
// Thu Jan 26 2017 11:00:00 GMT+1100 (восточно-австралийское время)
// или
// Wed Jan 25 2017 16:00:00 GMT-0800 (тихоокеанское время)


// new Date(year, month, date, hours, minutes, seconds, ms)
// Создать объект Date с заданными компонентами в местном часовом поясе.
// Обязательны только первые два аргумента.

// Существуют методы получения года, месяца и т.д. из объекта Date:
// getFullYear() - Получить год (4 цифры)
// getMonth() - Получить месяц, от 0 до 11.
// getDate() - Получить день месяца, от 1 до 31, что несколько противоречит названию метода.
// getHours(), getMinutes(), getSeconds(), getMilliseconds() - Получить, соответственно, часы, минуты, секунды или миллисекунды.
// getDay() - Вернуть день недели от 0 (воскресенье) до 6 (суббота). Несмотря на то,
// что в ряде стран за первый день недели принят понедельник, в JavaScript начало недели приходится на воскресенье.

// Однако существуют и их UTC-варианты, возвращающие день, месяц, год для временной
// зоны UTC+0: getUTCFullYear(), getUTCMonth(), getUTCDay(). Для их использования
// требуется после "get" подставить "UTC".
// UTC+0 (лондонское время без перехода на летнее время)

// getTime() - Для заданной даты возвращает таймстамп – количество миллисекунд, прошедших с 1 января 1970 года UTC+0.
// getTimezoneOffset() - Возвращает разницу в минутах между местным часовым поясом и UTC:

// Следующие методы позволяют установить компоненты даты и времени://
// setFullYear(year, [month], [date])
// setMonth(month, [date])
// setDate(date)
// setHours(hour, [min], [sec], [ms])
// setMinutes(min, [sec], [ms])
// setSeconds(sec, [ms])
// setMilliseconds(ms)
// setTime(milliseconds) (устанавливает дату в виде целого количества миллисекунд, прошедших с 01.01.1970 UTC)
// У всех этих методов, кроме setTime(), есть UTC-вариант, например: setUTCHours().

// Автоисправление даты!
let date2 = new Date(2013, 0, 32); // 32 Jan 2013 ?!?
console.log(date2); // ...1st Feb 2013!

let date3 = new Date(2016, 1, 28);
date3.setDate(date3.getDate() + 2);
console.log(date3); // 1 Mar 2016

// -------------------------------------------------------------------------
let start = Date.now(); // начинаем отсчёт времени
// выполняем некоторые действия
for (let i = 0; i < 100000; i++) {
    let doSomething = i * i * i;
}
let end = Date.now(); // заканчиваем отсчёт времени
console.log(`Цикл отработал за ${end - start} миллисекунд`);

// --------------------------------------------------------------
// Для измерения времени экземпяр Date не нужен!!!
console.log(Date.now());

// --------------------------------------------------------------
// Бенчмаркинг - тестирование производительности функций, которая зависит от процессора.
// есть date1 и date2, какая функция быстрее вернёт разницу между ними в миллисекундах?
function diffSubtract(date1, date2) {
    return date2 - date1;
}

// или
function diffGetTime(date1, date2) {
    return date2.getTime() - date1.getTime();
}

function bench(f) {
    let date1 = new Date(0);
    let date2 = new Date();

    let start = Date.now();
    for (let i = 0; i < 100000; i++) f(date1, date2);
    return Date.now() - start;
}

let time1 = 0;
let time2 = 0;
// добавляем для "разогрева" перед основным циклом
bench(diffSubtract);
bench(diffGetTime);
// bench(upperSlice) и bench(upperLoop) поочерёдно запускаются 10 раз
for (let i = 0; i < 10; i++) {
    time1 += bench(diffSubtract);
    time2 += bench(diffGetTime);
}
// работает во много раз быстрее!!! Т.к. не происходит преобразования типов
console.log('Итоговое время diffSubtract: ' + bench(diffSubtract) + 'мс');
console.log('Итоговое время diffGetTime: ' + bench(diffGetTime) + 'мс');

// ----------------------------------------------------------
// Date.parse(str) считывает дату из строки и возвращает таймштамп, если неверно то NaN
// Формат строки должен быть следующим: YYYY-MM-DDTHH:mm:ss.sssZ, где://
// YYYY-MM-DD – это дата: год-месяц-день.
// Символ "T" используется в качестве разделителя.
// HH:mm:ss.sss – время: часы, минуты, секунды и миллисекунды.
// Необязательная часть 'Z' обозначает часовой пояс в формате +-hh:mm. Если указать просто букву Z, то получим UTC+0.
// Возможны и более короткие варианты, например, YYYY-MM-DD или YYYY-MM, или даже YYYY.

// Порой нам нужно измерить время с большей точностью.
// Собственными средствами JavaScript измерять время в микросекундах
// (одна миллионная секунды) нельзя, но в большинстве сред такая возможность есть.
// К примеру, в браузерах есть метод performance.now(), возвращающий количество
// миллисекунд с начала загрузки страницы с точностью до микросекунд (3 цифры после
// точки):

// ------------------------------------------------------------
let feb20 = new Date(2012, 1, 20, 3, 12);
console.log(feb20);

function getWeekDay(date) {
    let days = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
    return days[date.getDay()];
}

console.log(getWeekDay(now));

function getLocalDay(date) {
    let day = date.getDay();
    if (day == 0) day = 7;
    return day;
}

function getDateAgo(date, days) {
    let dateCopy = new Date(date);
    dateCopy.setDate(date.getDate() - days);
    return dateCopy.getDate();
}

console.log(getDateAgo(new Date(), 90));

function getLastDayOfMonth(year, month) {
    let date = new Date(year, month + 1, 0);
    return date.getDate();
}

console.log(getLastDayOfMonth(2012, 1));

function getSecondsToday() {
    let now = new Date();
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.round((now - today)/1000);
}

console.log(getSecondsToday());

function getSecondsToTomorrow() {
    let now = new Date();
    let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    return Math.round((tomorrow - now) / 1000);
}
console.log(getSecondsToTomorrow());

function formatDate(date) {
    let now = new Date();
    let diff = now - date;
    if (diff < 1000) {
        return 'Right now';
    }
    let sec = Math.floor(diff/1000);
    if (sec < 60) {
        return `${sec} seconds ago`;
    }
    let min = Math.floor(diff/60000);
    if (min < 60) {
        return `${min} minutes ago`;
    }
    let d = date;
    d = [
        '0'+d.getDate(),
        '0'+(d.getMonth()+1),
        ''+d.getFullYear(),
        '0'+d.getHours(),
        '0'+d.getSeconds()
    ].map(component => component.slice(-2)); // взять последние 2 цифры из каждой записи
    return d.slice(0,3).join('.') + ' ' + d.slice(3).join(':');
}
console.log( formatDate(new Date(new Date - 1)) ); // "прямо сейчас"

console.log( formatDate(new Date(new Date - 30 * 1000)) ); // "30 сек. назад"

console.log( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 мин. назад"

// вчерашняя дата вроде 31.12.2016, 20:00
console.log( formatDate(new Date(new Date - 86400 * 1000)) );
