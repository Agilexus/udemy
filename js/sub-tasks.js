// #region subtask 3
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
