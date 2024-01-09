/* eslint-disable quotes */
window.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

  // #region tabs
  function hideTabContent() {
    tabsContent.forEach(item => {
      // item.style.display = 'none'; - інлайн стилі
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(i = 0) {
    // tabsContent[i].style.display = 'block'; - інлайн стилі
    tabsContent[i].classList.add('show', 'fade'); // fade - для анімації
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (event) => {
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
  // #endregion


  // #region timer
  /*
  Алгоритм:
  Встановлення таймеру - ф
  Різниця між часом - ф
  Оновлення часу - ф
  */

  const deadline = '2023-11-29';

  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;

    const t = Date.parse(endtime) - Date.parse(new Date()); //В результаті ми отрмали різницю між кінцевой датой і сьогоднішньой в мілісекундах. В правій частині Date.parse використовується лише для одноманістності, в цілому можна обійтись без нього.
          
    if (t <= 0) { // перевірка чи кінцева дата в майбутньому
      // замість 0 тут можна наприклад підставити іншу верстку, де буде повідомлення, що таймер закінчився
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24)); // (1000 * 60 * 60 * 24) = визначили кількість мілісекунд в сутках... 
      hours = Math.floor((t / (1000 * 60 * 60) % 24)); // (t / 1000 * 60 * 60) = визначили загальну кільсть годин. Друга частина "% 24" = знак % ділить результат лівої частни на праву і повертає залишок (24 це години в добі).
      minutes = Math.floor((t / 1000 / 60) % 60);
      seconds = Math.floor((t / 1000) % 60);
    }

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function getZero(num) { // Функція яка буде додавати 0, щоб у нас завжди число складалось з 2-х символів
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);

    updateClock(); // Викликаємо для того щоб ініціалізувати наш таймер і прибрати миготіння часу який заданий в HTML файлі

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      // Перевірка на 0, яка вимага більше ресурсів ніж та що вище...
      // if (t.seconds < 0) {
      //   days.innerHTML = '00';
      //   hours.innerHTML = '00';
      //   minutes.innerHTML = '00';
      //   seconds.innerHTML = '00';
      // } else {
      //   days.innerHTML = getZero(t.days);
      //   hours.innerHTML = getZero(t.hours);
      //   minutes.innerHTML = getZero(t.minutes);
      //   seconds.innerHTML = getZero(t.seconds);
      // }


      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock('.timer', deadline);

  // #endregion
 

 // #region modal
  const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

  /* Просте рішення з інлайн стилями
  modalTrigger.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.style.display = 'block';
    });
  });

  modalCloseBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  */

  function openModal() {
    modal.classList.add('show'); // заміть add і remove можна використовувати modal.classList.toggle('show');
    modal.classList.remove('hide');

    document.body.style.overflow = 'hidden'; // сторінка під вікном не буде скролитись
    
    clearInterval(modalTimerId);
  }

  modalTrigger.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');

    document.body.style.overflow = ''; // залишаємо пусті '' і браузер сам вирішить що підставити по дефолту
  }

  // modalCloseBtn.addEventListener('click', closeModal);

  // Закрити вікно по кліку за межами вікна
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal();
    }
  });

  // Закриваємо вікно по натисканню на esc
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) { // Щоб дізнатись інші e.code просто загуглити event.code
      closeModal();
    }
  });

  // Відкриваємо вікно через певний проміжок часу
  const modalTimerId = setTimeout(openModal, 60000);

  // Відкриваємо вікно, коли користувач доскроли до кінця сторінки
  function showModalByScroll() {
    if (window.scrollY + document.documentElement.clientHeight >=  document.documentElement.scrollHeight -1) {
      openModal();
      removeEventListener('scroll', showModalByScroll); // для видалення, потрібно точно повторити, що ми призначали при створенні слухача
    }
  }

  window.addEventListener('scroll', showModalByScroll);

  /* Розбір відкриття вікна в кінці сторінки
  window.pageYOffset - pageYOffset властивість window, яка повертає кількість 
  пікселів, які прокурутив користувач.
  
  window.scrollY це те саме що і window.pageYOffset, але другий варіант 
  застарів
  
  document.documentElement.clientHeight - clientHeight властивість Element, 
  яка повертає висоту елементу (в даному випадку, повертає всю висоту 
  браузера, яка вважається областю сайту)
  
  document.documentElement.scrollHeight - висота всього сайту, є 
  обмежння з якими слід ознайомитись: https://learn.javascript.ru/size-and-scroll-window#shirina-vysota-dokumenta
  

  Додаткова інформація:
      В наш window.addEventListener('scroll', func) - можна додати 3-й аргумент
      наприклад window.addEventListener('scroll', func, {once: true}).
      В нашому випадку він не спрацює, так як наш івент спрацьовує при 
      кожному скролі і відповідно вкінці сторінки вже не спрацює.
  */
  // #endregion


  // #region Клас-карточка
  class ItemCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 38;
      this.changeToUAH();
    }

    // метод для конвертації валюти в грн
    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    // метод створення картки render()
    render() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }
      
      element.innerHTML = `
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      `;
      this.parent.append(element);
    }
  }

  const menuBlock = document.querySelector('.menu__field').firstElementChild;
  menuBlock.innerHTML = '';

  const getResource = async (url) => {
    const res = await fetch(url);

    //ok - це вбудований метод fetch
    if (!res.ok) {
      // Викидуємо обʼєкт помилки (це зроблена вручну помилка, яка 
      // відображаться в консолі), а .status це інший вбудований метод в fetch
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);

    }

    return await res.json();
  };

// #region Запит до сервера без axios
  // getResource('http://localhost:3000/menu')
  //   .then(data => {
// #region Не зручний але зрозумілий запис
      // data.forEach(obj => {
      //   new ItemCard(obj.img, obj.altimg, obj.title, obj.descr, obj.price)
      //     .render();
      // });
// #endregion
      
    //   // Деструктуризація в параметрі
    //   data.forEach(({img, altimg, title, descr, price}) => {
    //     new ItemCard(img, altimg, title, descr, price, '.menu .container').render();
    //   });
    // });
// #region опис getResource
/*
За допомогою запита до сервера, ми отримуємо масив "menu" - масив з
обʼєктам, а занчить ми можемо перебрати його через forEach і не думати
про кількість "скільки карток нам потрібно створити".

Той обʼєкт який ми перебираємо, ми деструктурезуємо по окремим частинам
і ці частини передаємо в наш class ItemCard, який створює нову 
картку на сторінці
*/
// #endregion
// #endregion

axios.get('http://localhost:3000/menu')
.then(res => {
  res.data.forEach(({img, altimg, title, descr, price}) => { // data це властивість обʼєкта який повертає axios із сервера
  new ItemCard(img, altimg, title, descr, price, '.menu .container').render();
  });
});

// #region створення карточок 1: вручну
  // new ItemCard(
  //   "img/tabs/vegy.jpg", 
  //   "vegy", 
  //   'Меню "Фитнес"', 
  //   'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
  //   6,
  //   ".menu .container"
  
  // ).render(); // тут клас записується через if в методі render

  // new ItemCard(
  //   "img/tabs/elite.jpg", 
  //   "elite", 
  //   'Меню “Премиум”', 
  //   'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
  //   15,
  //   ".menu .container",
  //   'menu__item'
  // ).render();

  // new ItemCard(
  //   "img/tabs/post.jpg" , 
  //   "post", 
  //   'Меню "Постное"', 
  //   'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
  //   12,
  //   ".menu .container",
  //   'menu__item'
  // ).render();
// #endregion

// #region створення карточки 2: без використання класу
  // getResource('http://localhost:3000/menu')
  //   .then(data => createCard(data));

  // function createCard(data) {
  //   data.forEach(({img, altimg, title, descr, price}) => {
  //     const element = document.createElement('div');

  //     element.classList.add('menu__item');

  //     element.innerHTML = `
  //       <img src=${img} alt=${altimg}>
  //       <h3 class="menu__item-subtitle">${title}</h3>
  //       <div class="menu__item-descr">${descr}</div>
  //       <div class="menu__item-divider"></div>
  //       <div class="menu__item-price">
  //           <div class="menu__item-cost">Цена:</div>
  //           <div class="menu__item-total"><span>${price}</span> грн/день</div>
  //       </div>
  //     `;

  //     document.querySelector('.menu .container').append(element);
  //   });
  // }

// #endregion
  
  // #endregion


  // #region Forms + відправка на сервер
  const forms = document.querySelectorAll('form');
  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Дякуємо! Ми скоро зʼяжемось з вами',
    failure: 'Щось пішло не так...'
  };

  // Формуємо обʼєкт з наших полів
  forms.forEach(item => {
    bindPostData(item);
  });

  // Функція для відправки на сервер і обробки результата
  const postData = async (url, data) => {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: data
      });

    // Повертаємо проміс, щоб потім можна було з ним працювати за допомогою .then
    return await res.json();
  };

  // Функція "привʼязування" постінга
  function bindPostData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Лоадер
      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      form.insertAdjacentElement('afterend', statusMessage); // додаємо після form

// #region 1 Спосіб із XMLHttpRequest
      // Спосіб із XMLHttpRequest
      // const request = new XMLHttpRequest();
      // request.open('POST', 'server.php');
      // request.setRequestHeader('Content-type', 'application/json');
// #endregion

      // За допомогою forEach який викликає дану функцію формуємо обʼєкт formData із елементів нашой форми
      const formData = new FormData(form); 
      /* formData це
      об'єкт, який дозволяє збирати дані з HTML-форми в об'єкт для 
      подальшого використання.

      Ця стрічка створює новий об'єкт FormData на основі елементу форми 
      (form). Об'єкт FormData автоматично витягує дані з усіх полів 
      форми і створює об'єкт, в якому ключами є імена полів, а 
      значеннями - їх введені значення.

      Такий підхід особливо корисний при роботі з формами, оскільки він 
      дозволяє зручно та ефективно обробляти дані, які вводить користувач. 
      Потім ви можете використовувати цей об'єкт для подальшої обробки чи 
      відправки на сервер
      */

// #region Трасформуємо в JSON
      // const object = {};
      // formData.forEach((value, key) => {
      //   object[key] = value;
      // }); 
      // const json = JSON.stringify(object);
// #endregion

      // Кращий спосіб трансформації в JSON
      const json = JSON.stringify(Object.fromEntries(formData.entries()));


// #region 2 Спосіб з XMLHttpRequest 
      // request.send(json);
      // request.addEventListener('load', () => {
      //   if (request.status === 200) {
      //     console.log(request.response);
      //     showThanksModal(message.success);
      //     form.reset();
      //     statusMessage.remove();
      //   } else {
      //     showThanksModal(message.failure);
      //   }
      // });
// #endregion
      
// #region fetch який відправляє текстовий формар
      // fetch('server.php', {
      //   method: "POST",
      //   body: formData
      // })
      // .then(data => data.text())
      // .then(data => {
      //     console.log(data);
      //     showThanksModal(message.success);
      //     statusMessage.remove();
      // })
      // .catch(() => {
      //   showThanksModal(message.failure);
      // })
      // .finally(() => {
      //   form.reset();
      // });
// #endregion


      // За допомогою fetch відправляємо json
// #region використання fetch без функції, щоб краще зрозуміти fetch
      // fetch('server.php', {
      //   method: "POST",
      //   headers: {
      //     'Content-type': 'application/json'
      //   },
      //   body: json
      // });
// #endregion
      
      postData('http://localhost:3000/requests', json)
      //.then(data => data.text()) - дані вже трансформовані в функції postData
      .then(data => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
      })
      .catch(() => {
        showThanksModal(message.failure);
      })
      .finally(() => {
        form.reset();
      });

// #region Опис роботи з fetch
      // Як і раніше statusMessage показує спінер, далі
      // За допомогою formData postData збираємо всі дані з форми
      // І за допомогою fetch відправляємо наші дані

      // Важливо!!!
      // Проміс який запускається за допомогою fetch не перейде в стан rejected
      // через відповідь http (повʼязана http протоколом), яка є 
      // помилкою (404, 500, 501, 502 і тд) він все рівно виконає дію 
      // нормально (then) - єдине що зміниться це властивість status, 
      // яка буде false. Найголовніше для fetch що він взагалі зміг зробити
      // запит, відповідно помилкою буде проблема з інтернетом або просто
      // щось завадило зробити запит. В цього є свої плюси...
// #endregion

    });
  }

  // Відображення вікна з результатом
  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__dialog">
        <div class="modal__content">
                <div class="modal__close" data-close >×</div>

                <div class="modal__title">${message}</div>
        </div>
      </div>
    `;

    document.querySelector('.modal').append(thanksModal); // додаємо на сторінку
    setTimeout(() => {
      thanksModal.remove(); 
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 3000); // Видаляємо наше модальне вікно
  }
  // #endregion


// #region slider
  const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width; // отримуємо ширину після рендеру slidesWrapper

  let slideIndex = 1;
  let offset = 0; // наш відступ, щоб розуміти на скільки ми вже відступили

// #region Мій варіант
  // function showSlide(n) {
  //   slides[n].classList.add('show', 'fade');
  //   slides[n].classList.remove('hide');
  // }

  // function hideSlide() {
  //   slides.forEach(slide => {
  //     slide.classList.add('hide');
  //     slide.classList.remove('show', 'fade');
  //   });
  // }

  // hideSlide();
  // showSlide(slideIndex-1);
  // total.innerHTML = slides.length < 10 ?`0${slides.length}` : `${slides.length}`;
  // current.innerHTML = `0${slideIndex}`;

  // next.addEventListener('click', () => {
  //   slideIndex < slides.length
  //     ? slideIndex++
  //     : slideIndex = 1;

  //   hideSlide();
  //   showSlide(slideIndex-1);
  //   current.innerHTML = slideIndex < 10 ? `0${slideIndex}` : `${slideIndex}`;
  // });

  // prev.addEventListener('click', () => {
  //   slideIndex > 1
  //     ? slideIndex--
  //     : slideIndex = slides.length;

  //   hideSlide();
  //   showSlide(slideIndex-1);
  //   current.innerHTML = slideIndex < 10 ? `0${slideIndex}` : `${slideIndex}`;
  // });
// #endregion

// #region Варіант вчителя 1  
  // showSlides(slideIndex); 
  // total.textContent = slides.length < 10 
  //   ?`0${slides.length}` 
  //   : `${slides.length}`; 

  // function showSlides(n) {
  //   if (n > slides.length) {
  //     slideIndex = 1;
  //   }

  //   if (n < 1) {
  //     slideIndex = slides.length;
  //   }

  //   slides.forEach(slide => {
  //     slide.classList.add('hide');
  //     slide.classList.remove('show', 'fade');
  //   });

  //   slides[slideIndex-1].classList.add('show', 'fade');
  //   slides[slideIndex-1].classList.remove('hide');

  //   current.textContent = slideIndex < 10 
  //     ? `0${slideIndex}` 
  //     : slideIndex;
  // }

  // function plusSlide(n) {
  //   showSlides(slideIndex += n);
  // }

  // prev.addEventListener('click', () => {
  //   plusSlide(-1);
  // });

  // next.addEventListener('click', () => {
  //   plusSlide(1);
  // });
// #endregion

// #region Варіант вчителя 2*
/* Опис рішення
Для початку в html додаємо слайдеру обгортку .offer__slider-inner. 
Ця обгортка буде нашим віконцем, через яке ми будемо бачити слайдер

Алгоритм створення:
  Велика обгортка .offer__slider-wrapper - якій ми призначимо властивість overflow: hidden
  Тобто все що виходить за межі .offer__slider-wrapper буде приховано

  .offer__slider-inner - буде мати ту ширину що і всі слайди разом взяті

  Відповідно, при натискані на стрілки, в доному рішення слайди будуть переміщатись по
  відношенню до .offer__slider-wrapper (а не приховуватись, як в попередніх рішеннях).
  Це буде робитись за допомогою transform

  window.getComputedStyle(slidesWrapper).width; // отримуємо ширину після рендеру slidesWrapper
*/

  // Налаштовуємо лічильник
	if (slides.length < 10) {
		total.textContent = `0${slides.length}`;
		current.textContent = `0${slideIndex}`;
	} else {
		total.textContent = slides.length;
		current.textContent = slideIndex;
  }

  // Задаємо ширину slidesField, щоб всередину помістити всі слайди
  slidesField.style.width = 100 * slides.length + '%';

  // Виставляємо всі слайди по горизонталі
  slidesField.style.display = 'flex';

  // Додаємл плавність руху слайдів
  slidesField.style.transition = '0.5s all';

  // Обмежуємо видиму область, щоб приховати не активні слайди
  slidesWrapper.style.overflow = 'hidden';

  // Задаємо всім слайдам однакову ширину
  slides.forEach(slide => {
    slide.style.width = width;
  });

  // Створюємо і налаштовуємо відображення індикатора
  slider.style.position = 'relative';

  const indicators = document.createElement('ol'),
        dots = [];

  indicators.classList.add('.carousel_indicators');

  // Додаємо стилі за допомогою JS
  indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
  `;

  slider.append(indicators);

  // Додаємо правильну кількість індикаторів на сторінку
  for (let i =0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('.dot');
    dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transition: opacity .6s ease;
    `;
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot); // Формуємо масив із нашими дотсами
  }

  function deleteNotDigits(str) {
    return +str.replace(/\D/g, '');
  }

  next.addEventListener('click', () => {
    // Перевіряємо чи в нас ще є слайди попереду
// #region Без регулярного виразу
    // if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) { // width виглядає, як 500px, тому його перетворюємо в числове значення
    //   offset = 0;
    // } else {
    //   offset += +width.slice(0, width.length - 2);
    // }
// #endregion

    if (offset == deleteNotDigits(width) * (slides.length - 1)) { 
      offset = 0;
    } else {
      offset += deleteNotDigits(width);
    }

    // Щоб перейти до наступного нам потрібно
    slidesField.style.transform = `translateX(-${offset}px)`;

    // Змінюємо номерацію
    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    current.textContent = slideIndex < 10 
      ? `0${slideIndex}` 
      : slideIndex;

    // Відмічаємо активний індикатор
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = '1';
  });

  prev.addEventListener('click', () => {
    // Перевіряємо чи в нас ще є слайди попереду
    // #region Без регулярного виразу
    // if (offset == 0) {
    //   offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    // } else {
    //   offset -= +width.slice(0, width.length - 2);
    // }
    // #endregion

    if (offset == 0) {
      offset = deleteNotDigits(width) * (slides.length - 1);
    } else {
      offset -= deleteNotDigits(width);
    }

    // Щоб перейти до попереднього нам потрібно
    slidesField.style.transform = `translateX(-${offset}px)`;

    // Змінюємо номерацію
    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    current.textContent = slideIndex < 10 
      ? `0${slideIndex}` 
      : slideIndex;

    // Відмічаємо активний індикатор
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = '1';
  });

  // Робимо dots клікабельними
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = deleteNotDigits(width) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      current.textContent = slideIndex < 10 
        ? `0${slideIndex}` 
        : slideIndex;

      dots.forEach(dot => dot.style.opacity = '.5');
      dots[slideIndex - 1].style.opacity = '1';
    });

  });
// #endregion варіант 3

// #endregion


// #region Calculator
  /* Опис
  - Беремо дані введені користувачем
  - Підставляємо в формуло
  - Виводимо результат
  */
  const result = document.querySelector('.calculating__result span');

  let sex, height, weight, age, ratio;

  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    sex = 'female';
    localStorage.setItem('sex', sex);
  }

  if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', ratio);
  }

  function initLocalSettings (selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.classList.remove(activeClass);

      if (elem.getAttribute('id') === localStorage.getItem('sex')) {
        elem.classList.add(activeClass);
      } 

      if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        elem.classList.add(activeClass);
      }
    });
  }

  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');


  function calcTotal() {
    // Перевіряємо чи всі поля заповнені
    if (!sex || !weight || !age || !ratio) {
      result.textContent = '0';
      return;
    }

    // Розрахунок по формлуі
    if (sex === 'female') {
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
  }
  calcTotal();

  function getStaticInfo(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    /* Делегування подій тут працюватиме з багами
    document.querySelector(parentSelector).addEventListener('click', (e) => {
      if (e.target.getAttribute('data-ratio')) {
        ratio = +e.target.getAttribute('data-ratio');
      } else {
        sex = e.target.getAttribute('id');
      }

      // Прибираємо класс активності у всіх
      elements.forEach(elem => {
        elem.classList.remove(activeClass);
      });

      // Назначаємо елементу активний клас
      e.target.classList.add(activeClass);

      calcTotal();
    });
    */

    elements.forEach(elem => {
      elem.addEventListener('click', (e) => {
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
        } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem('sex', e.target.getAttribute('id'));
        }
  
        // Прибираємо класс активності у всіх
        elements.forEach(elem => {
          elem.classList.remove(activeClass);
        });
  
        // Назначаємо елементу активний клас
        e.target.classList.add(activeClass);
  
        calcTotal();
      });
    });
  }
  getStaticInfo('#gender div', 'calculating__choose-item_active');
  getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');

  function getDinamicInfo(selector) {
    const input = document.querySelector(selector);

    // Отрмуємо дані з полів
    input.addEventListener('input', () => {

      if(input.value.match(/\D/g)) {
        input.style.border = '1px solid red';
      } else {
        input.style.border = 'none';
      }

      switch(input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      }

      calcTotal();
    });
  }
  getDinamicInfo('#height');
  getDinamicInfo('#weight');
  getDinamicInfo('#age');
// #endregion
});