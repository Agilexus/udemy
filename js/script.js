'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    let {movies} = movieDB;
    
    const adv = document.querySelectorAll('.promo__adv img'),
          bg = document.querySelector('.promo__bg'),
          genre = bg.querySelector('.promo__genre'),
          list = document.querySelector('.promo__interactive-list'),
          input = document.querySelector('.adding__input'),
          btn = document.querySelector('.add').lastElementChild,
          checkbox = document.querySelector('.yes').previousElementSibling;


    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };
    deleteAdv(adv);

    const makeChanges = () => {
        genre.textContent = 'драма';
        bg.style.backgroundImage = 'url("img/bg.jpg")';
    };
    makeChanges();

    const sortArr = (arr) => {
        arr.sort();
    };

    function updateMoviesList() {
        sortArr(movies);
        list.innerHTML = '';
    
        movies.forEach((item, i) => {
            let name = item.toUpperCase();
        
            if (name.length > 21) {
                name = name.slice(0, 21) + '...';
            }
    
            list.innerHTML += `
                <li class="promo__interactive-item">${i+1}. ${name}
                    <div class="delete"></div>
                </li>
            `;
        });
    }
    updateMoviesList();

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        let text = input.value;
    
        if (text) {
            if (checkbox.checked) {
                console.log('Добавляем любимый фильм');
            }
        
            movies.push(text);
            input.value = '';
            updateMoviesList();
        }
    
        checkbox.checked = false;
    });

    list.addEventListener('mouseenter', () => {
        list.querySelectorAll('.promo__interactive-item').forEach((item, i) => {
            const removeBtn = item.lastElementChild;
        
            removeBtn.addEventListener('click', () => {
                movies.splice(i, 1);
                updateMoviesList();
            });
        });
    });

});
