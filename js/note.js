// 'use strict'; – деректива, яка каже що ми працюємо в сучасному режимі де не працюють деякі неточності які були в старих стандартих js. Порада використовувати її завжди

// #region 40 Замикання і лексичне середовище
// Замикання це функція яка запам‘ятовує свої зовнішні зміні і може отримати
// до них доступ. Щоб зрозуміти чому так відбувається потрібно засвоїти
// терміни: лексичне середовище і властивість Environment

// Лексичне середовище є не лише у функцій а у любого блоку кода

function createCounter() {
  let counter = 0;

  const myFunction = function() {
    counter = counter + 1;
    return counter;
  };

  return myFunction;
}

const increment = createCounter();
const c1 = increment();
const c2 = increment();
const c3 = increment();

console.log(c1, c2, c3); // результат: 1 2 3



// #endregion 

// #region 38 - 39
/*
Breakpoints - мітка яка допомагає зупиняти код в певному місці

Консоль розробника > Source
Щоб створити breakpoint просто клікаєм на потрібний рядок (наприклад
початковий рядок і кінцевий) і перезевантажуємо сторінку.

Також можна в самому файлі прописати debugger; і це створить свого
роду нативний брейкпоінт, який в браузері буде розпізнаватись.

  Function Declaration = коли функція задається у змінній

*/
// #endregion

// #region 36 ООП Об‘єктно орієнтоване програмування
/*
Коротко про різні підходи програмування:
Імперативне програмування: В основі цього підходу лежать інструкції, що
змінюють стан програми. Програміст визначає, які кроки потрібно виконати 
для досягнення конкретного результату.

Декларативне програмування: Програміст описує бажаний результат, а не 
послідовність дій для його отримання. Прикладами є SQL для роботи з базами
даних або React для розробки інтерфейсів.

Об'єктно-орієнтоване програмування (ООП): Програмування розглядається як 
маніпулювання об'єктами, які представляють реальні або абстрактні сутності, 
і мають власні дані та методи.

Функціональне програмування: Основний акцент робиться на функціях, які 
вважаються базовими блоками побудови програм. Підтримує ідеї неізменності 
даних та уникання побічних ефектів.

Процедурне програмування: Програмування структурується навколо процедур або 
функцій, які можуть бути викликані для виконання конкретних завдань.

Логічне програмування: Програмування базується на логіці і правилах. 
Примітний приклад - мова програмування Prolog.
----------------------------------------------------------------------------

Зв‘язуємо 2 об‘єкти:
  const soldier = {
    health: 400,
    armor:100
  }

  const john = {
    health: 100
  }

  Старий спосіб, щоб вказати зв‘язок який зараз не використовуєтсья:
  john.__proto__ = soldier; //depricated

  Тепер якщо console.log(john) - то ми отримаємо лише {health: 100}.
  Але разом з цим ми можемо console.log(john.armor) - і отримаємо 100,
  що показує нам що soldier є прототипом john.

  Реальний риклад, коли прототипи корисні:
    Створюємо прототип модального вікна, в якого є задані по замовчуванню
    ширина, висота, якийсь базовий функціонал (при кліку на хрестик, 
    закриваєтсья) і тд.
    Таким чином, ми після цього зможемо створювати нові вікна, в які зможемо
    прописувати їхні ширину, висоту і тд, але при цьомо зможемо використовувати
    ті значення, що були задані в прототипі, як значення по замовчуванню

  Зараз правильно використовувати:
  Object.create - створює об‘єкт з певним прототипом;
  Object.getPrototypeOf - отримує цей прототип;
  Object.setPrototypeOf - встановлює прототип

  На практиці це виглядає так:
    Якщо у нас вже є створений об‘єкти і потрібно йому назначити прототип:
      Object.setPrototypeOf(john, soldier) - перший аргумент: об‘єкт якому
              ми назачаємо прототип, а другий: прототип який ми назначаємо.
              Такий запис ідентичний устарілому: john.__proto__ = soldier;

    На практиці частіше ми знаємо, що прототипом john буде soldier, тому
    його назначають відразу при створені:
      const john = Object.create(soldier);


*/
// #endregion

// #region 35 Передача даних по ссилці і значенню, Spread оператор
/*
Приклад 1:
let a = 5,
    b = a;

b = b + 5; // в консолі буде b = 10 i a = 5.

Примітивні типи даних передаються по значенню. На прикладі, коли ми 
оголошували зміну b = а, то в неї фактично записалось значення а, в момент 
оголошення (5). 

Приклад 2:
const obj = {
  a: 5,
  b: 1
}

const copy = obg;
copy.a = 10; // В консолі буде copy.a = 10 i obj.a = 10

Коли ми працюємо з об‘єктами (об‘єкти, масиви, функції і тд.) передача
даних відбувається по ссилці і фактично копія об‘єкта не створюється.
Іншими словами коли ми записали const copy = obg - в copy  не записався новий
об‘єкт, а просто створилась ссилка на об‘єкт.

Щоб насправді копіювати об‘єкт можна використовувати:
  1. Цикл for in
    function copy (mainObj) {
      let objCopy = {};

      for (let key in mainObj) {
        objCopy[key] = mainObj[key];
      }

      return objCopy;
    }
    За допомогою такого цикл ми створимо справжню копію. 

    Але, якщо наш mainObj буде виглядати так:
      const numbers = {
        a: 5,
        b: 6,
        c: {
          x: 5,
          y: 7
        }
      }
    і ми створимо його копію за допомогою функції:
      const newNumbers = copy(numbers);

    а після цього спробуємо змінити значення x або y, то воно зміниться і в
    копії і в оригінальному об‘єкті "numbers.c". Все тому що таке копіювання,
    як ми використали в copy(), називається поверхневим. Так само спрацювалоб,
    якби numbers.c містив масив.
    
    Пізніше по курсу, розберемо, як створювати глибокі копії. 
    Тому тут приклади лише поверхневих копій.

  2. Копію за допомогою Object.assign('Перший об‘єкт (може бути {})', 'Об‘єкт, який ми додаємо'):
      const add = {
        a: 17,
        b, 20
      }
      const clone = Object.assign({}, add); // таким чином створюєтья поверхневе копіювання

Копія масива:
  const arr = [4, 3, 6, 7];
  const newArr = arr.slice(); // якщо не використовувати .slice, то буде посилання.

Способи, які прийшли в ES6 та ES8:
  Використовуєм спред оператор (ES6):
      cons video = [ 'youtube', 'vimeo'],
           blogs = ['wordpress', 'livejourmals', 'blogger'],
           internet = [...video, ...blogs, 'facebook'] // ... перед назвою масиву, розбирає масив на елементи. Відповідно в наш новий масив потрапляють окремі елементи з інших масивів.
      ще приклад:
        const array = ['a', 'b'];
        const newArray = [...array]; // поверхнева копія.

  Спред оператор для об‘єктів(ES9, хоча почав використовуватись раніше):
    sdfas 
      const q = {
        one: 1,
        two: 2
      };

      const newQ = {...q}; // поверхнева копія об‘єкта
*/
// #endregion

// #region Алгоритми:
// Книга "Грокаем алгоритмы".
// Приклади з книги написати на JS для тренування
// Перед співбесідой краще вивчити все це: https://web.archive.org/web/20221025084508/http://mathhelpplanet.com/static.php?p=javascript-algoritmy-poiska
// По ссилці вище в лівом сайдбарі є додаткові посилання по темі
// #endregion

// #region 33 Масиви і псевдомасиви
/*
console.dir() – дозволяє побачити всі властивості і методи 

const arr = [12, 2, 3, 16, 8];

arr.pop() - вирізає останій елемент в масиві
arr.push(10) - додає 10 в кінець масиву

shift() і unshift() - схожі на попередні але працюють з початкому масиву. 
Використовують рідко, бо вони впливають на весь масив (в усіх елементів
змінюється індекс)

Для перебору елементів в масиві можна використовувати звичайний for, або
for of (https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/for...of):
for (let value of arr) {
  console.log(value);
}

for of дозволяє перебрати всі масиво подобні сущності. Наприклад можна 
перебрати: рядок, псевдомасив, .map, .set або навіть всі елементи на сторінці

arr.forEach() - теж дозволяє перебрати елементи всередині масиву. 
Приймає callback функцію, яка буде застосовуватись до кожного елементу масиву.
Ця функція може приймати 3 аргументи: елемент масиву, порядковий номер (індекс),
і третім аргументом може бути сам масив (приклад запису функції: function(item, i, arr))
arr.forEach(function(item, i, arr) {
  console.log(`${i}: ${item} всередині масиву ${arr}`);
})

forEach() - дуже часто використовується.
але у for of є 1 вагома перевага, в ньому можна використовувати break і 
continue, які дозволяють зупинити виконання циклу, коли нам це потрібно.
В інших випадках forEach() зручніший.

Є ще кілька методів, які перебирають масив, але всі вони крім перебору, ще 
модифікують наш масив (.map, .every/some, .filter, .reduce - будуть пізніше по курсу).

Ще 3 корисні методи: 
.split() - розділяє строку по певному знаку і формує масив
.join() - обєднує масив в рядок і приймає аргумент який буде розділювати елементи приклад: ", "
.sort() - сортує по алфавітному порядку, але лише рядки. Приклад сортування 
          цифр: 12, 16, 2, 3, 8. Все тому що спочатку сортує по першому символу, 
          потім по другому і так далі (в перших 2-х елементів перша цифра 1, 
          тому вони перші).
          Але sort може приймати callback функцію, за допомогою якої, ми можемо
          самі вирішувати, як буде сортуватись масив.

          Функція яка досить часто зустрічається:
          function compareNum(a, b) {
            return a - b;
          }

          тепер якщо ми можоме:
          arr.sort(compareNum); і наші числа стануть в нормальну послідовність

          про те як і чому працює ця функція і чому все з нею сортується, розписано 
          тут: https://algolist.ru/sort/quick_sort.php

Псевдомасиви
Коли ми працюємо з елементами на сторінці, ми будемо отримувати
псевдомасиви. Фактично це об‘єкт структура якого співпадає зі
структурою масиву, але з важливою особливістю: в псевдомасивах 
немає методів (не forEach, не .push і тд).

Шпаргалка по масивам:
https://drive.google.com/file/d/17D4THU5-UJtzihybKVjSDHeX67pz3xLR/view
*/
// #endregion

// #region 32 О‘єкти і деструктуризація
/*
Багато інфи про об‘єкти: https://javascript.ru/tutorial/object/intro

Об‘єкт для прикладу:
const obg = {
  name: 'test',
  width: 1024,
  height: 1024,
  colors: {
    border: 'black',
    bg: 'red'
  }
};

Видалення з об‘єкти:
delete obg.name;

Перебір всіх властивостей об‘єкта (буде стільки циклів скільки властивостей у об‘єкта).
(уточнення for of не буде працювати з об‘єктом)
for (let key in obg) {
  if (typeof(obg[key]) === 'object') { // перебір в середині перебору
    for (let i in obg[key]) { // obg[key] так як у нас цикли всередині if то ми знаємо що індекст key тут буде той що нам потрібен
      console.log(`Властивості ${i} має значення ${obg[key][i]}`); // obg[key][i] - таким чином ми отримуємо доступ до об‘єкти в середині об‘єкта
    }
  } else {
    console.log(`Властивості ${key} має значення ${obg[key]}`); // дає доступ до значення властивості

  }
}

Детальніше про for in: https://learn.javascript.ru/object#forin

Інший спосіб перебору - за допомогою рекурсії. Це буде далі в уроках.

Щоб отримати доступ до об‘єкта всередині об‘єкта:
console.log(obg['colors']['borders']);

В об‘єкта немає властивості .length, тому досить часто використовують змінну 
в яку записують скільки разів пройшов перебір і таким чином дізнаються 
кількість властивостей. Але це не найкращий спосіб.

Методи
!!! Object.keys(var) – бере об‘єкт і на його основі створює масив із всіх ключів.
 
 ----------------------------------------------------
| цей метод можна доповнити, щоб отримати кількість: |
| Object.keys(var).length                            |
 ----------------------------------------------------

В середину об‘єкта можна додати функцію, яка буде називатись метод. Приклад:
const obg = {
  name: 'test',
  width: 1024,
  height: 1024,
  colors: {
    border: 'black',
    bg: 'red'
  }
  makeTest: function() {
    console.log('test');
  }
};
obg.makeTest();

Деструктуризація (https://learn.javascript.ru/destructuring-assignment)
const {border, bg} =  obg.colors; \\ таким чином у нас з‘євляється дві нові змінні border і bg

В JS все йде від об‘єкта. Наприклад у рядка є метод toUpperCase, а все тому 
що на базовому рівні рядок теж об‘єкт і отримує цей метод через цепочку 
прототипів. Все тому що JS об‘єкто орієнтована мова і всі сущності зводяться 
до об‘єктів. В цілому по термінології програмування JS можна назвати більш
прототипно орієнтованим

Ще інфа про властивості і конфігурації об‘єктів:
https://learn.javascript.ru/object-properties
*/
// #endregion

// #region 30 .trim
// Дозволяє прибрати зайві пробіли
// #endregion

// #region 28 Методи і властивості
/*
Методи це допоміжні функцій.
Властивості це допоможні значення.

Приклади властивостей String:
.length

Приклад методу String:
.toUpperCase()
.toLowerCase()
.indexOf('буква або слово яке шукаємо') - рузультат індекс початку того що шукали (-1 означає не знайшло) - Правильна назва "пошук підрядка"

3 методи які взіємодіють з рядками:
1: .slice(індекс початку, індекс кінця(індекс зазначається як a < b, а не а <= b))
вирізає частину рядка. Якщо буде лише перший аргумент, то рядок буде вирізатись 
до кінця. Можна використовувати мінусові аргументи.

2: .substring() - майже те саме що метод вище. Не дозволяє використовувати мінусові 
значення і дозволяє щоб перший аргумент був більший другого (так не потрібно робити).

3: .substr(індекс початку, довжина скільки нам потрібно вирізати символів)

-----------------------------
Для Number є вбудована бібліотека Math

Приклади властивостей Number:


Приклад методу Number:
  Math.round(число яке будемо округлювати до найблищого цілого) - приклади 5.5 = 6, 5.4 = 5
  parseInt(наш рядок в якому є цифри, які ми хочемо витягнути) – приклади '12.2px' = 12
  parseFloat(як і метод вище, але повертає з десятими) - приклад '12.2px' = 12.2



Методи і властивості для string: 
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String

Методи і властивості для Number:
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Number

*/
// #endregion

// #region 25, 26, 27 - Функції
/*
Замикання функції – це сама функція разом з усіма 
зовнішніми змінними, які їй доступні.

Стрілочна функція не має контекста визову, саме тому її 
частіше можна зустріти в обробниках подій

--------------------------------------

Хороша практика робити функція максимально незалежними, приклад:

const usdCurr = 28;

function convert(amount, curr) {
  return (curr * amount);
}

console.log(conver(500, usdCurr));

В прикладі вище, можна було зміну usdCurr записати відразу в 
функцію, але такий запис буде важче читати і функція буде менш 
універсальною (завжди буде залежати від змінної usdCurr).

Ще аргумент в користь запису функції, як в прикладі вище, те що 
у нас може бути багато таких змінних, як usdCurr, а значить у нас
вибір стає між створенням кількох функцій і однієї.

Цей принцип називається DRW - Don't repeat yourself
------------------

Якщо функція без return або return без значення, то така функція 
віддає undefined

Якщо в консоль написати console.log('22'); то ми отримаємо 22 та
undefind. А все тому що console.log це функція, без return.

Після return не можна ставити перенос рядка, тому що при виконанні
js може підставити ; і тоді наш код не спрацює. Приклад:

return
a + b;

*/
// #endregion

// #region 23 – Цикл в циклі
/*
Щоб невиникала колізія, у ложеному циклі використовують 
замість і – j (негласний стандарт), потім k і так далі.

Мій варіант вирішення:
let result = '';
const length = 7;

for (let i = 1; i < length; i++) {
  result += '*';
  console.log(result)
}

Варіант з уроку:
let result = '';
const length = 7;

for (let i = 1; i < length; i++) {
  for (let j = 0; j < i; j++) {
    result += '*';
  }
  result += '\n'; //перенос на новий рядок
}
------------------------------

Як зупинити вкладений цикл і продовжити основний?
Потрібно використати мітку, це може бути будь яке слово, 
в прикладі "first:"
first: for (let i = 0; i < 3; i++) {
  console.log(`First level: ${i}`)

  for (let j = 0; j < 3; j++) {
    console.log(`Second level: ${j}`)

    for (let k = 0; k < 3; k++) {
      if (k === 2) continue first;
      console.log(`Third level: ${k}`)
    }
  }
}
Таким чином за допомогою мітки, ми можемо вказати, 
що буде після пропуску чи зупинки
*/
// #endregion

// #region 22 - Цикли
/*
1. while - нічого нового

2. Спочатку заставляємо цикл щось зробити, а потім перевірити умову:
do {
  num++
}
while (num < 55);

3. for. 
Для того щоб примусово зупинити цикл, можна використати break:
  for (let i = 1; i < 8; i++) {
    if (i === 6) {
      break; 
    }
    console.log(i)
  }

Для того щоб пропустити крок є continue:
for (let i = 1; i < 8; i++) {
    if (i === 6) {
      continue; 
    }
    console.log(i)
  } // в такому випадку в консоль виведеться: 1 2 3 4 5 7 (6 пропускається)

*/
// #endregion

// #region 21 - Логічні оператори
/*
5 сутностей які завжди будуть false:
0
пустий рядок (якщо з пробілом, то вона вже не пуста і тому true)
null
undefined
NaN

Оператор && (і)
Приклад, 2 друга хоче гамбургер, а я хочу гамбургер і картоплю:
const hamburger = 2;
const fries = 1;

if (hamburger >= 3 && fries) { // fries нам не потрібно вказувати == 1, тому що якщо не одна з 5 сутностей вище, то значить це true і це більше 0 по замовчуванню.
  ...
}

Особливість
Якщо вивести умову в консоль, то вона видасть останнє значення, або те на якому перервалась перевірка:
console.log(1 && 0 && 2) – видасть 0, бо він входить в число сутностей які завжди false
console.log(1 && 2 && 5) - видасть 5, що буде загалом як true;
console.log(null && 0 && 1) - видасть null (далі перевірка не пішла);
console.log(0 && 1) – видасть 0.

З цього всього формується 2 правила:
Оператор && завжди віддає перше не правдиве значення, якщо воно є. На нього він запинається і наступні не перевіряє.
Якщо всі аргументи правдиві, то він віддає значення останнього аргументу.

-------------------------------------------------

Оператор || (або)
Приклад, щоб залишитись в закладі, нам потрібно щоб там було хоч щось.
const hamburger = 3;
const fries = 0;
const cpla = 0;

if (hamburger || cola || fries) { 
  Віддає перше правдиве значення. Як тільки оператор || зустрів true він зупиняється і не перевіряє всі інші.
  Якщо все не правда, то повертається останнє значення.
}
 
*/
// #endregion

// #region 20 - Умови
/*
const num = 50; // змінна для прикладу
 
Приклад запису умови за допомогою if:
if (a === a) {
  console.log('a')
} else if (b === b) {
  console.log('b')
} else {
  console.log('else')
}

Тернальний оператор:
(num === 50) 
? console.log('ok')
: console.log('error');
Тернальний тому що складається з 3-х аргументів: умова, ? правда, : не правда

Бінарний аргумент це наприклад + у виразі: 4 + 4

Унарний аргумент, це +"1";

Альтернатива if з багатьма умовами є switch:
switch (num) { // в дужки додаємо об‘єкт перевірки (те що ми будемо порівнювати), а самі перевірки будуть нижче
  case 49:
    console.log('wrong');
    break; // потрібно записувати після виконная кожної умови (обов‘язкова синтаксична конструкція), якщо не постаавити, то скрипт продовжить перебирати всі кейси, які будуть нижче навіть якщо умова буде виконана.
  case 100:
    console.log('wrong');
    break;
  case 50:
    console.log('done');
    break;
  default: \\ потрібен, якщо жодна з умов не була виконана
    console.log('wrong');
    break;
}

switch завжди перевіряє на сувору відповідальність, як і ===

*/
// #endregion

// #region 17 - Git на різних комп‘ютерах
/*
Копіюємо посилання з gitgub (https), потім в терміналі заходимо в потрібну папку cd ...
  git clone https://github.com/Agilexus/udemy.git it project_name – project_name це назва новой папки в яку все скопіюється з гіта

Щоб оновити дані з віддаленого репозиторію:
  git pull

Якщо спробувати оновити віддалений з компа 1, а потім з компа 2, то буде помилка, тому що репозиторій має новішу версію.
В таких випадках потрібно спрочату зробути git pull щоб відбувсі merge, задати повідомлення нашого коміту, натиснути 2 рази control + с, написати :wq і натиснути enter
Після цього можна перевірити git status і якщо все добре, то повторити git push

GIT IGNORE - файл з назвою .gitignore в середині якого зберегається список файлів і папок, які не будуть копіюватись на віддалений репозиторій
*/
// #endregion

// #region 16 - Git
// Документація по Git: https://git-scm.com/book/uk/v2
// Ще одна ссилка: https://githowto.com/uk

/*
Налаштування Git, після встановлення: brew install git
    git init - ініціалізуємо наш проект
    git config – можна налаштовувати, як global (застосовуються для комп‘ютера і відповідно для всіх нових проектів) так і local (якщо вони задані, то глобальні ігноруються).
        git config --local user.name "Oleksii S."
        git config --local user.email seleznyov25@gmail.com

------------------------------------------------------------

    Перший стан - файли просто створенні
    git status - показує поточий стан

    Другий стан - файли додані до відстежження змін
    git add -A – всі файли додаються в git для відстеження змін
        git add *.css або git add name.css - додає всі файли з певним роширенням або конкретний файл

    Третій стан - commit
    git commit -a -m"message" – (-a) означає всі файли і можна конкртні вказати, (-m""") обов‘язкове повідомлення пищеться без пробілів

    Тепер у нас створення контрольна точка. Тепер коли ми щось змінемо то статус покаже "modified: file_name"

    ------------------------------------------------------------

    git log - подивитись всі коміти, ким і коли вони були зроблені

    Github
    Якщо у нас вже виконані команди вище, то:
    1. git remote add origin https://github.com/Agilexus/udemy.git
    2. git branch -M main
    3. git push -u origin main
*/
// #endregion

// #region 15 - оператори
// інкримент var++ (постфіксна форма) або ++var (префіксна форма). Декремент відповідно --var і var--
// let incr = 10,
//     decr = 10;

// console.log(incr++); // виведе 10, тому що спочатку виводить, а потіми додає.

// % - залишок ділення двох чисел
// console.log(5%2); //результат буде 1. Взяли 5 і розділили її на 2 стільки раз скільки можливо і після цього відобразили залишок.

// = це знак присвоювання
// == це не суворе порівняння. Можна порівняти number і string
// === це суворе порівння, тобто 4 === "4" буде false

// && це суворе виконання умов (і)
// || це додаткові умови (або)

// Таблиця порівняння операторів: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table
// Побітові оператори - важка тема: https://learn.javascript.ru/bitwise-operators
// #endregion

// #region 13 - спілкування з користувачем
//alert('Hello');

//const result = confirm('Are you here?'); // алерт з питанням і 2 кнопками "Ок" і "Відміна". В таку змінну записується відповідь користувача true or false

// const answer = prompt('Вам є 18?', ''); // пусті '' потрібні щоб ми могли підставити якиусь дефолтну відповідь. Крім того завжди потрібно залишати хочаб пусті, для інтернет експлорера 
// console.log(typeof(answer)); // показує тип данних
// для того щоб промт видав числове значення можна записати так: +prompt('...');

// const answers = [];
// answers[0] = prompt('Ваше ім‘я?');
// answers[1] = prompt('Прізвище?');
// answers[2] = prompt('Вік?');

// document.write(answers);
// промпт записує string в змінну. document.write - переписує всю інформацію на сторінці тому в реальності не використовується (і він є застарілим).
// #endregion