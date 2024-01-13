import {closeModal, openModal} from "./modal";
import { postData } from "../services/services";

function forms(formSelector, modalTimerId) {
  const forms = document.querySelectorAll(formSelector);
  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Дякуємо! Ми скоро зʼяжемось з вами',
    failure: 'Щось пішло не так...'
  };

  // Формуємо обʼєкт з наших полів
  forms.forEach(item => {
    bindPostData(item);
  });

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
    openModal('.modal', modalTimerId);

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
      closeModal('.modal');
    }, 3000); // Видаляємо наше модальне вікно
  }
}


export default forms;