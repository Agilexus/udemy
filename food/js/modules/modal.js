function openModal(modalSelector, modalTimerIs) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add('show'); // заміть add і remove можна використовувати modal.classList.toggle('show');
  modal.classList.remove('hide');

  document.body.style.overflow = 'hidden'; // сторінка під вікном не буде скролитись
  
  if (modalTimerIs) {
    clearInterval(modalTimerIs);
  }
  
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add('hide');
  modal.classList.remove('show');

  document.body.style.overflow = ''; // залишаємо пусті '' і браузер сам вирішить що підставити по дефолту
}

function modal(trigerSelector, modalSelector, modalTimerIs) {
  const modalTrigger = document.querySelectorAll(trigerSelector),
        modal = document.querySelector(modalSelector);

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

  modalTrigger.forEach(btn => {
    btn.addEventListener('click', () => openModal(modalSelector, modalTimerIs)); // стрілочна функція потрібна, щоб функція викликалась після кліка
  });

  // modalCloseBtn.addEventListener('click', closeModal);

  // Закрити вікно по кліку за межами вікна
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
    }
  });

  // Закриваємо вікно по натисканню на esc
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) { // Щоб дізнатись інші e.code просто загуглити event.code
      closeModal(modalSelector);
    }
  });

  // Відкриваємо вікно, коли користувач доскроли до кінця сторінки
  function showModalByScroll() {
    if (window.scrollY + document.documentElement.clientHeight >=  document.documentElement.scrollHeight -1) {
      openModal(modalSelector, modalTimerIs);
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
  
}

export default modal;
export {closeModal, openModal};