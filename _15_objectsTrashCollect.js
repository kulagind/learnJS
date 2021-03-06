// все объекты занимают память
// принцип "достижимости" - все что достижимо и использяется - находится в памяти
// сборщик мусора удаляет недостижимые объекты (у которых нет входящих ссылок)

// сборка мусора выполняется автоматически, мы не можем ускорить или предотвратить ее

// КОРНИ (достижимые значения)
// - Локальные переменные и параметры текущей функции.
// - Переменные и параметры других функций в текущей цепочке вложенных вызовов.
// - Глобальные переменные.
// - (некоторые другие внутренние значения)

// другое считается достижимым, если оно доступно из корня по ссылке или по цепочке ссылок

let obj = {
    name: 'john'
} // глобальная ссылка на объект в памяти.
obj = null; // переменная сохранилась, но сам объект в памяти недостижим и удален!

//Основной алгоритм сборки мусора – «алгоритм пометок» (англ. «mark-and-sweep»).
//
// Согласно этому алгоритму, сборщик мусора регулярно выполняет следующие шаги:
//
// - Сборщик мусора «помечает» (запоминает) все корневые объекты.
// - Затем он идёт по их ссылкам и помечает все найденные объекты.
// - Затем он идёт по ссылкам помеченных объектов и помечает объекты,
// на которые есть ссылка от них. Все объекты запоминаются,
// чтобы в будущем не посещать один и тот же объект дважды.
// - …И так далее, пока не будут посещены все ссылки (достижимые от корней).
// - Все непомеченные объекты удаляются.
