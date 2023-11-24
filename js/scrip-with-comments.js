'use strict';

document.addEventListener('DOMContentLoaded', () => { // потрібно щоб скрипт почав відпарцьовувати відразу після того як заванатжиться DOM дерево (замість document можна використовувати window);
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против всех"
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

      //  Як можна було по іншому отримати чекбокс:
      //  checkbox = addForm.querySelector('[type="checkbox"]') - addForm це document.querySelector('form.add')
    

    /*
    Рішення вчителя:
    const addForm = document.querySelector('form.add');

    addForm.addEventListener('submit', (event) => {
        event.preventDeault();

        let newFilm = input.value;
        const favorite = checkbox.checked;
        
        if (newFilm) {
            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`;
            }

            if (favorite) {
                console.log('Добавляем любимый фильм');
            }

            movies.push(text);
            sortArr(movies);

            createMovieList(movies, list);
        
            event.target.reset(); // або ж addForm.reset();
        }
         

    })

    function createMovieList(films, parent) {
        parent.innerHTML = '';
        sortArr(films);
    
        films.forEach((film, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i+1}. ${film}
                    <div class="delete"></div>
                </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movies.splice(i, 1);

                createMovieList(films, parent);
            });
        }); 
    }

    createMovieList(movies, list);


    */


    // переписуємо у функцію, щоб потім можна було перевикористати
    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };
    deleteAdv(adv);
    

    // Теж переписуємо у функцію, але в цьому випадку просто для консистенції. Якщо робити це правильно, то потрібно прописувати параметри
    const makeChanges = () => {
        genre.textContent = 'драма';
        bg.style.backgroundImage = 'url("img/bg.jpg")';
    };
    makeChanges();
    

    // Також сортування переробимо під функцію, так як в майбутньому вона може виконувати і інші можливості
    const sortArr = (arr) => {
        arr.sort();
    };

    
    // Мій варіант першого завдання
    // myMovies.forEach((item) => {
    //     item.remove();
    // });
    
    // Мій варіант - багато переборів, але правильний
    // for (let i = 0; i < movies.length; i++) {
    //     let li = document.createElement('li');
    //     li.className = 'promo__interactive-item';
    //     li.innerHTML = `${i+1}. ${movies[i]} <div class="delete"></div>`;
    //     list.append(li);
    // }
    

    // Оновленне після 2-го завдання
    
    
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
    
    
    // додати listener
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
    

    // Видалити фільм з улюблених
    list.addEventListener('mouseenter', () => {
        list.querySelectorAll('.promo__interactive-item').forEach((item, i) => {
            const removeBtn = item.lastElementChild;
        
            removeBtn.addEventListener('click', () => {
                movies.splice(i, 1);
                updateMoviesList();
            });
        });
    });
    

}); // Кінець DOMContentLoaded

