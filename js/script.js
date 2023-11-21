/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

const adv = document.querySelectorAll('.promo__adv img'),
      bg = document.querySelector('.promo__bg'),
      genre = bg.querySelector('.promo__genre'),
      list = document.querySelector('.promo__interactive-list'),
      myMovies = document.querySelectorAll('.promo__interactive-item');

adv.forEach(item => {
    item.remove();
});
    
genre.textContent = 'драма';
    
bg.style.backgroundImage = 'url("img/bg.jpg")';

// Мій варіант
// myMovies.forEach((item, i) => {
//     item.remove();
// });

let {movies} = movieDB;
movies.sort();

list.innerHTML = '';

// Мій варіант - багато переборів, але правильний
// for (let i = 0; i < movies.length; i++) {
//     let li = document.createElement('li');
//     li.className = 'promo__interactive-item';
//     li.innerHTML = `${i+1}. ${movies[i]} <div class="delete"></div>`;
//     list.append(li);
// }

movies.forEach((item, i) => {
    list.innerHTML += `
        <li class="promo__interactive-item">${i+1}. ${item}
            <div class="delete"></div>
        </li>
    `;
});
