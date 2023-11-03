

//#region subtask 7
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
    return "Ошибка. Проверьте правильность введенного номера места";
  }

  if (seatNumber === 0 || seatNumber > 36) {
    return "Таких мест в вагоне не существует";
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
    result += " ";
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
  console.log(`First level: ${i}`)

  first: for (let j = 0; j < 3; j++) {
    console.log(`Second level: ${j}`)

    for (let k = 0; k < 3; k++) {
      if (k === 1) continue first;
      console.log(`Third level: ${k}`)
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
