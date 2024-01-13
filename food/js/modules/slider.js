function slider({conteiner, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
  const slides = document.querySelectorAll(slide),
        slider = document.querySelector(conteiner),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
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

// #region Опис рішення
/* 
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
// #endregion 

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

}

export default slider;