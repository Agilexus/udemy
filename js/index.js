

// #region Practice 1
const numberOfFilms = +prompt('Скільки фільмів ви вже перегляули?', '');

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

// Варіант цикла 2
for (let i = 0; i < 2; i++) {
  const q1 = prompt('Останній фільм, який ви дивились?', ''),
        q2 = prompt('Як би ви його оцінили?', '');

  if (q1 != null && q2 != null && q1 != '' && q2 != '' && q1.length < 50) {
    personalMovieDB.movies[q1] = q2; 
  } else {
    i--;
  }
}


if (personalMovieDB.count > 0 && personalMovieDB.count < 10) {
  console.log('Переглянуто досить мало фільмів');
} else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
  console.log('А ви класний глядача');
} else if (personalMovieDB.count >= 30) {
  console.log('Да ви кіноман');
} else {
  console.log('Ой, щось не так... Чи ви не дивились фільми?');
}

console.log(personalMovieDB);

// #endregion

// #region practice 2

