console.log(NaN || 2 || undefined); // 2
console.log( NaN || 2 || undefined ); // 2
console.log( NaN && 2 && undefined ); // Nan
console.log( 1 && 2 && 3 ); // 3
console.log( !1 && 2 || !3 ); // false
console.log( 25 || null && !3 ); //25
console.log( NaN || null || !3 || undefined || 5); // 5
console.log( NaN || null && !3 && undefined || 5); // 5
console.log( 5 === 5 && 3 > 1 || 5); // true

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

// Задача із зірочкою:
// 1. Заполните новый массив (result) числами из старого (arr). 
// Количество элементов в массиве можно получить как arr.length, 
// а к элементам обращаемся все так же: arr[0], arr[1] и тд.
// Должен получиться точно такой же массив

function firstTask() {
  // Значения массива менять нельзя, тут он проверяется автоматически именно на эти значения
  const arr = [3, 5, 8, 16, 20, 23, 50];
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i]);
  }
  console.log(result);
  
  // Не трогаем
  return result;
}

// 2. Измените данный массив так, чтобы все числа были увеличены в 2 раза, 
// а если попадается строка - то к ней было добавлено " - done".
// Для определения типа данных используйте typeof();
// Должно получиться: [ 10, 20, 'Shopping - done', 40, 'Homework - done' ]

function secondTask() {
  // Значения массива менять нельзя, тут он проверяется автоматически именно на эти значения
  const data = [5, 10, 'Shopping', 20, 'Homework'];

  // Пишем решение вот тут
  for (let i = 0; i < data.length; i++) {
    if (typeof(data[i]) === 'number') {
      data[i] += data[i];
    } else {
      data[i] += ' - done';
    }
  }
  console.log(data);
  
  // Не трогаем
  return data;
}


// 3. Разверните массив data наоборот при помощи цикла и запишите данные в массив result.
// Должно получиться: [ 'Homework', 20, 'Shopping', 10, 5 ]

function thirdTask() {
  // Значения массива менять нельзя, тут он проверяется автоматически именно на эти значения
  const data = [5, 10, 'Shopping', 20, 'Homework'];
  const result = [];

  // Пишем решение вот тут
  for (let i = 1; i <= data.length; i++) {
    result.push(data[data.length - i]);
  }
  console.log(result);
  
  
  // Не трогаем
  return result;
}