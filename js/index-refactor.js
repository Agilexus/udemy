'use strict';

//Запуск першого питання і перевірка
// function start() {
//   numberOfFilms = +prompt('Скільки фільмів ви вже перегляули?', '');

//   while (numberOfFilms == '' || numberOfFilms == null || isNaN(numberOfFilms)) {
//     numberOfFilms = +prompt('Скільки фільмів ви вже перегляули?', '');
//   }
// }


// Основний об‘єкт
const personalMovieDB = {
  'count': 0,
  'movies': {},
  'actors': {},
  'genres': [],
  'privat': false,

  start: () => {
    personalMovieDB.count = +prompt('Скільки фільмів ви вже перегляули?', '');
  
    while (personalMovieDB.count == '' || personalMovieDB.count == null || isNaN(personalMovieDB.count)) {
      personalMovieDB.count = +prompt('Скільки фільмів ви вже перегляули?', '');
    }
  },

  rememberMyFilms: () => {
    for (let i = 0; i < 2; i++) {
      const q1 = prompt('Останній фільм, який ви дивились?', '').trim(),
            q2 = prompt('Як би ви його оцінили?', '').trim();
    
      if (q1 != null && q2 != null && q1 != '' && q2 != '' && q1.length < 50) {
        personalMovieDB.movies[q1] = q2; 
      } else {
        i--;
      }
    }
  },

  detectPersonalLevel: () => {
    if (personalMovieDB.count > 0 && personalMovieDB.count < 10) {
      console.log('Переглянуто досить мало фільмів');
    } else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
      console.log('А ви класний глядача');
    } else if (personalMovieDB.count >= 30) {
      console.log('Да ви кіноман');
    } else {
      console.log('Ой, щось не так... Чи ви не дивились фільми?');
    }
  },

  showMyDB: (hidden) => {
    if (!hidden) {
      console.log(personalMovieDB);
    }
    // if (personalMovieDB['privat'] === false) {
    //   console.log(personalMovieDB);
    // }
  },

  toggleVisibleMyDB: () => {
    if(personalMovieDB.privat) {
      personalMovieDB.privat = false;
    } else {
      personalMovieDB.privat = true;
    }
  },

  writeYourGenres: () => {
    for (let i = 0; i < 3; i++) {
      let genre = prompt(`Ваш улюблений жанр під номером ${i+1}`, '');

      while (genre == '' || genre == null || !isNaN(+genre)) {
        genre = prompt(`Ваш улюблений жанр під номером ${i+1}`, '');
      }
      personalMovieDB.genres[i] = genre;
    }

    personalMovieDB.genres.forEach((item, i) => {
      console.log(`Улюблений жанр #${i+1} - це ${item}`);
    });
  
  // #region Варіант вчителя 1:
  //   for (let i = 1; i <= 3; i++) {
  //     let genre = prompt(`Ваш улюблений жанр під номером ${i}`, '');

  //     if (genre === '' || genre == null) {
  //       console.log('Ви вказали не коректні дані або не залишили поле пустим');
  //       i--;
  //     } else {
  //       personalMovieDB.genres[i-1] = genre;
  //     }
  //   }
  // #endregion

  // #region Варіант вчителя 2
  //   for (let i = 1; i < 2; i++) {
  //     let genres = prompt('Введіь ваші улюблені жанри через кому', '').toLowerCase();

  //     if (genres === '' || genres == null) {
  //       console.log('Ви вказали не коректні дані або не залишили поле пустим');
  //       i--;
  //     } else {
  //       personalMovieDB.genres = genres.split(', ');
  //       personalMovieDB.genres.sort();
  //     }
  //   }
  // }
  // #endregion

};

personalMovieDB.start();

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
// function rememberMyFilms() {
//   for (let i = 0; i < 2; i++) {
//     const q1 = prompt('Останній фільм, який ви дивились?', '').trim(),
//           q2 = prompt('Як би ви його оцінили?', '').trim();
  
//     if (q1 != null && q2 != null && q1 != '' && q2 != '' && q1.length < 50) {
//       personalMovieDB.movies[q1] = q2; 
//     } else {
//       i--;
//     }
//   }
// }
personalMovieDB.rememberMyFilms();

// Первірка рівня користувача
// function detectPersonalLevel() {
//   if (personalMovieDB.count > 0 && personalMovieDB.count < 10) {
//     console.log('Переглянуто досить мало фільмів');
//   } else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
//     console.log('А ви класний глядача');
//   } else if (personalMovieDB.count >= 30) {
//     console.log('Да ви кіноман');
//   } else {
//     console.log('Ой, щось не так... Чи ви не дивились фільми?');
//   }
// }
personalMovieDB.detectPersonalLevel();

// Ввиводить основний об‘єкт в консоль
// function showMyDB(hidden) {
//   if (!hidden) {
//     console.log(personalMovieDB);
//   }
//   // if (personalMovieDB['privat'] === false) {
//   //   console.log(personalMovieDB);
//   // }
// }
personalMovieDB.showMyDB(personalMovieDB.privat);

// Додаємо жанри (+ я додав перевірки)
// function writeYourGenres() {
//   for (let i = 0; i < 3; i++) {
//     let genre = prompt(`Ваш улюблений жанр під номером ${i+1}`, '');
//     while (genre == '' || genre == null || !isNaN(+genre)) {
//       genre = prompt(`Ваш улюблений жанр під номером ${i+1}`, '');
//     }
//     personalMovieDB.genres[i] = genre;
//   }
// }
personalMovieDB.writeYourGenres();

personalMovieDB.showMyDB(personalMovieDB.privat);