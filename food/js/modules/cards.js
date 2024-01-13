import { getResource } from "../services/services";

function cards() {
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

  getResource('http://localhost:3000/menu')
    .then(data => {
      data.forEach(({img, altimg, title, descr, price}) => { // data це властивість обʼєкта який повертає axios із сервера
      new ItemCard(img, altimg, title, descr, price, ".menu .container").render();
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
 
}
 
export default cards;