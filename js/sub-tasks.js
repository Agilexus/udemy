
// #region subtask 15
/*
Задание:
У вас есть объект с данными о ресторане. Начинающий разработчик 
создал несколько функций, которые работают неправильно и он не может 
понять почему. Нужно исправить функции так, чтобы они давали всегда 
правильный результат.
*/

const restorantData = {
  menu: [
      {
          name: 'Salad Caesar',
          price: '14$'
      },
      {
          name: 'Pizza Diavola',
          price: '9$'
      },
      {
          name: 'Beefsteak',
          price: '17$'
      },
      {
          name: 'Napoleon',
          price: '7$'
      }
  ],

  waitors: [
      {name: 'Alice', age: 22}, {name: 'John', age: 24}
  ],

  averageLunchPrice: '20$',
  openNow: true
};

// 1) Функция isOpen не хочет правильно работать. Что мы уже не пробовали 
// подставлять в неё - результат все время неправильный. Необходимо найти 
// причины и исправить.
function isOpen(prop) { 
  let answer = '';
  prop ? answer = 'Открыто' : answer = 'Закрыто';

  return answer;
}
console.log(isOpen(restorantData.openNow));

// 2) Функция isAverageLunchPriceTrue должна брать цены двух любых блюд 
// из меню, складывать их и сравнивать с средним чеком (averageLunchPrice).

// Сейчас функция работает, но постоянно выдает неправильный результат. 
// Ведь из представленного меню сумма двух любых цен всегда будет больше 20. 
// Необходимо найти причину и исправить.
function isAverageLunchPriceTrue(fDish, sDish, average) {
  if (+fDish.price.slice(0, -1) + (+sDish.price.slice(0, -1)) < +average.slice(0, -1)) {
      return 'Цена ниже средней';
  } else {
      return 'Цена выше средней';
  }
}
console.log(isAverageLunchPriceTrue(restorantData.menu[0], restorantData.menu[1], restorantData.averageLunchPrice));

// 3) Функция transferWaitors создана для того, чтобы копировать шаблон 
// данных и передавать их в другой ресторан. Конечно, в другом ресторане 
// будут другие блюда, другие официанты и тп. Сейчас эта функция только в 
// начале разработки и должна менять данные про официантов.

// Но в нынешнем виде мы обнаружили, что после её запуска не только копия 
// данных содержит новых официантов, но и основные данные! В restorantData 
// сотрудник Alice исчезает и заменяется Mike! Необходимо найти причину и 
// немедленно исправить, чтобы данные были разделены.

// P.S. Может показаться сложным, но задача решается очень просто, если вы 
// помните один принцип :)
function transferWaitors(data) {
  const copy = Object.assign({}, data);

  // Нам просто нужно менять весь массив данных,
  // а не лезть напрямую менять каждого из сотрудников
  // Так как это верхний уровень объекта, то значение 
  // будет меняться только у копии

  //copy.waitors[0] = {name: 'Mike', age: 32}; - оригінальний код
  copy.waitors = [{name: 'Mike', age: 32}];

  return copy;
}

transferWaitors(restorantData);

// #endregion

// #region задачки із співбесід

// Какое будет выведено значение: 
let x = 5; alert( x++ ); // 5 тому що спочатку виводить значення, а 
//                          потім його плюсує.
//                          Для того щоб отримати 6, має бути запис в 
//                          префіксній формі: let x = 5; alert( ++x );

// Чему равно такое выражение: 
[ ] + false - null + true // якщо ми додаємо щось до [] то квадратні 
//                           дужки перетворються в пустий рядок ''.
//                           Якщо ми спробуємо відняти null, то отримаємо 
//                           NaN. Відповідно після додавання true вже нічого 
//                           не зміниться. 

// Что выведет этот код: 
let y = 1; 
let z = y = 2; 
alert(x); // 2 - так як число у нас примітивний тип даних, то він 
//           передається просто по значенню. Тому просто читаємо 
//           справа на ліво. Присвоюємо 2 ігрику, і потім нове 
//           значення присвоюємо z. Це послідовне присвоювання


// Чему равна сумма 
[ ] + 1 + 2 // '12'

// Что выведет этот код: 
alert( "1"[0] ) // 1 - до рядка можна звернутись по індексу і 
//                 тут у нас лише 0-й індекс, який і виводиться

// Чему равно 
2 && 1 && null && 0 && undefined // null, тому що && запинається на false

// Есть ли разница между выражениями? 
!!( a && b ) и (a && b) // !! (саме 2 знаки) перетворюють вираз в бульове значення

// Что выведет этот код: 
alert( null || 2 && 3 || 4 ); // у && більший пріорітет, а він в даному випадку 
//                               віддає останній true - або в даному випадку 3.
//                               А так як || запинається на першій правді, то 
//                               null пропускається і віддається 3.

// Правда ли что a == b: false - два масива завжди різні, але при порівнянні 
// окремих елементів, то елементи можуть дорівнювати один одному.
a = [1, 2, 3]; 
b = [1, 2, 3]; 


// Что выведет этот код: 
alert( +"Infinity" ); //Infinity тому що унарний + додається до НЕ числа. Тип данний "число".
// при цьому якщо унарний плюс додати до NaN ми отримаємо NaN.

// Верно ли сравнение:
"Ёжик" > "яблоко" // false, рядки порівнюються посимвольно, відповідно false 
//                   отримуємо після першого символу. Порівняння по UNICODE

// Чему равно 
0 || "" || 2 || undefined || true || false // 2

// #endregion

// #region subtask 14
const students = ['Peter', 'Andrew', 'Ann', 'Mark', 'Josh', 'Sandra', 'Cris', 'Bernard', 'Takesi'];

function sortStudentsByGroups(arr) {
  arr.sort();
  let teams = [];

  for (let i = 0; i < arr.length; i += 3) {
    teams[teams.length] = arr.slice(i, i+3);
  }
  
  if (teams[teams.length - 1].length < 3) {
    const lastEl = teams.pop();
    teams[teams.length] = 'Оставшиеся студенты:';

    for (let i = 0; i < lastEl.length; i++) {
      teams[teams.length - 1] += ` ${lastEl[i]}`;
      
      if (lastEl.length - 1 !== i) {
        teams[teams.length - 1] += ',';
      }
    } 
  } else {
      teams[teams.length] = 'Оставшиеся студенты: -';
    }
  console.log(teams);
  return teams;
}

// Варіант вчителя:
// function sortStudentsByGroupsByTeacher(arr) {
//   arr.sort();
//   const a = [], b = [], c = [], rest = [];

//   for (let i = 0; i < arr.length; i++) {
//     if (i < 3) {
//       a.push(arr[i]);
//     } else if (i < 6) {
//       b.push(arr[i]);
//     } else if (i < 9) {
//       c.push(arr[i]);
//     } else {
//       rest.push(arr[i]);
//     }
//   }
//   console.log([a, b, c, `Оставшиеся студенты: ${rest.length === 0 ? '-' : rest.join(', ')}`]);
//   return [a, b, c, `Оставшиеся студенты: ${rest.length === 0 ? '-' : rest.join(', ')}`];
// }
// sortStudentsByGroupsByTeacher(students);

sortStudentsByGroups(students);
// #endregion

// #region subtask 13
const shoppingMallData = {
  shops: [
      {
          width: 10,
          length: 5
      },
      {
          width: 15,
          length: 7
      },
      {
          width: 20,
          length: 5
      },
      {
          width: 8,
          length: 10
      }
  ],
  height: 5,
  moneyPer1m3: 30,
  budget: 50000
};

function isBudgetEnough(data) {
  let volum = [],
      sumVolum = 0;

  data.shops.forEach((obj, i) => {
    volum[i] = obj['width'] * obj['length'] * data.height;
    sumVolum += volum[i];
  });

  if(sumVolum * data.moneyPer1m3 > data.budget) {
    console.log('Бюджета недостаточно');
    return 'Бюджета недостаточно';
  } else {
    console.log('Бюджета достаточно');
    return 'Бюджета достаточно';
  }
}
isBudgetEnough(shoppingMallData);
// #endregion

// #region subtask 12
// Задача с собеседований. Напишите функцию reverse, которая принимает
// в себя строку и возвращает эту строку в обратном порядке.

// Пример:
// const someString = 'This is some strange string';
// reverse(someString) => 'gnirts egnarts emos si sihT'

// Функцию можно применить к любой строке. Если в функцию приходит не строка - 
// вернуть сообщение "Ошибка!"
const someString = 'This is some strange string';

function reverse(str) {
  if (typeof(str) !== 'string') {return 'Ошибка!';}

  // Рішення вчителя
  // return str.split('').revese().join('');

  let revers = '';

  for (let i = str.length-1; i >= 0; i--) {
    revers += str[i];
  }

  return revers;
  

}
console.log(reverse(someString));

// Задача 2
// Представьте такую реальную ситуацию. У вас есть банкомат, который выдает деньги 
// из двух разных банков в разных валютах. Один банк основной с базовыми валютами, 
// второй дополнительный с прочими валютами:

// const baseCurrencies = ['USD', 'EUR'];
// const additionalCurrencies = ['UAH', 'RUB', 'CNY'];
// Вам нужно создать главную функцию банкомата availableCurr, которая принимает два 
// аргумента: первый - это массив со всеми доступными валютами из двух банков сразу 
// (сейчас представим, что они не могут повторяться), второй - необязательный аргумент, 
// который указывает ту валюту, которая сейчас закончилась в банкомате. Если массив в 
// первом аргументе пустой - то функция возвращает строку 'Нет доступных валют'. 
// Функция возвращает строку в нужном виде.

// Пример:
// availableCurr(['UAH', 'RUB', 'CNY'], 'CNY')
// Вернет строку:

// Доступные валюты:
// UAH
// RUB

// Заметьте:
// - CNY (юань) исчез из списка валют, значит такая валюта закончилась

// - После валюты: стоит перенос строки \n, и после каждой валюты тоже. 
// Это важно для тестов

// - Данные для первого аргумента должны приходить сразу из двух банков, 
// причем сначала baseCurrencies, потом additionalCurrencies по порядку
const baseCurrencies = ['USD', 'EUR'];
const additionalCurrencies = ['UAH', 'RUB', 'CNY'];

function availableCurr(arr, missingCurr) {
  let str = '';

  arr.length === 0 
    ? str += 'Нет доступных валют'
    : str += 'Доступные валюты:\n';
  
  arr.forEach((el, index) => {
    if (el !== missingCurr) {
      str += `${el}\n`;
    }
  });

    // for (let i = 0; i < arr.length; i++) {
    //   if (arr[i] === missingCurr) {
    //     continue;
    //   }
    //   str += `${arr[i]}\n`;
    // }

  return str;
}
console.log(availableCurr([...baseCurrencies, ...additionalCurrencies], 'EUR'));

// #endregion

// #region subtask 11
const family = ['Peter', 'Ann', 'Alex', 'Linda'];

function showFamily(arr) {
    if (arr.length < 1) {
      return 'Семья пуста';
    } else {
      let str = 'Семья состоит из: ';

      for (let i = 0; i < arr.length; i++) {
        str += arr[i];
        if (i !== arr.length - 1) {
          str += ' ';
        }
      }

      return str;
    }
}
console.log(showFamily(family));

const favoriteCities = ['liSBon', 'ROME', 'miLan', 'Dublin'];

function standardizeStrings(arr) {
  arr.forEach(function(item, i, arr) {
    console.log(item.toLowerCase());
  });
}
standardizeStrings(favoriteCities);

// Задачи:
// 1) Напишите функцию showFamily, которая будет принимать в себя массив строк 
// и возвращать сообщение в нужном формате.

// showFamily(family)  => 'Семья состоит из: Peter Ann Alex Linda'

// Имена подставляются автоматически из массива. Если массив пустой, то выводится 
// сообщение 'Семья пуста'

// 2) напишите функцию standardizeStrings, которая будет принимать в себя массив
// строк и будет выводить в консоль эти строки в нижнем регистре.

// Пример:
// standardizeStrings(favoriteCities)  выведет в консоль

// lisbon
// rome
// milan
// dublin
// Это частая задача в реальности, так как от пользователя нам могут прийти ответы в 
// самых разных форматах. В том числе и с разными буквами :) Поэтому нам нужно привести 
// строки в один формат для правильной работы.

// #endregion

// #region subtask 10
const personalPlanPeter = {
  name: "Peter",
  age: "29",
  skills: {
      languages: ['ru', 'eng'],
      programmingLangs: {
          js: '20%',
          php: '10%'
      },
      exp: '1 month'
  },

  showAgeAndLangs: function(plan) {
    let {age, skills: {languages}} = plan;
    let str = '';

    for (let i = 0; i < languages.length; i++) {
      str += languages[i];
      if (i !== languages.length - 1) {
        str += ' ';
      }
    }
    // #region Варіант вчителя
    // let str = `Мне ${age} и я владею языками: `;
    //
    //languages.forEach(function(lang) {
    //  str += `${lang.toUpperCase()} `;
    //});
    //
    // return str;
    // #endregion
    
    return `Мне ${age} и я владею языками: ${str.toUpperCase()}`;
  }
};
console.log(personalPlanPeter.showAgeAndLangs(personalPlanPeter));

function showExperience(plan) {
  let {skills: {exp}} = plan;

  // Варіант вчителя
  // const {exp} = plan.skills;
  
  return exp;
}
console.log(showExperience(personalPlanPeter));

function showProgrammingLangs(plan) {
  let result = '';
  let {skills: {programmingLangs}} = plan;

  for (let key in programmingLangs) {
    result += `Язык ${key} изучен на ${programmingLangs[key]}`;
    if (typeof(key) === 'string') {
      result += '\n';
    }
  }

  return result;
}
console.log(showProgrammingLangs(personalPlanPeter));

// #endregion

// #region subtusk 9** Фібоначі
function fib(numb) {
  if (typeof(numb) !== 'number' || numb <= 0 || !Number.isInteger(numb)) {
    return '';
  }

  const arr = [];
  let result = '';

  for (let i = 0; i < numb; i++) {
    if (arr.length === 0) {
      arr[i] = 0;
   } else if(arr[i-1] === 0) {
      arr[i] = 1;
    } else {
      arr[i] = arr[i-2] + arr[i-1];
    }
  }

for (let i = 0; i < arr.length; i++) {
  result += arr[i];
  if (arr.length - 1 !== i) result += ' ';
}

  return result;
}

console.log(fib(3));
console.log(fib(7));
console.log(fib('7'));
console.log(fib(1));
console.log(fib(0));

// Рішення через рекурсію (без перевірок аргументу)
// function fib(n) {
//   return n <= 1 ? n : fib(n - 1) + fib (n - 2);
// }

// Рішення вчителя
// function fib(numb) {
//   if (typeof(numb) !== 'number' || numb <= 0 || !Number.isInteger(numb)) {
//     return '';
//   }

//   let result = '',
//       first = 0,
//       second = 1;
  
//   for (let i = 0; i < numb; i++) {
//     if (i + 1 === numb) {
//       result += `${first}`;
//     } else {
//       result += `${first} `;
//     }

//     let third = first + second; // зберігається поточне значення first
//     first = second;
//     second = third; // відповідно тут, third не розраховується, а використовує значення ,яке в нього записане в момент оголошення.
//   }

//   return result; 
// }
console.log(fib(10));
// #endregion

// #region subtask 8
function getTimeFromMinutes(min) {
  if (typeof(min) !== 'number' || min < 0 || min > 600 || !Number.isInteger(min)) {
    return 'Ошибка, проверьте данные';
  }

  const hour = Math.floor(min / 60),
      newMin = min - (Math.floor(min / 60) * 60);

  let type = '';
  
  // if (hour == 0) {
  //   type = 'часов';
  // } else if (hour == 1) {
  //   type = 'час';
  // } else if (hour < 5) {
  //   type = 'часа';
  // }

  // Варіант вчителя із switch
  switch (hour) {
    // Можна без цієї умови:
    // case 0:
    //   type = 'часов';
    //   break;
    case 1:
      type = 'час';
      break;
    case 2:
    case 3:
    case 4:
      type = 'часа';
      break;
    default:
      type = 'часов';
  }

  return `Это ${hour} ${type} и ${newMin} минут`;
}
console.log(getTimeFromMinutes(150));
console.log(getTimeFromMinutes(50));
console.log(getTimeFromMinutes(0));
console.log(getTimeFromMinutes(-1));

//Task 2
function findMaxNumber(n1, n2, n3, n4) {
  const arr = [n1, n2, n3, n4];

  for (let i = 0; i < arr.length; i++) {
    if (typeof(arr[i]) !== 'number') {
      return 0;
    }
  }

  return Math.max(...arr); // за допомогою оператора ... розпаковується масив і всі елементи стають аргументами
}

// Варіант вчителя
// function findMaxNumber(a, b, c, d) {
//   if (typeof(a) !== 'number'||
//       typeof(b) !== 'number' ||
//       typeof(c) !== 'number' ||
//       typeof(d) !== 'number') {
//         return 0;
//   } else {
//     return Math.max(a, b, c, d);
//   }
  

// }


console.log(findMaxNumber(1, 5, 6.6, 8));
console.log(findMaxNumber(1, 5, '6', '10'));
// #endregion

// #region subtask 7
// Мій варіант
// function calculateVolumeAndArea(width) {
//   let volum = '',
//       fullArea = '';

//   if (!isNaN(+width) && width > 0 && Number.isInteger(width)) {
//     volum = width * width * width;
//     fullArea = width * width * 6;
    
//     return `Объем куба: ${volum}, площадь всей поверхности: ${fullArea}`;
//   }

//   return 'При вычислении произошла ошибка';
// }

// Варіант вчителя
function calculateVolumeAndArea(length) {
  if (typeof(length) !== 'number' || length < 0 || !Number.isInteger(length)) {
    return 'При вычислении произошла ошибка';
  }

  let volume = length * length * length,
      area = 6 * (length * length);
  
  return `Объем куба: ${volume}, площадь всей поверхности: ${area}`;
}

console.log(calculateVolumeAndArea(5));
console.log(calculateVolumeAndArea(15));
console.log(calculateVolumeAndArea(15.5));
console.log(calculateVolumeAndArea('15'));
console.log(calculateVolumeAndArea(-15));

// --------------------------
// Мій варіант:
// function getCoupeNumber(place) {
//   const wagon = {
//     1: [1, 2, 3, 4],
//     2: [5, 6, 7, 8],
//     3: [9, 10, 11, 12],
//     4: [13, 14, 15, 16],
//     5: [17, 18, 19, 20],
//     6: [21, 22, 23, 24],
//     7: [25, 26, 27, 29],
//     8: [29, 30, 31, 32],
//     9: [33, 34, 35, 36],
//   };

//   if (!isNaN(+place) && place >= 0 && Number.isInteger(place)) {

//     for (let i = 1; i <= 9; i++) {

//       for (let j = 0; j < wagon[i].length; j++) {
//         if (wagon[i].includes(place)) {
//           return i;
//         }
//       }
//     }

//     return 'Таких мест в вагоне не существует';
//   }
    
//   return 'Ошибка. Проверьте правильность введенного номера места';
// }

//Рішення ChatGPT:
// function getCoupeNumber(place) {
//   if (!isNaN(+place) && Number.isInteger(place) && place >= 1 && place <= 36) {
//     return Math.ceil(place / 4);
//   } else if (place > 36 || place == 0) {
//     return 'Такого купе не існує';
//   }

//   return 'Помилка. Перевірте правильність введеного номера місця.';
// }

//Рішення вчителя
function getCoupeNumber(seatNumber) {
  if (typeof(seatNumber) !== 'number' || seatNumber < 0 || !Number.isInteger(seatNumber)) {
    return 'Ошибка. Проверьте правильность введенного номера места';
  }

  if (seatNumber === 0 || seatNumber > 36) {
    return 'Таких мест в вагоне не существует';
  }

  return Math.ceil(seatNumber / 4);
}

// console.log(Math.ceil(0 / 4));
console.log(getCoupeNumber(33)); //9
console.log(getCoupeNumber(7)); // 2
console.log(getCoupeNumber(300)); // Такого купе не існує
console.log(getCoupeNumber(0)); // Такого купе не існує
console.log(getCoupeNumber(7.7)); // Помилка. Перевірте правильність введеного номера місця.
console.log(getCoupeNumber(-10)); // Помилка. Перевірте правильність введеного номера місця.
console.log(getCoupeNumber('Hello')); // Помилка. Перевірте правильність введеного номера місця.
// #endregion

// #region subtask 6
// Место для второй задачи
function returnNeighboringNumbers(num) {
  const result = [num - 1, num, num + 1];
  return result;
}
console.log(returnNeighboringNumbers(5));

// -------------------------------------------------
// Место для третьей задачи
function getMyMathResult(a, b) {
  let result = '';

  if (typeof(b) != 'number' || b <= 0) {
    result += a;
    return +result;
  }

  for (let i = 1; i <= b; i++) {
    result += a * i;
    if (i != b) {
      result += '---';
    } 
  }

  return result;
}
console.log(getMyMathResult(7, 0));

// 2-й варіант вирішення 3-й задачи
function getTeacherMathResult(a, b) {
  if (typeof(b) !== 'number' || b <= 0) {
    return a;
  }

  let result = '';

  for (let i = 1; i <= b; i++) {
    if (i === b) {
      result += `${a * i}`;
    } else {
      result += `${a * i}---`;
    } 
  }

  return result;
}
console.log(getTeacherMathResult(4, 0));
// -------------------------------------------
// #endregion

// #region subtask 2**

// Задача із зірочкою:
// 1. Заполните новый массив (result) числами из старого (arr). 
// Количество элементов в массиве можно получить как arr.length, 
// а к элементам обращаемся все так же: arr[0], arr[1] и тд.
// Должен получиться точно такой же массив

function firstTask() {
  const arr = [3, 5, 8, 16, 20, 23, 50];
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i]);
    // resut[i] = arr[i]; - другий варіант запису
  }

  console.log(result);
  return result;
}

// 2. Измените данный массив так, чтобы все числа были увеличены в 2 раза, 
// а если попадается строка - то к ней было добавлено " - done".
// Для определения типа данных используйте typeof();
// Должно получиться: [ 10, 20, 'Shopping - done', 40, 'Homework - done' ]

function secondTask() {
  const data = [5, 10, 'Shopping', 20, 'Homework'];

 
  for (let i = 0; i < data.length; i++) {
    if (typeof(data[i]) === 'number') {
      data[i] += data[i];
    } else if (typeof(data[i]) === 'string') {
      data[i] += ' - done';
      // data[i] = `$data[i] - done`; - другий варіант запису
    }
  }
  console.log(data);
  return data;
}


// 3. Разверните массив data наоборот при помощи цикла и запишите данные в массив result.
// Должно получиться: [ 'Homework', 20, 'Shopping', 10, 5 ]

function thirdTask() {
  const data = [5, 10, 'Shopping', 20, 'Homework'];
  const result = [];

  for (let i = 1; i <= data.length; i++) {
    result.push(data[data.length - i]);
    // result[i-1] = data[data.length - i] - Другий варіант запису
  }

  console.log(result);
  return result;
}

// -------------------

const lines = 5;
let result = '';

for (let i = 0; i <= lines; i++) {
  for (let j = 5; j > i; j--) {
    result += ' ';
  }
  for (let k = 0; k <= i * 2; k += 2) {
    result += '*';
    if (k === 0) continue;
    result += '*';
  }
  result += '\n';
}

// Варіант 2:
for (let i = 0; i <= lines; i++) {
  for (let j = 0; j < lines - i; j++) {
    result += ' ';
  }
  for (let j = 0; j < 2 * i + 1; j += 2) {
    result += '*';
  }
  result += '\n';
}

console.log(result);

// #endregion

// #region example
for (let i = 0; i < 3; i++) {
  console.log(`First level: ${i}`);

  first: for (let j = 0; j < 3; j++) {
    console.log(`Second level: ${j}`);

    for (let k = 0; k < 3; k++) {
      if (k === 1) continue first;
      console.log(`Third level: ${k}`);
    }
  }
}
// #endregion

// #region subtask 1
console.log(NaN || 2 || undefined); // 2
console.log( NaN || 2 || undefined ); // 2
console.log( NaN && 2 && undefined ); // Nan
console.log( 1 && 2 && 3 ); // 3
console.log( !1 && 2 || !3 ); // false
console.log( 25 || null && !3 ); //25
console.log( NaN || null || !3 || undefined || 5); // 5
console.log( NaN || null && !3 && undefined || 5); // 5
console.log( 5 === 5 && 3 > 1 || 5); // true
// #endregion
