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

let {movies} = movieDB;
movies.sort();

list.innerHTML = '';

movies.forEach((item, i) => {
    list.innerHTML += `
        <li class="promo__interactive-item">${i+1}. ${item}
            <div class="delete"></div>
        </li>
    `;
});
