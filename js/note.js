'use strict'; //деректива, яка каже що ми працюємо в сучасному режимі де не працюють деякі неточності які були в старих стандартих js. Порада використовувати її завжди

// #region 23 – Цикл в циклі
/*
Щоб невиникала колізія, у ложеному циклі використовують замість і – j (негласний стандарт), потім k і так далі.

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
Потрібно використати мітку, це може бути будь яке слово, в прикладі "first:"
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
Таким чином за допомогою мітки, ми можемо вказати, що буде після пропуску чи зупинки
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