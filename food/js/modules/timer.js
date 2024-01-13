function timer(id, deadline) {

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

  setClock(id, deadline);
}


export default timer;