const numberOfFilms = +prompt('Скільки фільмів ви вже перегляули?', '');

const personalMovieDB = {
  'count': numberOfFilms,
  'movies': {},
  'actors': {},
  'genres': [],
  'privat': false
};

const a = prompt('Останній фільм, який ви дивились?', ''),
      b = prompt('Як би ви його оцінили?', ''),
      c = prompt('Останній фільм, який ви дивились?', ''),
      d = prompt('Як би ви його оцінили?', '');

personalMovieDB.movies[a] = b;
personalMovieDB.movies[c] = d;

console.log(personalMovieDB);