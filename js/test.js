

// Задание 2:

// Панграмма — это предложение, в котором каждая буква алфавита встречается хотя
// бы по одному разу по возможности без повторений. Например, предложение 
// «The quick brown fox jumps over the lazy dog» является панграммой, поскольку 
// в нем хотя бы один раз используются буквы от A до Z (регистр значения не 
// имеет).

// Напишите функцию isPangram, которая принимает в себя строку и возвращает 
// логическое значение. Если строка является панграммой - вернется true, если 
// нет - false.

// Пример:
// isPangram(«The quick brown fox jumps over the lazy dog») => true
// isPangram(«Hello world») => false

// Рішення:

// function isPangram(string) {
//   let a = string.toLowerCase().split(' '),
//       b = '';

//   a.forEach(item => {
//     b += item; 
//   });

//   a = Array.from(new Set(b));

//   return a.length >= 26;
// }

// Приклад вчителя №1
// function isPangram(string) {
//   string = string.toLowerCase();
//   return 'abcdefghijklmnopqrstuvwxyz'.split('').every( function(x) {
//     return string.indexOf(x) !== -1;
//   });

// Метод every() перевіряє, чи всі елементи масиву задовольняють певну умову.
// Приймає коллбек функцію з аргументами: currentValue, index, array.
// Повертає бульове значення.

// Таким чиному, ми зробили масив з алфавіту і перевірили кожну букву з кожной 
// буквой string.

// }


// Приклад вчителя №2

//

// Приклад вчителя №3

// 

  // /* Приклад вчителя №4

  // */

// Приклад вчителя №5

// 




