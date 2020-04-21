let a = 2 + 2;
switch (
  a // при сравнении всегда используется строгое равенство (типы должны совпадать с типами кейсов)!
) {
  case 3:
    alert("3");
    break;
  case 4:
    alert("4");
    break; // если break нет, то будет выполняться до конца или следующего break
  case 5: // группировка кейсов для одного варианта, потому что отсутствует break
  case 6:
    alert("5 или 6");
    break;
  default:
    alert("кейсы не сработали");
}