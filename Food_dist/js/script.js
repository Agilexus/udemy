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

  new ItemCard(
    "img/tabs/vegy.jpg", 
    "vegy", 
    'Меню "Фитнес"', 
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    6,
    ".menu .container"
  
  ).render(); // тут клас записується через if в методі render

  new ItemCard(
    "img/tabs/elite.jpg", 
    "elite", 
    'Меню “Премиум”', 
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    15,
    ".menu .container",
    'menu__item'
  ).render();

  new ItemCard(
    "img/tabs/post.jpg" , 
    "post", 
    'Меню "Постное"', 
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    12,
    ".menu .container",
    'menu__item'
  ).render();

  // #endregion


  // #region Forms - відправка на сервер
  const forms = document.querySelectorAll('form');
  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Дякуємо! Ми скоро зʼяжемось з вами',
    failure: 'Щось пішло не так...'
  };

  function postData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      // form.append(statusMessage); - вставляє повідомленя в саму форму
      form.insertAdjacentElement('afterend', statusMessage); // додаємо після form

      const request = new XMLHttpRequest();
      request.open('POST', 'server.php');

      request.setRequestHeader('Content-type', 'application/json');

      const formData = new FormData(form); 

      const object = {};
      formData.forEach((value, key) => {
        object[key] = value;
      });

      const json = JSON.stringify(object);
      request.send(json);

      request.addEventListener('load', () => {
        if (request.status === 200) {
          console.log(request.response);
          showThanksModal(message.success);
          form.reset();
          statusMessage.remove();
        } else {
          showThanksModal(message.failure);
        }
      });

    });
  }

  forms.forEach(item => {
    postData(item);
  });

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

});
