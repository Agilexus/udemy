'use strict';

let numberOfFilms;

//Запуск першого питання і перевірка
function start() {
  numberOfFilms = +prompt('Скільки фільмів ви вже перегляули?', '');

  while (numberOfFilms == '' || numberOfFilms == null || isNaN(numberOfFilms)) {
    numberOfFilms = +prompt('Скільки фільмів ви вже перегляули?', '');
  }
}

start();

// Основний об‘єкт
const personalMovieDB = {
  'count': numberOfFilms,
  'movies': {},
  'actors': {},
  'genres': [],
  'privat': false
};

// #region перше рішення
// const a = prompt('Останній фільм, який ви дивились?', ''),
//       b = prompt('Як би ви його оцінили?', ''),
//       c = prompt('Останній фільм, який ви дивились?', ''),
//       d = prompt('Як би ви його оцінили?', '');

// personalMovieDB.movies[a] = b;
// personalMovieDB.movies[c] = d;
// #endregion
// #region не використовується
// Варіант цикла 1
// start: for (let i = 0; i < 2; i++) {
//   const q1 = prompt('Останній фільм, який ви дивились?', ''),
//         q2 = prompt('Як би ви його оцінили?', '');

//   if (q1 === null || q2 === null || q1.length < 1 || q2.length < 1 || q1.length > 50) {
//     --i;
//     continue start;
//   };

//   personalMovieDB.movies[q1] = q2; 
// }
// #endregion

// Цикл з питаннями і перевірками. Варіант №2
function rememberMyFilms() {
  for (let i = 0; i < 2; i++) {
    const q1 = prompt('Останній фільм, який ви дивились?', '').trim(),
          q2 = prompt('Як би ви його оцінили?', '').trim();
  
    if (q1 != null && q2 != null && q1 != '' && q2 != '' && q1.length < 50) {
      personalMovieDB.movies[q1] = q2; 
    } else {
      i--;
    }
  }
}

rememberMyFilms();

// Первірка рівня користувача
function detectPersonalLevel() {
  if (personalMovieDB.count > 0 && personalMovieDB.count < 10) {
    console.log('Переглянуто досить мало фільмів');
  } else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
    console.log('А ви класний глядача');
  } else if (personalMovieDB.count >= 30) {
    console.log('Да ви кіноман');
  } else {
    console.log('Ой, щось не так... Чи ви не дивились фільми?');
  }
}

detectPersonalLevel();

// Ввиводить основний об‘єкт в консоль
function showMyDB(hidden) {
  if (!hidden) {
    console.log(personalMovieDB);
  }
  // if (personalMovieDB['privat'] === false) {
  //   console.log(personalMovieDB);
  // }
}

showMyDB(personalMovieDB.privat);

// Додаємо жанри (+ я додав перевірки)
function writeYourGenres() {
  for (let i = 0; i < 3; i++) {
    let genre = prompt(`Ваш улюблений жанр під номером ${i+1}`, '');
    while (genre == '' || genre == null || !isNaN(+genre)) {
      genre = prompt(`Ваш улюблений жанр під номером ${i+1}`, '');
    }
    personalMovieDB.genres[i] = genre;
  }
}
writeYourGenres();

showMyDB(personalMovieDB.privat);