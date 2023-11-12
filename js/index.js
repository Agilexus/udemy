'use strict';
// Без зайвих коментаірв

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
  }
};


personalMovieDB.start();

personalMovieDB.rememberMyFilms();

personalMovieDB.detectPersonalLevel();

personalMovieDB.showMyDB(personalMovieDB.privat);

personalMovieDB.writeYourGenres();

personalMovieDB.showMyDB(personalMovieDB.privat);