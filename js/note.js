// 'use strict'; – деректива, яка каже що ми працюємо в сучасному режимі де не працюють деякі неточності які були в старих стандартих js. Порада використовувати її завжди

// #region 88 Перебір масивів 2.0
/*
.filter


-----------------------------------------------------------------------
.map


-----------------------------------------------------------------------
.every / .some


-----------------------------------------------------------------------
.reduce



-----------------------------------------------------------------------
Практика:


*/
// #endregion


// #region 87 Fetch
/*
API - application programming interface
Набір даних і можливостей, які надає якесь готове рішення

DOM API - це різні методи як дозволяють працювати з DOM елементам, 
по суті воно вбудоване в браузер. Приклад document.querySelector

fetch api - теж вбудована в браузер. Сучасна технологія яка дозволяє
спілкуватись з сервером і вона побудована на промісах.

Щоб тестувати можна використовувати готове рішення:
jsonplaceholder.typicode.com - fake online rest api for testing


GET запит:
  fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json()) 
    .then(json => console.log(json));

  В результаті отримаємо першу тудушку.
  Відповідно fetch прймає в себе url звідки ми хочемо отримати дані і
  якщо не вказувати інші параметри, то це буде класичний get запит.
  І у відповідь ми отримає проміси, саме тому ми можемо викорстовувати 
  then.

  .then(response => response.json()) - fetch використовує проміси, 
    далі ми отримуємо якийсь response (нашу відповідь від сервера), яка
    відповідно до документації в форматі JSON, а щоб ми могли працювати
    з ним, нам потрібно трансформувати його в обʼєкт, для цього в fetch є
    вбудований можливість яка дозволяє це зробити максимально швидко і 
    зручно: response.json() - перетворю json обʼєкт в js обʼєкт. Але
    важливо, дана команда повертає проміс

POST
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: "POST",                           // method і body обовʼязкові, якщо метод не get
    body: "JSON.stringify({name: 'Alex'})",   // передаємо json обʼєкт
    headers: {
      'Content-type': 'application/json'      // Як і раніше в уроці 83
    }
  })
  .then(response => response.json()) 
  .then(json => console.log(json));

  Після такого записту, відповідно до прописаних .then отримаємо 
  відповідь з обʼєктом в консолі, де буде обʼєкт {name: 'Alex'} який 
  передавав і його id.


(XMLHttpRequest) Старий метод роботи з сервером дає краще розуміння, як 
працювати з сервером і він все ще може зустрічатись в старих проектах, 
але в нових всі використовують fetch



*/
// #endregion

// #region 86 Promise
/*
Допомагає працювати з асинхроними операціями.
Іншими словами допомагає створити чергу із операцій, якщо щось відбулось,
то потім має відбутись щось інше...

Один із варіантів, застосування обіцянок, це уникнути callback hall, 
коли в одному callback викликається інший callback, в якому викликається
ще один callback і тд... як результат багато вкладень і досить важко 
читати.

Щоб використовувати Promise, спочатку потрібно його створити:
  const req = new Promise((resolve, reject) => { ... })

resolve і reject - це функції

Є два методи: then() i catch(). Перший для успішного опрацювання, друге 
для помилок. А в () записуються там сама callback функція, 
в then - resolve, а в catch - reject.


Приклад
  console.log('Запит даних...');

  const req = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Підготовка даних');

      const product = {
        name: 'TV',
        price: 2000
      };

      resolve(product); // (product) - це аргумент який буде в resolve і відповідно в then ми можемо його використати
    }, 2000)
  })

  req.then((product) => {
    setTimeout(() => {
      product.status = 'order';
      console.log(product);
    }, 2000);
  });

  Пояснення коду вище:
    Ми створили проміс, а після опрацювали успішне виконання, 
    за допомогою req.then(), де є callback функція, яка являється
    resolve в нашому promise.

    В promise є resolve(product)
      (product) - це аргумент який буде в resolve і відповідно в then 
      ми можемо його використати. Тому ми додали його аргументом в нашу
      callback функцію.



Приклад 2 ускладнений:
  console.log('Запит даних...');

  const req = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Підготовка даних');

      const product = {
        name: 'TV',
        price: 2000
      };

      resolve(product); // (product) - це аргумент який буде в resolve і відповідно в then ми можемо його використати
    }, 2000)
  })

  req.then((product) => {
    const req2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        product.status = 'order';
        resolve(product);
      }, 2000);
    })

    req2.then(data => {
      console.log(data);
    });
  });

  // по своїй суті, код вище нічим не відрізняється ніж якби ми 
  // використали callback функції... але promise дозволяє нам спростит 
  // його:
  
      console.log('Запит даних...');

      const req = new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('Підготовка даних');

          const product = {
            name: 'TV',
            price: 2000
          };

          resolve(product); // (product) - це аргумент який буде в resolve і відповідно в then ми можемо його використати
        }, 2000)
      })

      // спрощеня в тому, що ми в then ми return новий promis і потім
      // у нас відразу йде новий then.
      req.then((product) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            product.status = 'order';
            resolve(product);
          }, 2000);
        });
      }).then(data => {
          console.log(data);
      });

      Відповідно, якщо в останньому then потрібно буде опрацювати ще 
      один результат, то можна так само return new Promise і потім then.
      Так само можна з останнього then повернути не лише promise, а і 
      будь яку інформацію. Для цього допрацюємо останій req.then:
      
        req.then((product) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              product.status = 'order';
              resolve(product);
            }, 2000);
          });
        }).then(data => {
          data.modify = true;
          return data;
        }).then(data => {
          console.log(data);
        });



Приклад 3: reject
  console.log('Запит даних...');

  const req = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Підготовка даних');

      const product = {
        name: 'TV',
        price: 2000
      };

      resolve(product); // (product) - це аргумент який буде в resolve і відповідно в then ми можемо його використати
    }, 2000)
  })

  req.then((product) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        product.status = 'order';
        resolve(); // Ось тут ми викликаємо (для прикладу), і нічого в неї не передаємо
      }, 2000);
    });
  }).then(data => {
    data.modify = true;
    return data;
  }).then(data => {
    console.log(data);
  }).catch(() => { // catch - зазвичай ставиться вкінці і опрацьовує негативний сценарій
    console.error('Виникла помилка');
  });

  Пояснення:
    Отже, якщо ми наприклад не отримали те що потрібно від сервера, то
    всі then пропустяться і буде викликаний catch.


Приклад 4: finally
  Окрім then i catch є ще finally - кінцева функція, але на відміну від
  попередніх, вона не залежить від результату і буде виконана завжди.
  Відповідно записується в самом кінці після всіх then i catch.

  Отже на тому самому прикладі:

  console.log('Запит даних...');

  const req = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Підготовка даних');

      const product = {
        name: 'TV',
        price: 2000
      };

      resolve(product); // (product) - це аргумент який буде в resolve і відповідно в then ми можемо його використати
    }, 2000)
  })

  req.then((product) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        product.status = 'order';
        resolve(product);
      }, 2000);
    });
  }).then(data => {
    data.modify = true;
    return data;
  }).then(data => {
    console.log(data);
  }).catch(() => { // catch - зазвичай ставиться вкінці і опрацьовує негативний сценарій
    console.error('Виникла помилка');
  }).finally(() => {
    console.log('finally');
  })


В промісах ще є методи all і race. Відразу на прикладі:
  const test = time => {
    return new Promise(resolve => {
      setTimeout(() => resolve(), time);
    });
  };

  test(1000).then(() => console.log('1000 ms'));
  test(2000).then(() => console.log('2000 ms'));

  Пояснення:
    У нас є функція, в якій є проміс, який буде запускатись через 
    певний час.

    Отже функцію вище ми заупстили кілька разів, те саме можна зробити
    з методом all, який приймає в себе масив з промісами:
      Promise.all([test(1000), test(2000)]).then(() => {
        console.log('All');
      }); // час виконання 2 с. (тоді коли 2-й відпрацював)

    Promise.all - чекає виконання всіх промісів, які були передані в
    масиві і лише потім виконувати then чи catch.

    Приклад: може бути ситуація коли у нас запити на отримання картинок
    з кілька сервервів але ми хочемо, щоб вони зʼявились на сторінці 
    одночасно.

Отже а race працює майже навпаки, then спрацює відразу після того, як 
перший успішний проміс відпрацював. Запис такий самий:
  Promise.race([test(1000), test(2000)]).then(() => {
    console.log('All');
  }); // час викнання 1 с. (як тільки перший відпрацював)

*/
// #endregion

// #region 84 Реалізаці скрипта відправки даних
/*
Застосвання XMLHttpRequest на практиці в проекті food:

  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'Відправка...',
    success: 'Дякуємо! Ми скоро зʼяжемось з вами',
    failure: 'Щось пішло не так...'
  };

  forms.forEach(item => {
    postData(item);
  });

  // 1. Якщо серверу не потрібен JSON
  // function postData(form) {
  //   form.addEventListener('submit', (e) => {
  //     e.preventDefault();

  //     const statusMessage = document.createElement('div');
  //     statusMessage.classList.add('status');
  //     statusMessage.textContent = message.loading;
  //     form.append(statusMessage);

  //     const request = new XMLHttpRequest();
  //     request.open('POST', 'server.php');

  //     // Важливо, коли у нас звʼязка XMLHttpRequest і form - не потрібні headers, вони встановлюються автоматично
  //     const formData = new FormData(form); // важливо, щоб всі елементи всередині тегу form мали атрибут name (унікальні в рамках форми)
  //     request.send(formData);

  //     request.addEventListener('load', () => {
  //       if (request.status === 200) {
  //         console.log(request.response);
  //         statusMessage.textContent = message.success;
  //         form.reset();
  //         setTimeout(() => {
  //           statusMessage.remove();
  //         }, 5000);
  //       } else {
  //         statusMessage.textContent = message.failure;
  //       }
  //     });

  //   });
  // }

  // 2. JSON потрібен для сервера
  function postData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      statusMessage.textContent = message.loading;
      form.append(statusMessage);

      

      const request = new XMLHttpRequest();
      request.open('POST', 'server.php');

      // Тут нам потрібні headers
      request.setRequestHeader('Content-type', 'application/json');

      const formData = new FormData(form); 

      // Тепер перетворюємо form  в JSON
      const object = {};
      formData.forEach((value, key) => {
        object[key] = value;
      });

      // Після того, як перетворили нашу форму в обʼєкт, перетворюємо в JSON
      const json = JSON.stringify(object);
      request.send(json);

      // Або відразу при відправці:
      // request.send(JSON.stringify(object));

      request.addEventListener('load', () => {
        if (request.status === 200) {
          console.log(request.response);
          statusMessage.textContent = message.success;
          form.reset();
          setTimeout(() => {
            statusMessage.remove();
          }, 5000);
        } else {
          statusMessage.textContent = message.failure;
        }
      });

    });
  }

*/
// #endregion

// #region 83 AJAX
/*
AJAX - Asynchronous JavaScript And XML

Все працює на http-запитах

---------------------------------------------------------------------------
!!! Самий перший варіант AJAX який реалізується за допомогою об‘єкта
    "XML http Request" - вже не актуальний, але зустрічається:

Тестуємо на калькуляторі валют: 
- В HTML у нас 2 поля UAH i USD;
- В папці js, є файл current.json:
    {
      "current": {
        "usd": 38
      }
    }

Тепер в файлі js:
  const inputUah = document.querySelector('#uah'),
        inputUsd = document.querySelector('#usd');

  inputUah.addEventListener('input', () => {  // можна ще change - він спрацьовує коли знімаєш фокус
    const request = new XMLHttpRequest(); 

    request.open('GET', 'js/current.json,); // задаємо параметри
    request.setRequestHeaders('Content-type', 'application/json; charset=utf-8') // додаємо пояснення "що саме відправляємо"
    request.send(); // відправляємо наш запит, відповідно пустий, тому що у нас GET, а значить це ми очікуємо щось отримати

    // працюємо з відповіддю, варіант №1
    request.addEventListener('redystatechange', () => {
      if (request.redyState === 4 && request.status === 200) {
        // console.log(request.response);
        const data = JSON.parse(request.response);
        inputUsd.value = (+inputUah.value / data.current.usd).toFixed(2);
      } else {
        inputUsd.value = "ой, щось не так...";
      }
    })

    // Варіант №2, більш часто зустрічаєтсья
    request.addEventListener('load', () => {
      if (request.status === 200) {
        const data = JSON.parse(request.response);
        inputUsd.value = (+inputUah.value / data.current.usd).toFixed(2);
      } else {
        inputUsd.value = "ой, щось не так...";
      }
    })

  }) 

Пояснення і доповнення:
  ajax запити по замовчуванню асинхронні.
  const request = new XMLHttpRequest() - створили об‘єкт
  request.open(method, url, async, login, pass) - цей метод не відкриває 
    з‘єднання, а лише збирає налаштування, які далі допоможуть встановити
    з‘єднання з сервером. Розбираємо його аргументи:
      method - get, post і тд.
      url - до нашого сервера. Але потрібно пам‘ятати, що запит відправляєтсья
        від нашого html, тому і шлях потрібно формувати відносно html.
      async - по замовчуванню true, можна встановити false, але це рідко потрібно
      login і pass - деякі запити ми не можемо робити без них.

  Headers - коли ми відправляємо запит, то нам потрібно пояснити серверу, що саме ми
  йому відправляємо, для цього існують заголовки (Headers).

  .send(body) - коли ми використовує тип запиту post, то ми відправляємо щось
    на сервер, відповідно body - це дані які йдуть на сервер.

  Властвості нашого об‘єкта, або те що ми отримуємо від сервера:
    status: 2xx - успішні; 3хх - пренаправлення; 4хх - помилка клієнат; 5хх - помилка сервера...
    statusText - текстове пояяснення помилки
    response - відповідно найголовніше - відповідь від сервера (також є resposeText)
    redyState - поточний стан нашого запиту. 0, 1, 2, 3, 4 - де 0 - об‘єкт створено і метод open() ще не викликався; а 4 - операція повністю завершена
    redystatechange - відстежує готовність нашого запиту, якщо заглибитись, 
      то ця подія дивиться на redyState спрацьовує при кожній зміні (від 0 до 4)
    load - схожий на попередній, але він спрацьовує лише раз, коли отримує 4


Все це - самий перший спосіб роботи з асинхронним кодом і це був XMLHttpRequest.

*/
// #endregion

// #region 82 JSON формат передачі даних
/*
JSON - JS Oject Notation і це текстовий формат передачи даних

На практиці:
  Уявимо що у нас є об‘єкт:
    const persone {
      name: 'Alex',
      tel: '+380992223344'
    }
  І нам потрібно передати його на сервер. Для цього нам потрібно перетворити його
  на один із варіантів, які можна транспортувати.

  Для цього існує вбудований об‘єкт JSON в якого є метод:
    JSON.stringify(persone)

  
  Відповідно, якщо сервер присилає дані нам в форматі JSON, то ми можемо
  зробити зворотню процедуру і перетворити JSON на об‘єкт:
    JSON.parse()

-----------------------------------------------------------------------------------

Глибокі копії об‘єктів
На практиці вони робляться за допомогою JSON, приклад:

Ускладньоємо наш об‘єкт
  const persone {
    name: 'Alex',
    tel: '+380992223344',
    parent: {
      mom: 'Olga',
      dad: 'Mike'
    }
  }

Тепер ми можемо зробити точну копію (глибоку):
const clone = JSON.parse(JSON.stringify(persone));

*/
// #endregion

// #region 81 Локальний сервер
/*
https://www.mamp.info/en/mamp-pro/mac/

Просто встановити і все буде працювати.

Всі проекти додати в папку htdocs

*/
// #endregion

// #region 80 Rest і параметр за замовчуванням
/*
Рест це "брат" spred, який використовує такий самий синтаксис, але в інших
  умовах. Якщо spred бере сутність і розкладав її на окремі елементи, то
  rest - навпаки, окремі елементи обʼєднує в один масив.

--------------------
sored syntax - довзоляє розширити доступний для ітерації елементи (наприклад 
  масиви чи рядки) в місцях:
  - для функцій
  - для елементів (літерали масивів)
  - для обʼєктів

Деталі: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Spread_syntax
---------------------

Прикдал rest:
  const log = function(a, b, ...rest) {
    console.log(a, b, rest);
  }
  log('basic', 'some', 'rest1', 'rest2');
  отримаємо результат: basic some ['rest1', 'rest2']

  Правила:
    - рест в параметрах записується останнім
    - ...rest - замість рест можна використовувати будь-яку назву
    - rest - завжди формує масив, тому з ним потрібно в подальшому працювати
      як з масивом.


Параметри по замовчуванню:
function calcOrDouble(num, basis = 2) {
  console.log(num * basis);
}
calcOrDouble(20); // отримаємо 40, тому що другий параметри має значення по замовчуванню

*/
// #endregion

// #region 78 Де слідкувати за новими стандартами
/*
Офіційне джерело: https://github.com/tc39
Більш конкретно, репозитрій: https://github.com/tc39/ecma262
Специфікація мови: https://tc39.es/ecma262/

Більш простіше слідкувати за пропозиціями змін мови: https://github.com/tc39/ecma262#current-proposals

Список вже завершених і прийнятих змін в мову: https://github.com/tc39/proposals/blob/HEAD/finished-proposals.md

І звісно гугл
*/
// #endregion

// #region 77 Класи
/*
Класи в JS були введені в ECMAScript 2015 і представляють собою синтаксичний
цукор над існуючим в JS механізмом прототипного успадкування. Синтаксим 
класів не вводить нову обʼєктно-орієнтовану модель, а представляє собою
більш простий і зрозумілий спосіб створення обʼєктів і організацію 
успадкування.

Приклад класу:
  class Rectangle {
    constructor(height, width) { // місце куди ми задаємо всі властивості, а аргументи це те що будемо отримувати із зовні
      this.height: height;
      this.width: width;
    }

    calcArea() { // метод записується без ключових слів
      return this.height * this.width;
    }
  }

  const square = new Rectangle(10, 10); // створили екземпляр
  
  console.log(square.calcArea());

-------------------------------------------------------------------------

  Повторення:
    Принципи ООП:
      1. Абстракція - коли ми відділяємо концепцію від екземпляра.
        наш клас, це концепція, а потім ми створюємо екземпляри.
      2. Успадкування - можливість обʼєкта (або класа) базуватись
        на іншому обʼєкті чи класі. Це головний механіз для повторного 
        використання коду.

-------------------------------------------------------------------------

Тепер створимо ієрархію. Спочатку основний клас, а потім додаткові:

  class Rectangle {
    constructor(height, width) { // місце куди ми задаємо всі властивості, а аргументи це те що будемо отримувати із зовні
      this.height: height;
      this.width: width;
    }

    calcArea() { // метод записується без ключових слів
      return this.height * this.width;
    }
  }

  class ColoredRectangleWithText extends Rectangle {
    constructor(height, width, text, bgColor) {
      super(height, width); 
      this.text = text;
      this.bgColor = bgColor;
    }

    showMyProps() {
      console.log(`Текст: ${this.text}, колір: ${this.bgColor}`);
    }
  }

  const div = new ColoredRectangleWithText(25, 10, 'Hello world', 'red');
  div.showMyProps();
  console.log(div.calcArea());

  Пояснення:
    extends Rectangle - вказує батька;
    super() - викликає супер конструктор батька. Отже викликає конструктор
              який є у батька, замість того, щоб переписувати. 
              Якщо нам потрібні не всі властивості, то ми можемо в параметри
              прописати, які нам потрібні: super(height, width);

              Важливо!! супер має бути завжди на першому місці.

*/
// #endregion

// #region 76 Контекст виклику функції. This
/*
This - це те що оточує функцію і в яких умовах вона викликається.

Функція може викликатись 4-а способами і в кожному з них контекст 
відрізняється:
  1. Звичайна функція: this = window (при умові вимкненого суворого режиму)
    function showThis() {
      console.log(this);
    }
    showThis();

    В браузері ми отримаємо window - глобальний обʼєкт.
    А отже, якщо ми запускаємо функцію тиким чином, то this буде посилатись на 
    глобальний обʼєкт window. Це првило працює лише із вимкненим 'use strict'.

    Якщо увімкнути 'use strict', то ми отримаємо undefined

    Практична задача, яка часто на співбесідах:
      function showThis(a, b) {
        console.log(this);

        function sum() {
          console.log(this);
          return this.a + this.b;
        }

        console.log(sum());
      }
      showThis(4, 5);

      В результаті:
        Ми отримаємо 2 undefined (якщо використовуємо сувори режим), тому що 
        не важливо де функція запускається, все одно контекст виклику буде 
        або window або undefined. Тому навіть, якщо ми викликаємо функцію 
        всередині функції, її контекст не змінюєтсья.

      Для того щоб функція спрацювала, нам потрібно використати замикання
      функції:

        function showThis(a, b) {
          console.log(this);

          function sum() {
            console.log(this);
            return a + b;
          }

          console.log(sum());
        }
        showThis(4, 5);

      Таким чином, наша функція sum спочатку шакає змінні всередині себе, 
      а потім у батьківській функції. Знаходить їх і повертає суму.
      

  2. Метод обʼєкта теж функція. І в такому випадку, this це наш обʼєкт.
  Або: Контекст у методів обʼєкта - це сам обʼєкт.
    const obj = {
      a: 20,
      b: 15,
      sum: function() {
        console.log(this);
      }
    }
    obj.sum();

    В результаті отримаємо наш обʼєкт.

    Додатковий експеримент:
      Якщо ускладнити і в метод додати ще одну функцію:
        const obj = {
          a: 20,
          b: 15,
          sum: function() {
            function shout() {
              console.log(this); // отримаємо undefined
            }
            shout();
          }
        }
        obj.sum();

        Результат:
          В цьому випадку функція shout втрачає попередній контекст, так як
          вона вже всередині функції. Тобто ситуація стає аналогічною до 
          першого пункту.

  3. Функції-конструктори.
  this в конструкторах і класах - це новий екземпляр обʼєкта.

    function User(name, id) {
      this.name = name;
      this.id = id;
      this.human = true;
    }
    const ivan = new User('Ivan', 28);

    Результат:
      По суті коли ми створюємо екземпляр, ми створюємо обʼєкт і логіка тут
      максимально схожа з 2-м пунктом. Відповідно в класах все працює так 
      само. Тому this - це обʼєкт який створений при оголошені екземпляра.

  4. Ручне присвоєння this: call, apply, bind
    
    function sayName() {
      console.log(this);
      console.log(this.name);
    }

    const user = {
      name: 'John'
    }

    Щоб зробити контекст функції sayName не window чи undefined, а наш обʼєкт
    user існують методи: call і apply:
      sayName.call(user); // таким чином передаємо контекст виклику
      sayName.apply(user); // таким чином передаємо контекст виклику

      Відповідно в обох випадках this буде об‘єктом user


      Тепер про різницю між call і apply.
        Уявимо що наша функція приймає аргументи:
          function sayName(surname, age) {
            console.log(age);
            console.log(this.name + surname);
          }

          const user = {
            name: 'John'
          }

          Тепер в call передаємо аргумент через кому:
          sayName.call(user, 'Smith', 23);

          А в apply аргументи передаємо у вигляді масиву:
          sayName.apply(user, ['Smith', 23])

    
    Є ще 3-й спосіб ручного присвоєння:
      bind - створює нову функцію, яка пов‘язана з певним контекстом:
        function count(num) {
          return this * num;
        }
        const double = count.bind(2); // таким чином ми присвоюємо нову функцію
        
        І тепер ми можемо застосовувати нашу нову функцію:
          console.log(double(3)); // отримаємо 6
          console.log(double(16)); // отримаємо 32

        Отже при такому записі, ми розуміємо, що double це функція у якої
        жорстко привʼязаний контекст.

----------------------------------------------------------------------------


Застосовуємо на практиці:
  const btn = document.querySelector('button');

  btn.addEventListener('click', function() {
    console.log(this); // отримаємо сам елемент наш <button></button>
  })
  Отже, правило, якщо наша функція в обробнику подій записана в класичному
  вигляді через function... то контекст виклику = сам обʼєкт на якому 
  відбулась подія.

  Якщо спростити то this = event.target (при цьому на практиці частіше 
  використовується другий варіант - event.target).


--------------------
  Правило:
  У стрілочних функцій немає свого контексту виклику і вона завжди бере його
  у свого батька. 
--------------------

  Тепер приклад:
    const obj = {
      num: 5,
      sayNum: function() {
        const say = () => {
          console.log(this); // виходячи з правила вище, ми отримаємо обʼєкт obj
        }

        say();
      }
    };

  Тепер спробуємо із обробником подій:
    btn.addEventListener('click', () => {
      console.log(this); // отримаємо undefined, тому що контекст виклику загубився
    })


Додаткова інформація про стрілочну функцію:
  const double = (a) => a * 2;

  при такому записі наша функція має поміщатись в 1 рядок і return 
  підставиться автоматично. Окрім цього, якщо у нас всього 1 аргумент, 
  то можна записувати без ():
    const double = a => a * 2;

*/
// #endregion

// #region 75 Функції-конструктори ES5
/*
Функція по своїй суті є обʼєктом, а отже в неї можна записати якісь 
методи і властивості.

А також потрібно памʼятати, що існує довгий синтаксис для створення типів 
даних за допомогою new:
  const num = new Number(3);

Те саме можна зробити і з функцією:
  const num = new Function(3); // такий запис теж дуже застарілий і не використовується

Реальний приклад:
  function User(name, id) {
    this.name = name;
    this.id = id;
    this.human = true;
  }
  
  З таким синтаксисом, наша функція стала конструктором і ми можемо створювати
  нових user:

    const ivan = new User('Ivan', 28); 

  Тепер в середині змінной ivan буде знаходитьсь обʼєкт, а не функція, все
  тому що ми використовували синтаксис функції конструктур.
  І таким чином ми можемо створювати безліч юзерів...

  В функціях конструкторах - нам не потрібен return. 

  І в такі функції ми можемо записати методи:
    function User(name, id) {
      this.name = name;
      this.id = id;
      this.human = true;
      this.hello = function() {
        console.log(`Hello ${this.name});
      }
    }
  
  І тепер можемо викликати цей обʼєкт:
  ivan.hello();

  За допомогою властивості prototype можна додавати нові методи і властивості
  в наш конструктор і вони будуть прототипно успадковуватись у спадкоємців.
  Таке використовується, коли у нас немає доступу до нашого прототипу або 
  по якихось причинах ми не можемо його змінювати, але нам потрібно його 
  модифікувати:
    User.prototype.exit = function() {
      console.log(`Користувач ${this.name} вийшов`);
    }

    І цей метод зʼявиться у всіх спадкоємців, які були створені після 
    оголошення цього методу.

    При всьому цьому слід враховувати що тут вказується не прототип, як це
    було в setPrototype, коли одне успадковується від іншого, а просто
    додаємо властивості або методи в уже існуючий обʼєкт.

Отже конструктори нам необхідні для створення нових однотипних обʼєктів, 
як приклад це може бути: користувач, товари, ролики на ютубі і все де є
шаблонізація, навіть компоненти сайтів.

Все це відповідає стандарту ES5 і це те, як воно працює під капотом JS.
А в стандарті ES6 зʼявились класи, це так званий синтаксичний цукор. Це
красива обгортка всього цього функціоналу (функції-конструктори), але їх
спрвді зручно використовувати, тому майже весь функціонал зараз і створюється
за допомогою класів.


Класи будуть далі по курсу, але вони виглядають так:
  class User {
    constructor(name, id) {
      this.name = name;
      this.id = id;
      this.human = true;
    }
    hello() {
      console.log(`Hello ${this.name});
    }
    exit() {
      console.log(`Користувач ${this.name} вийшов`);
    }
  }

*/
// #endregion

// #region 74 MutationObserver & ResizeObserver
/*
MutationObserver: https://developer.mozilla.org/ru/docs/Web/API/MutationObserver

ResizeObserver: https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver

Більше деталей і приклад використання: 
https://learn.javascript.ru/mutation-observer#ispolzovanie-dlya-integratsii

Відслідковувати зміни самих елементів:
  Зміни в елементі можуть бути визвані скриптом, приклад: додається текст, 
  видаляється і тд.

  Ще як варіант в html є атрибут contenteditabe, який дозволяє користувачу
  писати текст у звичайний дів:
  <div contenteditabe class="box"></div>
  contenteditabe - дуже часто використовується в різних адмінках.

  Тепер коли блок можна змінювати, ми можемо відстежувати ці зміни:
    const box = document.querySelector('.box');

    let observer = new MutationObserver(mutationRecords => {
      console.log(mutationRecords);
    }); // обʼєкт який буде слідкувати за чимось.

      Тепер потрібно "включити" слідкування за допомогою методу .observe
      який приймає 2 аргументи, обʼєкт за яким буде слідкувати і конфіг, 
      який ми можемо налаштувати (https://developer.mozilla.org/ru/docs/Web/API/MutationObserver#mutationobserverinit)
      приклад: 

    observer.observe(box, {
      childList: true 
      // відслідковує чи у нас додаються чи видаляються текстові вузли
    })
    // відповідно observer спрацьовує лише коли ми створюємо текст або 
    // видаляємо (не реагує на редагування тексту).

    !! обсервер спрацьовує після змін, відповідно ми працюємо із результатом змін
    !! все це асинхронні операції

    Якщо нам потрібно перестати слідкувати за елементом:
      observer.disconnect();

ResizeObserver - в цілому працює як і MutationObserver, але працює із змінами
    розміру елементу

*/
// #endregion

// #region 71 Параметри документа і вікна
/*
.clientWidth - равно 0 для инлайн элементов и элементов без CSS; 
    для всех остальных равняется ширине элемента в пикселях, включая padding,
    но исключая ширину рамки (border), внешние отступы (margin), и 
    вертикальную полосу прокрутки (если она есть).


Приклад, ми отримал зі сторінки box, в я кому є текст.
В стилях прописана ширина 400px і падінги по 10px, при цьому користувач
бачить скрол, так як весь текст не поміщаєтсья.

Якщо отримати в js ширину цього box
  const width = box.clientWidth;

  то ми отримаємо ширину 405, тому що 15 px займає скрол.

Але якщо в стилях прописати:
.box {
  box-sizing: border-box;
  ...
}

то в js при тих же умовах вже буде ширина 385.
Все тому що border-box змінює поведінку блочної структуру і 
падінги (по 10px) вже включаються в задану ширину 400. Ну і 15рх
все ще займає скрол. Але так зручніше рахувати.

Щоб враховувати margin при отримані ширини чи висоти:
  const width = box.offsetWidth;

  При всіх тих самих параметрах (margin був 0), ми отримаємо 400

Але при цьому висота буде 350, не дивлячись на те що текст в середині
box займає значно більше... саме тому є висота з урахуванням скролу:
const width = box.scrollWidth;

Практика: 
В нас є box в якому є багато текста який прихований в скролі 
і в нас є кнопка, яка показує весь текст:
  const box = querySelector('.box'),
        btn = querySelector('.button');

  btn.addEventListener('click', () => {
    box.style.height = box.scrollHeight + 'px';
  })

Найбільш часто на практиці використовується scrollTop та scrollLeft:
  Допомагає дізнатись скільки контента користувач вже проскролив.
  Але головна особливість:
    scrollTop та scrollLeft можуть бути модифіковані нами, навідміну від всіх попередніх.

Додаткова інформація 1:
  Отримуємо координати елемента:
    box.getBoundingClientRect(); - повертає:
      х: 640, // це місце де починається лівий верхній вугол
      y: 50,
      width: 400,
      height: 350,
      top: 50,
      right: 1040, // на відміну від css тут мається наувазі від лівой сторони до правой сторони елементи (тобто де закінчуєтсья наш елемент)
      bottom: 400,
      left: 640
    
    Якщо нам потрібне лише одне значення:
      box.getBoundingClientRect().top()
      
Додаткова інформація 2:
  Отримуємо стилі CSS:
    const style = window.getComputedStyle(box); \\ звертаємось саме до window і отримуємо об‘єкт із стилями
      computed - це стилі які вже застосовані для елементу.
      computed стилі можуть бути лише прочитані
    
    Щоб отримати кокретну властивість:
      style.display;
      або 
      const style = window.getComputedStyle(box).display;

-----------------------------------------------------------

Якщо нам потрібно отримати "скільки користувач вже проскроли сторінку":
  document.documentElement.scrollTop; // або так само все інше, як описано 
      вище для box

  Відповідно якщо ми хочемо проскролити сторінку:
    document.documentElement.scrollTop = 0; // сторінка проскролиться на 
        початок.

  Також для скрола сторінки у window є scrollBy & scrollTo:
    window.scrollBy(x, y) - це працює від поточної позиції, тобто якщо 
        задачати 'y' як 100, то при кожному спрацюванню буде скролитись на 
        100 px вниз
    window.scrollTo(x, y) - в цьому випадку скролиться до точних координат, і
        при кожному спрацюванню скрол буде в одне місце.


*/
// #endregion

// #region 68 Дати
/*
const now = new Date(); // поточна дата і час із системи: 2023-12-06T17:23:06.745Z

Як аргументи в Date() можна передавати:
  Date('2023-12-06') - рядоку, і якщо вивести в консоль, то час який ми не вказали буде записаний нолями
  Date(2023, 11, 6, 20) - можна передавати в якості параметрів рік, місяць, дату... головне в тій самій послідовності. 
    Важливо при такому записі, 06 записується як 6.
    Крім цього місяці рахуються з 0, а значить при записі 11, отримаємо 12-й місяць
    Час показуєтсья по грінвічу, відповідно якщо ми вказали 20 і в нас часовий пояс +3, то ми отримаємо 17:00
    
Таймстемп - задається в мілісекундах і бере відлік від початку 1970...
  Date(0) - ми передали 0 мілісекунд і в результаті отримаємо: 1970-01-01T00:00:00.000Z
  Любу дату можна трасформувати в мілісекунди і навпаки. Якщо нам потрібна дата раніше 1970, то записуємо від‘ємне значення 


Отриання певного компоненту дати:
    console.log(now.getFullYear()) - рік
    console.log(now.getMonth()) - місяць
    console.log(now.getDate()) - день
    так само години, хвилини...

    console.log(now.getDay()) - день тижня, але номерація починаєтсья неділі (0), відповідно субота (6)
    Всі ці методи повертають час по місцевому часу.
    Якщо потрібно отримати по грінвічу +0, то просто додаємо UNC:
    console.log(now.getUTCHours())

    console.log(now.getTimezoneOffset()) - показує різницю в хвилинах між поточним і UTC
    console.log(now.getTime()) - показує Таймстемп (відповідно мілісекунди від 1970-го року)

    Щоб конвертувати Таймстемп можна просто його записати в const now = new Date(Таймстемп) - і ми отримаємо дату і час


Методи встановлення дати
  тут все просто, get замінюємо на set.
    console.log(now.setHours(18)); // тепер якщо вивести час в консоль:
    console.log(now); // то ми побачимо час 18 годин... (моожна сказати перевели годинник на 18-у годину)

    Важливе уточнення, консоль орієнтується на UTC а браузер на час користувача.

    Другим аргументом можна передати хвилини:
      console.log(now.setHours(18, 40));

const now = new Date('2023-12-06'); // віддасть дату
new Date.parse('2023-12-06'); // те саме що і вище але за допомогою методу

Визначенн проміжку часу:
  let start = new Date();

  for (let i = 0; i < 100000; i++) {
    let some = i ** 3; // і в степені 3
  }

  let end = new Date();

  console.log(`Цикл відпрацював за ${end - start} мілісекунд);

*/
// #endregion

// #region 67 WeakMap & WeakSet - додатковий урок
/*
Приклад 1:
let user = {name: 'Ivan'};
user = null;

console.log(user); // отримаємо null і відповідно обєкт з ім‘ям вивантажиться з пам‘яті (на нього більше немає посилань).

Приклад 2:
let user = {name: 'Ivan'};

const arr = [user];
user = null;

console.log(user); // буде null
console.log(arr[0]); // так я ми зберегли "посилання" на об‘єкт, він буде доступний в масиві і відповідно не буде вивантажений з пам‘яті.

---------------------------------------------

WeakMap - 2 особливості: 
  1. Ключами можуть бути лише об‘єкти; 
  2. Якщо немає посилання на цей об‘єкт і він існує лише в середині WeakMap, 
     то цей об‘єкт буде видалений з WeakMap

WeakMap має менше методів ніж звичайний мар:
  .set, .get, .delete, .has

  Він також не має for of...

Тому для використання такої структури потібні певні умови, як приклад:
  тимчасове сховище об‘єктів в роботі сайту або додатку, або кешування даних.

Більш зрозумілий приклад:
  Є канал в телеграмі і нам постійно потрібно відслідковувати хто в онлайні, 
  а хто вийшов... На практиці:
    let cache = new WeakMap();

    function cacheUser(user) {
      if (!cache.has(user)) {
        cache.set(user, Date.now());
      }

    return cache.get(user);
    }

    let lena = {name: 'Elena'};
    let alex = {name: 'Alex'};

    cacheUser(lena);
    cacheUser(alex);

    lena = null;

    // так як посилання на lena перестало існувати, то з пам‘яті вигрузилась
    // lena і її більше не існує в нашій WeakMap.
    // таким чином всі хто в онлайні знаходять у WeakMap, а хто вийшов, 
    // автоматично видаляються.

---------------------------------------------
---------------------------------------------

WeakSet:
  1. Аналогічна звичайному Set, але у WeakSet ми можемо додавати лише об‘єкти.
  2. Об‘єкт існує в множині лише до тих пір, поки він десь доступний ще.

WeakSet підтримує методи:
  .add, .has, .delete - і все. При цьому його не можна перебрати.

Приклад використання:
  let messages = [
    {text: 'Hello", from: 'John'},
    {text: 'How are you?", from: 'Alex'},
    {text: 'I need your help...", from: 'Marry'}
  ];

  let readMessages = new WeakSet();

  readMessages.add(messages[0]);
  readMessages.add(messages[1]);

  readMessages.add(messages[0]); // нічого не змінить, бо сет записує унікальні значення

  console.log(readMessages.has(messages[0])); // отримаємо true

  // ну якщо ми наприклад за допопмого messages.shift() видалимо перші 2 
  // об‘єкти з масиву messages і знову викличимо readMessages.add(messages[0])
  // то вже отримаємо false, тому що WeakSet розуміє що більше немає об‘єкта
  // і помічає його на видалення

По своїй суті WeakMap і WeakSet це допомоміжні сховища для об‘єктів, які
керуються із якихось інших місць в коді. Важливо що тут ми працюємо лише з 
об‘єктами і якщо видалити посилання, то вони будуть видалені і з WeakMap або 
WeakSet
*/
// #endregion


// !!! Повернутись пізніше до 66
// #region 66 Збірник сміття і витік пам‘яті - додатковий урок
/*
Компилируемые языки - частіше за все це вбудовані додатки по типу word і тд.
  в них програма спочатку повністю переводиться в двійковий код, а потім
  виконується. Тобто вони створенні за допомогою програми компілятора.

интерпритируемые языки - коли програма інтерпритатор, наприкла браузер чи 
  термінал, по рядково заупускає наш код

Детальніше: https://nuancesprog.ru/p/12524/

Стаття про збірник сміття: https://learn.javascript.ru/garbage-collection

Глибоке розуміння роботи інтерпретаторів необхідно, коли вам потрібні 
низькорівневі оптимізації. Було б розумно планувати їх вивчення тільки 
як наступний крок після вивчення мови JavaScript.


Витік пам‘яті - це коли пам‘ять забивається тим що вже не використовується.
*/
// #endregion


// #region 65 setTimeout & setInteval
/*
Синтаксис для setTimeout:
  const timerId = setTimeout(function(){
    consol.log('hello');
  }, 2000)

  // Перший аргумент - функція яка має запуститись через певний час
  // Другий аргумент - задаємо час, в мс.

  Приклад рідкісного синтаксису:
    const timerId = setTimeout(function(text){
      consol.log(text);
    }, 2000, 'Hello") // результат той самий що і вище.

  Так само, можна в перший аргумент передавати вже готову функцію
  
  Запис через const робиться для того, щоб створити унікальний ідентифікатор
  таймеру, щоб наприклад в майбутньому можна було його зупинити. 
  
  Щоб зупинити таймер:
    clearInterval(timerId);


Практичний приклад:

  const btn = document.querySelector('.btn');

  function logger() {
    console.log('Hello');
  }

  btn.addEventListener('click', () => {
    // const timerId = setTimeout(logger, 2000); // !!! Важливо при такому запису, ми неможемо зовні визвати clearInterval(), тому що змінна задана локально в функції
    // якщо ми хочемо щоб функція спрацьовувала через певний інтервал:
    const timerId = setInterval(logger, 2000); // При такому записі ми теж не можемо зупинити спрацювання ззовні.
  });

  Для того щоб можна було керувати таймером чи інтервалом зовні, можна створити
  глобальну змінну, приклад:
    const btn = document.querySelector('.btn');
    let timerId; // створюємо глобальну зміну, без значення

    function logger() {
      console.log('Hello');
    }

    btn.addEventListener('click', () => {
      timerId = setInterval(logger, 2000); // тепер ми тут перезаписуємо раніше створену зміну, а значить можемо її використовувати зовні.
    });

    // clearInteval(timerId); - Все ще не буде працювати, тому що команда в потоці синхронного коду... а setInterval і setTimeout - асинхронні.
    ...
    Для того щоб це все спрацювало створимо ще один приклад:
      const btn = document.querySelector('.btn');
      let timerId,
          counter = 0; // створюємо лічильник

      function logger() {
        if (counter === 3) {
          clearInteval(timerId); // тепер clearInteval знаходиться в зоні спрацювання самого інтервалу.
        }
        console.log('Hello');
        counter += 1; \\ рахуємо кількість спрацювань функції
      }

      btn.addEventListener('click', () => {
        timerId = setInterval(logger, 2000); // тепер ми тут перезаписуємо раніше створену зміну, а значить можемо її використовувати зовні.
      });
  
Цікаве питання:
  Чим рекурсивний setTimeout краще setInterval?
    Рекурсивний setTimeout - це коли функція з таймеро викликає сама себе.

    Проблема setInterval, що після запуску він буде вічність працювати і сам 
      по собі нічого не знає про кількість спрацювань... Звідси з‘являється 
      не очікувана проблема, якщо інтевал стоїть 500, а функція з тяжкою
      логікою виконується 1 с., то виходить ситуація, що інтервал не буде 
      працювати... він буде спрацювувати відразу після того, як наша функція
      спрацює (так як функція відпрацьовує довше заданого інтервалу).

    Звідси і випливає перевага рекурсивного setTimeout, тому що в такому
      випадку, після спрацювання функції, запуститься нова яка має почату 
      відпрацювання після заданого таймауту.

  Приклад рекурсивного timeout:
    let id = setTimeout(function log() {
      console.log('Hello');
      id = setTimeout(log, 500);
    }, 500);

-----------------------------------------------------------------------------

Практика: передвигаємо квадрат

  const btn = document.querySelector('.btn');
  let timerId,
      counter = 0;

  function myAnimation() { // нижче буде старий метод використання анімації, але він ще робочий
    const elem = document.querySelecto('.box'); // наш квадрат
    let pos = 0; // наша стартова позиція

    conts id = setInterval(frame, 20);

    function frame() {
      if (pos === 300) {
        clearInterval();
      } else {
        pos++

        // Щоб перемістити наш квадрат в рамках його квадратної області (обгортки)
        // на протилежний вугол, нам потрібно змінювати його top і left.
        // В CSS в box position: absolute; в середині обгортки, в якої
        // position: relative; тому ми можемо розрахувати на скільки px
        // нам потрібно змістити box, тому що його висота і ширина 100 рх,
        // а обгортки - 400 рх... відповідно зміщує на 300 рх.
        
        elem.style.top = pos + "px";
        elem.style.left = pos + "px";
      }
    }
  }

  btn.addEventListener('click', myAnimation());

-----------------------------------------------------------------------------

*/
// #endregion

// #region 63 ClassList & делегування подій
/*
Уявимо що у нас є сторінка де є кілька кнопок.
У кнопок є класи.

const btns = document.querySelectorAll('button');

console.log(btns[0].classList.length); - виведе кількість класів
console.log(btns[0].classList.item(0)); - вивидить клас під 0 індексом
console.log(btns[0].classList.add('red')); - додасть клас .red
console.log(btns[0].classList.remove('blue')); - видаляє клас .blue
console.log(btns[0].classList.toggle(0)); - якщо клас вже є, то ми toggle 
                                            видалить його, якщо не було - 
                                            додасть

Можна додавати скільки завгодно класів:
.classList.add('red', 'black');

Класи можна використовувати в умовах:
.classList.contains('red'); - повертає нульове значення: true - такий клас є

Використання .contains дозволяє нам динамічно змінювати сторінки, приклад
гамбургер меню: ми перевіряємо чи є клас active і відкриваємо, або закриваємо.

Приклад:

btns[0].addEventListener('click', () => {
  if (!btns[1].classList.contains('red')) {
    btns[1].classList.add('red');
  } else {
    btns[1].classList.remove('red');
  }
})

або можна спростити і записати так:
btns[0].addEventListener('click', () => {
  btns[1].classList.toggle('red');
});
але в реальності в складних скриптах, такий запис рідко стає в нагоді, частіше
зустрічаються випадки коли нам потрібно саме перевіряти наявність класу, як
у першому варіанті.


Делегування подій:
Приклад:
const btns = document.querySelectorAll('button'),
      wrapper = document.querySelectorAll('.btn-block'); // обгортка для наших кнопок

wrapper.addEventListener('click', (event) => {
  if (event.target && event.target.tagName == 'BUTTON') { 
    console.log('hello');
  }
});

Коментарі:
event.target - потрібен для того, щоб скрипт точно правильно працював, бо існують 
               елементи які не реагуються на 'click' (гуглова рекомендація)

.tagName == 'BUTTON' - записуєтсья саме капсом (така особливість), хоч назва 
                       класу записана малими буквами

Приклад №2 з classList
const btns = document.querySelectorAll('button'),
      wrapper = document.querySelectorAll('.btn-block'); // обгортка для наших кнопок

wrapper.addEventListener('click', (event) => {
  if (event.target && event.target.classList.contains('blue')) { 
    console.log('hello');
  }
});
// Такий обробник буде спрацьовувати лише якщо у кнопки, на яку ми натискаємо
// є слас .blue

Таим чином ми делегуємо подію з батька на дитину

І ще один додатковий приклад:
const btns = document.querySelectorAll('button'),
      wrapper = document.querySelectorAll('.btn-block'); // обгортка для наших кнопок

wrapper.addEventListener('click', (event) => {
  if (event.target && event.target.matches('button.red')) { 
    console.log('hello');
  }
});

Коментарі:
.matches() - перевіряє співпадіння
.matches('button.red') - перевіряє не просто клас, а селектор який нас цікавить
*/
// #endregion

// ------------- Розділ 4 JS в роботі ----------------------------------------

// #region 60 **Set
/*
Set - дозволяє зберігати унікальні значення любого типу, будь то
  примітиви чи посилання на об‘єкти

Set - як і map, колекція значень. Значення в set може зустрічатись тільки
  один раз і воно завжди унікальне в колекції.

Якщо максимально спростити: 
  то це масив де кожне значення зустрічається лише 1 раз

Наглядний приклад:
  const arr = [1, 1, 2, 2, 4, 5, 6, 5];

  const set = new Set(arr);
  console.log(set); \\ Результат масив з унікальними занченнями: [1, 2, 4, 5, 6]

Методи:
  set.add('нове значення') - додає новий елемент в масив, якщо спробуємо додати
    елемент який вже існує в set, то нічого не відбудеться.
  
  set.delete(value) - видаляє вказаний елементу
  set.has(value) - повертає true якщо знайде такий елемент, або false
  set.clear() - очищає колекцію
  set.size - властивість яка означає кількість елементів

Перебір за допомогою for of:
  for (let value of set) {
    console.log(value);
  };

Перебір за допомогою forEach:
  set.forEach((value, valueAgain, set) => { // другий аргумент valueAgain це той самий value, так реалізовано для одноманітності...
    console.log(value, valueAgain); // отримаємо список дублів кожного значення
  })

Для зворотньої сумісності з маp можна використовувати:
  set.values() - віддає список елементів
  set.keys() - так як у нас по суті звичайний масив, то ключів як таких немає, тому віддає те саме що і values;
  set.entries() - отримаємо масив з масивами в яких будуть дублі ключ і значення. В реальності не використовуєтсья


Досить часто використовують функцію-помічника, яка фільтрує любий масив:
  function unique(arr) {
    // return new Set(arr); - це поверне set, а нам потрібен звичийний масив, тому:
    return Array.from(new Set(arr));
  }

Додаткова інформація:
  У масива є метод .find() - повертає значення першого знайденого елементу в масиві
*/
// #endregion

// #region 59 **Map (object to array)
/*
Map - це колекція ключ/значення, як Object. Але відмінність в тому що
Мар дозволяє використовувати ключ любого типу (навіть об‘єкт може бути ключем).

Методи і властивості
new Map() - створює колекцію
map.set(key, value) - записує по ключу key значення value (або створює новий ключ, якщо його не існувало)
map.get(key) - повертає значення по ключу або undefined
map.has(key) - повертає true, якщо такий ключи існує в колекції
map.delete(key) - видаляє елмент (пару ключ - значення)
map.clear() - очищає колекцію
map.size - повертає кількість елементів (це властивість а не метод, тому без () );


На практиці:
  const shops = [
    {rice: 500},
    {oil: 200},
    {bread: 50}
  ];

  const map = new Map(); // можна і відразу додати дані дани в map

  map.set(shops[0], 5000); // тепер у нас { {rice: 500}: 5000 } тобто об‘єкт в якого ключ є об‘єктом
  // так само можна set робити в циклі і таким чином наповнювати map

  Але можна уявити, що у нас є ще масив і нам потрібно об‘єднати shops і масив:
  const budget = [5000, 15000, 25000];

  shops.forEach((shop, i) => {
    map.set(shop, budget[i]);
  });

  Для використання даних з Мар:
    console.log(map.get(shops[0]); // отримаємо 5000
    console.log(map.has(shops[0]); // отримаємо true

По своїй суті, Map це масив масивів (візуально якось так [ [] ] );
  Приклад створення масиву:
    const map = new Map([
      [{paper: 400}, 8000] // так ми створюємо початкове значення.
    ]);


Практика перебору значень:
  --------------------------------
  for (let shop of map.keys()) {
    console.log(shop); // отримаємо список ключів (наші об‘єкти в середині map які являються ключами)
  };

  Більш практичний приклад, сформувати масив лише з назв товарів, які у нас в ключах:
    const goods = [];

    for (let shop of map.keys()) {
      goods.push(Object.keys(shop)); // тепер наш масив буде складатись із ключів-ключів [paper, rice, oil, bread] 
    };
  --------------------------------
  Перебор по значенню:
    for (let price of map.values()) {
      console.log(price); // отримуємо список значень, які ми брали з масиву budget 
    };
  --------------------------------
  Перебор по ключу і значенню
    for (let price of map.entries()) {
      console.log(price); // отримуємое масив де є ключ (він у нас у вигляді об‘єкта) і значення (budget);
    };

    Так як у нас price це об‘єкт, його можа відразу деструктуризувати
      for (let [shop, price] of map.entries()) {
        console.log(price, shop); // так ми можемо отримати іншу структуру: спочатку budget, а потім shop (об‘єкт який у нас був ключем)
      };
  --------------------------------
  Використати forEach який вже вбудований в map
    map.forEach((value, key, map) => {
      console.log(key, value); // отримаємо окремо ключ і значення
    });
----------------------------------

Перетворюємо об‘єкт в Map:
  const user = {
    name: 'Alex,
    age: 12,
    showInfo: function() {
      console.log(`${this.name} ${this.age})
    }
  };

  const userMap = new Map(Object.entries(user)); 
  //Object.entries(user) - створюює таку структуру яка потрібна для Мар - масив з масивів

Перетворюємо Map в об‘єкт
  const newUserObj = Object.fromEntries(userMap);

*/
// #endregion

// #region 58 ** Ітеровані конструкції (або об‘єкти)
/*
Урок стане більш зрозумілим після контексту виклику в JS.

for in - не завжди перебирає елементи по порядку, тому іноді при пероборі рядка
  може виникнути не правильна послідовність.

  При пероборі об‘єкта, for in перебирає ключи.

for of - перебирає значення (тому і методи не потрапляють в перебор),
  і послідовність завжди точна. (не перебирає об‘єкт)

Ітерований це той який ми можемо використовувати в for of. 
  або технічною мовою, це ті які мають Symbol(iterator).

Ітеровані об‘єкти: масиви, рядки, типізовані масиви, сет, меп і DOM колекції.

Щоб for of перебирав об‘єкт, потрібно вручну створити ітератор:
  Приклад:
    const salaries = {
      john: 500,
      ivan: 1000,
      ann: 5000,
      sayHello: function() {
        consol.log('Hello");
      }
    }

    salaries[Symbol.iterator] = function() {
      return {
        current: this.john,
        last: this.ann

        next() {
          if (this.current < this.last) {
            this.current += 500;
            return {done: false, value: this.current}
          } else {
            return {done: true}
          }
        }
      }
    }

    Способи взаємодії:
      1-й:
        for (let res of salaries) {
          console.log(res);
        }
      2-й ручний спосіб (може бути корисним всередині звичайного циклу):
        const iterator = salaries[Symbol.iterator]();
        console.log(iterator.next());

*/
// #endregion

// #region 57 ** Дескриптори властивостей (не для новачків)
/*
В кожної властивості об‘єкта, крім значення є ще атрибути (їх також називають ФЛАГАМИ):
  writable - якщо true то валстивість об‘єкта можна змінити
  enumerable - якщо true то властивість буде прераховуватись в циклах
  configurable - якщо true то властивість можна видалити, а атрибути видалити

Практика:
  const user = {
    name: 'Alex,
    age: 12,
    showInfo: function() {
      console.log(`${this.name} ${this.age})
    }
  }
  Для перегляду флагу:
    console.log(Object.getOwnPropertyDescriptor(user, 'name'));

  Для зміни:
    Object.defineProperties(user, 'name', {writable: false}) // статичний метод, деталі пізніше...
    після {writable: false} ми не зможемо змінювати наш об‘єкт.

    За допомогою .defineProperties() можна створювати нові властивості і при 
    цьому відразу задавати налаштування флагів (але при такому створені 
      властивостей, всі флаги по замовчуванню false), приклад:
      Object.defineProperties(user, 'gender', {value: 'male'})

  Щоб записати відразу для багатьох
      Object.defineProperties(user, { 
        name: {writable: false},
        age: {writable: false}
      })


Інші корисні методи об‘єктів
  Object.preventExtensions() - після застосування, більше не можна буде розширювати об‘єкт (додавати нові властивості)
  Object.seal() - крім блокування розширення, щей встановлює configurable: false для всіх властивостей, але при цьому дозволяє змінювати властивості
  Object.freeze() - заморожує об‘єкт в тому вигляді в якому він є. configurable: false і writable: false
  Object.isExtensible() - перевіряє чи дозволене розширення об‘єкта... так само є .isFrozen та .isSealed
  
  !!!
  Одне з правил, що об‘єкт ніколи не дорівнює іншому об‘єкту, але є метод який їх порівнює:
  Object.is

  !!!
  Object.keys() - створює масив із перераховуваних властивостей об‘єкта (ті в яких enumerable: true)
  Object.values() - подібний, але тут масив із властивостей 
  Object.entries() - подібний до попередніх 2-х, але формує масив із масивів [key, value]

Пам‘ятаємо, що символи не перераховуються.
*/
// #endregion

// #region 56 ** Символи (не для новачків)
/*
Основне місце застосування це в назвах властивостей об‘єкта
тому що там можна використовувати або рядоку, або сивол

const obj = {
  'name': 'Test'
}

let id = Symbol("id");
obj[id] = 1;

console.log(obj); - покаже нам: {name:'Test', Symbol(id):1}

Символи завжди унікальні і не дорівнюють одне одному, навіть якщо 
візуально однакові.

Основна перевага символі, це те що при переборі об‘єкта, символи не 
відображаються, що дозволяє нам створювати скриті властивості.

Але є можливості виводити символи на зовню:
  Як варіант в середині об‘єкта методі, який будет return this[наш символ]
  або
  console.log(Object.getOwnPropertySymbols(наш об‘єкт)); - отримаємо масив із символами

Основна причина, чому використовують символи:
  це дозволяє майже гарантувати, що якась властивіть не буде перезаписана
*/
// #endregion

// #region 55 Живі колекції
/*
При використанні querySelectorAll ми отримуємо nodeList, яка є статичною
колекцією. Тобто в момент створення формується псевдомасив.

А от при використанні getElementsByClassName (і йому подібних), ми отримуємо
HTMLCollection, яка є живою колекцією. Тобто вона завжди показує фактичний 
стан DOM дерева. Наприклад, якщо ми створимо псевдомасив в якому будуть 3 div
в момент створення, видалимо 2 і лише потім виведомо в консоль наш масив, то 
ми побачимо, що він буде складатись з 1-го елементу.

В переважній більшості випадків, перший спосіб нас буде влаштовувати, але
може бути ситуація, коли нам потрібно відслідковувати зміни.

Перетворюємо масиво-подібний елемент в масив:
  Array.from(наш об‘єкт); - так ми створимо масив. Але коли ми Перетворюємо
    псевдомасив в звичайний, то створюється вже статичний масив.


Додаткова інформація
Якщо ми хочемо отримати елемент в якго є додатковий клас:
  const boxes = document.querySelectorAll('.box');

  boxes.forEach(box => {
    if (box.matches('.this')) {
      console.log(box); // таким чином ми отримаємо той box в якого є 2 класа: box та this
    }
  })

Closest - найблищий елемент
  Наприклад у нас в html є wrapper в середині якго є 3 box:
    console.log(boxes[0].closest('wrapper')); ми отримаємо наш div wrapper з усім його вмістом, іншими словами отримали батька.
    А якщо closest нічого не знаходить, то ми отримуємо null
*/
// #endregion

// #region 53 - 54 Нульового злиття та Опційна ланцюжка
/*

?? Нульового злиття

  let userName;
  console.log(userName ?? 'User'); - так як userName == undefined, то виводить 
  User.

  Оператор ?? дуже схожий на || але він працює лише з null або undefined.
  Тобто, якщо в першому аргументі null або undefined, то буде переданий 
  2-й результат (той що після ??).

  Можна використовувати кілька перевірок: 
    console.log(userName ?? login ?? 'User');

  Приорітет у ?? такий самий як і у ||.
  Не можна в середині одного виразу використовувати && і ??


Оператор Опційного ланцюжка
  console.log(block?.textContent);
    Це виглядає майже так, як ми запитуємо чи існує block, якщо так
    то ставимо крапку і виводимо те що йде після крапки. Або видає
    undefined, як результат
    По своїй суті це те саме що:
      if (block) {
        console.log(block.textContent);
      }

    Це працює лише для читання, при спробі запису, отримаємо помилку.

  Ще приклад, коли ? буде корисний:
    const userData = {
      name: 'Bob',
      age: 23
    }

    console.log(userData.skills.js); - видасть помилку, так як skills 
                                       не існує. Раніше щоб не отримувати 
                                       помилку записували складні if конструкції
    if (userData && userData.skills && userData.skills.js) {
      console.log(userData.skills.js);
    }

    Такий if складний, тому можна спростити за допомогою ?
      console.log(userData.skills?.js) - при такому записі, оператор ? 
        спочатку перевірить чи існує .skills і якщо вона існує, код піде далі,
        а якщо не існує отримаємо undefined
    
  Таким же чином можна перевірити чи існує функція:
    userData.hey?.(); - використовується повний запис ?., так як у нас немає
      такого методу, то така функція просто не спрацює (ми не отримаємо нічого)
*/
// #endregion

// #region Ресурси для практики
// 1. https://www.codewars.com/
// 2. https://leetcode.com/
// 3. https://www.hackerrank.com/
// 4. https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures#basic-javascript
// #endregion

// #region 50 Async, defer і динамічні скрипти
/*
defer записуємо в html:
  <script defer src="js/script.js"></script>

defer - повідомляє браузер, що він має продовжувати оброблювати сторінку і
  і завантажувати скріпт у фоновому режимі, а потім запустити скріп, коли він 
  завантажиться.

Скріпти з defer ніколи не блокують сторінку, а друга його особливість в тому, що
  такі скріпти виконуються лише після того як DOM дерево готове. (Фактично вони 
  виконуються до DOMContentLoaded, хоч на практиці це не важливо).


asynk записуємо в html:
  <script asynk src="js/script.js"></script>

Особливості:
  1. Сторінка не чекає асинхронні скріпти зміст просто опрацьовується в відображається
  2. Він завантажується в фоновому режимі і відразу опрацьовуєтсья
  3. Він не чекає інші скрипти, а інші - не чекають його. Виконуються незалежно


Ще один спосіб додавання скріпта в HTML, через JS:
    const script = document.createElement('script');
    script.src = "js/test.js";
    document.body.append(script);

    Завантажені таким чином скрипти поводять себе, як async - вони нікого не чекають.
    Щоб це виправити, ми можемо перед document.body.append(script); написати:
      script.asynk = false;

    Більш приближений до реальності приклад:
      function loadScript(src) {
        const script = document.createElement('script');
        script.src = src;
        script.asynk = false;
        document.body.append(script);
      }
      loadScript("js/test.js");
      loadScript("js/some.js");
    Так як у нас async = false, то вони будуть виконуватись суворо одне за одним
*/
// #endregion

// #region 49 Події на мобільних пристроях
/*
По замовчуванню браузер на мобільних пристроях добре справляється з такими 
подіями, як click.

Всього 6 touch подій
  1. touchstart - тільки тапули
  2. touchmove - тапнули і потягнули
  3. touchend - тапнули і забрали палець
  4. touchenter - коли ведемо палець по екрану і попадаємо на елемент
  5. touchleave - доповнення до попереднього
  6. touchcancel - коли точка дотику більше не реєструється на поверхні (як приклад, при свайпі палець виходить за межі браузера)

window.addEventListener('DOMContentLoaded', () => {
  const box = document.querySelector('.box'); \\ простий дів із стлями

  box.addEventListener('touchstart', (e) => {
    e.preventDefault(); // рекомендується завжди встановлювати, щоб уникнути непередбачуваних спрацювань

    console.log('start');
  });
});

Наш (e) при роботі з сенсорними пристроями має особливі властивості:
  touches - видає список всіх точко торкання (скільки пальців торкається екрану)
    Якщо вивести в консоль, то отримаємо: TouchList {0: Touch, length: 1}

  targetTouches - показує список, скільк пальців торкається нашого елементу

  changedTouches - список пальців які приймають участь в поточній події. 
    приклад, якщо торкалось 5, а один прибрали, то спрацює

  Приклад використання:
    window.addEventListener('DOMContentLoaded', () => {
      const box = document.querySelector('.box'); \\ простий дів із стлями

      box.addEventListener('touchstart', (e) => {
        e.preventDefault(); 

        console.log(e.targetTouches[0].pageX'); // буде виводити координати начого тапу
      });
    });

  В реальності рідко приходиться писати складні скрипти сами, для цього 
  використовують готові скрипти, приклад: hammerjs.github.io

  Інформація яку ми можемо отримати по пальцю:
    identifier - унікальний ідинтифікатор дотику
    target - об‘єкт який торкнулись
    PageX, PageY - координати дотику на сторінці

  Ще корисні статті по темі (ру):
    https://habr.com/ru/companies/sibirix/articles/227175/
    https://youon.ru/%D0%90%D0%BD%D0%B4%D1%80%D0%BE%D0%B8%D0%B4/%D0%A0%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0/touch-sobytiya-na-javascript-multitach-realizatsiya
*/
// #endregion

// #region 47 Рекурсія
/*
Рекурсія - функція яка всредині визиває сама себе

Класичний приклад, визначення степені:
  Варіант 1:
    function pow(x, n) {
      let result = 1;

      for (let i = 0; i < n; i++) {
        result *= x;
      }

      return result;
    }

  Варіант 2 з рекурсією:
    function pow(x, n) {
      if (n === 1) { // один в даному прикладі є базою рекурсії, коли наш n стане 1 тоді і зупиниться рекурсія
        return x
      } else {
        return x * pow(x, n-1)
      }
    }

  Крок рекурсії - у прикладі вище кожного разу n - 1, і один прохід і є кроком.
  Глибина рекурсії - скільки всього є кроків


Більш важкий задача:

  Додаткова інформація:
  // Object.values() - метод повертає масив значень перерахованих властивостей
  // об‘єкта в тому ж порядку що і цикл for in. Різниця між циклом в тому, що
  // цикл також перераховує властивості із цепочки прототипів.

  // Array.isArray() - метод який повертає true, якщо аргументов являється масив

======================================================================
Сам приклад:

----- Об‘єкт для прикладу --------------------------------------------
let students = {
  js: [{
    name: 'John',
    progres: 100
  }, {
    name: 'Ivan',
    progress: 60
  }],

  html: {
    basic: [{
      name: 'Peter',
      progress: 20
    }, {
      name: 'Ann',
      progress: 18
    }],

    pro: [{
      name: 'Sam',
      progress: 10
    }]
  }
};

----- За допомогою циклу ---------------------------------------------

function getTotalProgressByIteration(data) {
  let total = 0;
  let students = 0;

  for (let course of Object.values(data)) {
    if (Array.isArray(course)) {
      students += course.length;

      for (let i = 0; i < course.length; i++) {
        total += course[i].progress;
      }
    } else {
      for (let subCourse of Object.values(course)) {
        students += subCourse.length;
        
        for (let i = 0; i < subCourse.length; i++) {
          total += subCourse[i].progress;
        }
      }
    }
  }

  return total / students;
}
console.log(getTotalProgressByIteration(students));



----- За допопмогою рекурсії ----------------------------------------

function getTotalProgressByRecursion(data) {
  // база рекурсії буде масив, бо в ньому ми вже можемо порахувати студентів і прогресс
  if (Array.isArray(data)) {
    let total = 0; // в даному випадку тотал нам потрібен, а кількість студентів ми вирахуємо за допомогою довжини масиву

    for (let i = 0; i < data.length; i++) {
      total += data[i].progress;
    }

    return [total, data.length]; // повертаємо масив з нашим тотал і кіллькістю студентів
  } else { // в елс в 100% піде об‘єкт
    let total = [0, 0]; // проміжний результат

    for (let subData of Object.values(data)) {
      const subDataArr = getTotalProgressByRecursion(subData);
      total[0] += subDataArr[0];
      total[1] += subDataArr[1];
    }
    return total;
  }
}

const result = getTotalProgressByRecursion(students);
console.log(result[0]/result[1]);

*/
// #endregion

// #region Навігація по DOM
/*
document.body - доступ до body

document.documentElement - Доступ до тега html

document.body.childNodes - ноди які являються дітьми body
Результат це псевдомасив який складаєтсья:
  текст - це може бути навіть перенос рядка
  div
  comment
  script
  і тд.

document.body.firstChild - перша нода в середині body
document.body.lastChild - остання нода в середині body
або аналоги які видають лише елементи:
document.body.firstElementChild
document.body.lastElementChild

Все вище, ми відштовхувались від батьківського елементу.

Тепер отимаємо батька, сосіда і дітей:
  document.querySelector('#id').parentNode - отримаємо батьківський елемент нашого елемента id
  Так само ми можемо отримати елемент вище:
    document.querySelector('#id').parentNode.parentNode
  Щоб отримати саме елемент:
    document.querySelector('#id').parentElement

Нові атрибути в HTML 5: data-атрибути
  допомагають орієнтуватись в структурі
  ситаксис такий data-current замість current можна писати все що завгодно
  і цому можна назначиати будь яке значеня.

  Щоб отримати доступ в js:
    document.querySelector('[data-current="3"]'); - 3 це занчення прописане в html

  Якщо нам потрібно отримати наступний (сусідній) елемент нашого data-current="3":
    document.querySelector('[data-current="3"]').nextSibling
  або попереднього:
    document.querySelector('[data-current="3"]').previousSibling

  Команди вище видають наступні чи попередні ноди, але досить часто ця нода являється 
  переносом рядка, яка нам не потрібна. Тому є аналоги:
    document.querySelector('[data-current="3"]').nextElementSibling
    document.querySelector('[data-current="3"]').previousElementSibling

  Для childNodes немає аналога який би видавав лише елементи, тому є 
  ручний спосіб:
    for (let node of document.body.childNodes) {
      if (node.nodeName == '#text') {
        continue // пропустить виконання цикла
      }
      console.log(node) // виведе лише елементи, але тако ж попадуть коментарі, бо вони не текстові ноди. 
    }
  */
 // #endregion

// #region 45 Подіїї і їх обробники 
/*
Подія - це сигнал від браузера що у нас щось відбулось.

--> Список подій JS: https://oddler.ru/blog/i63

Обробник подій, це функція яка виконується, коли відбулась подія

3 способи назначити обробника подій:
1. html атрибут, наприклад
  <button onClick="alert('Click')" id="btn">Click me</button>
  Обробник подій завжди починається з 'on'
  Але в реальних проектах цей спосіб не використовується і не рекомендується

2. Використовувати властивість DOM дерева
  const btn = document.querySelector('button');

  btn.onClick = function () {
    alert('Click');
  };
  Цей спосіб теж майже не використовується, так як він не дозволяє 
  виконовати 2 різні дії по одній події (виконується завжди остання).
  Крім цього досить часто івенти необхідно видаляти після їх спрацювання,
  а такий запис не дозволяє це зробити.

!!!!!! Рекомендується використовувати !!!!!!!!
3. За допомогою addEventListener та removeEventListener
  btn.addEventListener('Назва події', () => {
    код...
  });

  Назва події записується без 'on'! Приклад:
  btn.addEventListener('click', () => {
    alert('click');
  });

  Перший аргумент в функції завжди об‘єкт виконання, зазвичай записують як
  event або просто e. Як і у всіх о‘єктів у нього є свої властивості.
  Приклад використання:
  btn.addEventListener('click', (e) => {
    console.log(e.target); - вивиде кусок html: <button id="btn">Click me</button>
    e.target.remove(); - видалить кнопку з html
  });

  Щоб видалити EventListener потрібно використати removeEventListener,
  синтаксис такий самий. Але важлива умова, функція яка була другим аргументом
  має бути такою ж. Тому правильно записувати так:
    const deleteElement = (e) => {
      console.log(e.target);
    }
    btn.addEventListener('click', deleteElement);
    btn.removeEventListener('click', deleteElement); 
  Але при такому записі нічого не відбувається, так як ми додаємо і відразу
  видаляємо обробник, тому більш реалістичний приклад:
    let i = 0;

    const deleteElement = (e) => {
      console.log(e.target);
      i++
      if (i == 1) {
        btn.removeEventListener('click', deleteElement); 
      }
    }
    btn.addEventListener('click', deleteElement);
  Таким чином наш івент спрацює лише раз
    

Всплиття подій - це коли обробник подій спочатку спрацьовує на вкладеному 
елементі, потім на батківському і так далі піднімається по ієрархії


2 способи відміни стандартної поведінки браузера
  1. Яким вже майже ніхто не користується в кінці функції return false
  2. Використовуємо об‘єкт який є в події:
      const link = document.querySlector('a');

      link.addeventListener('click', (event) => {
        event.preventDefault(); - Розміщується на початку функції і зупиняє браузер від виконання дефолтної поведінки
        console.log(event.target);
      }) - з там обробником ми не будемо переходити по ссилці, а просто будемо виводити тег а в консоль

Щоб один обробник навісити на кілька кнопок, використовуємо forEach:
      const btns = document.querySelectorsAll('button');

      btns.forEach(btn => {
        btn.addEventListener('click', deleteElement)
      });


В .addEventListener() є ще 3й аргумент ʼопціяʼ
https://developer.mozilla.org/ru/docs/Web/API/EventTarget/addEventListener#options:~:text=%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D1%8F%20JavaScript.-,options,-%D0%9D%D0%B5%D0%BE%D0%B1%D1%8F%D0%B7%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9
приклад:
btns.forEach(btn => {
        btn.addEventListener('click', deleteElement, {once: true})
      });

*/
// #endregion

// #region 43 Дії з елементами на сторінці
/*

const box = document.getElementById('box'),
      btns = document.getElementsByTagName('buttons'),
      circles = document.getElementsByClassName('circles'),
      hearts = document.box.style.cssTex:('.heart'),
      oneHeart = document.querySelector('.heart'),
      wrapper = document.querySelector('wrapper');

Щоб переглянути об‘єкт в консолі: console.dir(box);
Всі властивості в об‘єкті style це inline властивості, і все що описане нижче
це про роботу з inline властивостями.

box.style.backgroundColor = 'blue'; // всі властивості які записуються в html
                                    // через дифіс, в js записуються за допомогою
                                    // кемел кейс

Щоб додати відразу багато стилів є cssText:
box.style.cssText = 'background-color: blue; width: 500px';

При використанні cssText потрібно використовувати написаня, так як ми б це писали
html, тому в '' ми пишемо вже через дифіс.

Крім цього можна використовувати такий запис:
box.style.cssText = `color: ${var}px`;

Якщо нам потрібно одні і ті ж дії виконати над різними елементами, можна
використати цикл for, або якщо ми використовували .box.style.cssTex то 
можемо використовувати for each.

Основні методи для роботи з елементами на сторінці:

Наприклад в реакті весь сайт будується на скриптах, тому важливо вміти створювати
нові елементи:

  const div = document.createElement('div'); 

таким чином в JS буде створений елемент, який буде існвати лише в JS.

Дуже рідкісний випадок, коли потрібно передати текст без текстових тегів:
const text = document.createTextNode('Наш текст');

Node - правильна назва елементів на сторінці.

Ми використовуємо дерево DOM для додавання чи видалення елмента. Ми використовуємо
інші елменти, щоб орієнтуватись куди вставити наш лемент.



.....Сучасні методи для роботи зі сторінкою........

document.body.append(div) - додаємо вище створений дів, в кінець нашого body

Або ми можемо отримати доступ до певного елементу і відразу додати дів в нього:
  document.querySelector('wrapper').append(div); - дів додається в кінець wrapper
  або те саме якщо у нас wrapper збережено у змінну:
    wrapper.append(div);

wrapper.prepend(div); - додаж дів на початок

Також є before і after які вказують перед або після якого елементу:
  herats[0].before(div); - дів буде додано перед першим heart
  herats[0].after(div); - дів буде додано після першого heart

Видалення елемента зі сторінки:
circles[0].remove();

Заміняємо 1 елмент іншим:
herats[0].replaceWith(div); - спочатку вказуємо який хочемо замінит, потім яким.
Якщо елмент яким ми намагаємось замінити інший елемент вже був на сторінці, то
він буде переміщений в нове місце (на старому місці його вже не буде).



.....Старі конструкції........

Аналог append()
  wrapper.appendChild(div);

Вставляємо елемент перед іншим елементом:
  wrapper.insertBefore('аргумент 1', 'аргумент 2');
    Аргумент 1 - це елемент який ми хочемо додати
    Аргумент 2 - це елемент перед яким ми хочемо додати наш аргумент 1

Видалення елемента
  wrapper.removeChild(herats[1]); - спочатку потрібно отримати доступ до 
                                    батьківського елменту, а потім вказати 
                                    який саме елемент потрібно видалити.

Заміна
  В новій версії - herats[0].replaceWith(div) - ми вказуємо 2 аргумента,
  який замінити і на який.

  Раніше було так:
    wrapper.replaceChild('аргумент 1', 'аргумент 2');
      Аргумент 1 - Елмент на який ми хочемо замінити
      Аргумент 2 - Елмент який буде заміненим

Додаємо контент в наш елемент: wrapper.append(div);
  Додаємо текст:
    Перший варіант:
      div.inerHTML = "Hello world"; - по суті дозволяє вписувати html структуру:
        div.inerHTML = "<h1>Hello world</h1>"";

    Другий варіант
      div.textContent = "Hello"; - Працює лише текст, html структура вже не підійде
      Цей варіант особливо корисний коли ми працюємо з текстом отриманим від 
      користувача. Він забезпечує що буде відображено саме текст, а не html 
      структура, яка може поламати верстку.


Вставляємо кусок html кода перед або після елементу
div.insertAdjacentHTML('', '<h2>Текст</h2>') - приймає 2 аргументи.
  1й аргумент визначає де буде вставлено div: afterbegin, afterend, beforebegin, beforeend
  2й це наш код html у вигляді рядка, який хочемо вставити.

  Приклади:
    додає текст h2 перед div
      div.insertAdjacentHTML('beforebegin', '<h2>Текст</h2>');

    додає текст h2 першим елементом в середині div (по аналогії з prepend)
      div.insertAdjacentHTML('afterbegin', '<h2>Текст</h2>');

    додає текст h2 останнім елементом в середині div (по аналогії з append)
      div.insertAdjacentHTML('beforeend', '<h2>Текст</h2>');

    додає текст h2 після div
      div.insertAdjacentHTML('afterend', '<h2>Текст</h2>');
*/
// #endregion

// #region 42 Отримання елементів зі сторінки
/*
document.getElementById('id') - отримання елементу по ID

document.getElementsByTagName('tagName') - формуєтсья псевдомасив з усіма вказаними тегами.
                                          в консолі браузера це буде виглядати так
                                          HTMLCollection("кількість елементів") [tagName, tagName]
-- Нагадування, псевдомасив це той самий масив але без методів

Щоб отримати доступ до конкретного tagName, використовуємо індекс:
const btns = document.getElementsByTagName('tagName')[1];
або в константі не вказуємо індекс, а вказуємо при використанні:
console.log(btns[1]);

document.getElementsByClassName('className') - назва класу вказується без крапки, так як 
                                              в самій команді вже прописано що це клас.
                                              В даному випадку теж отримуємо псевдомасив

------------------------------------------------------------------------------------------

Більш сучасні способи
document.querySelectorAll('селектор') - довзоляє отримати доступ до селекторів

Основні селектори:
* – любые элементы.
div – элементы с таким тегом.
#id – элемент с данным id.
.class – элементы с таким классом.
[name="value"] – селекторы на атрибут (см. далее).
:visited – «псевдоклассы», остальные разные условия на элемент (см. далее).

Посилання з описом всіх селекторів: https://learn.javascript.ru/css-selectors

!! Основна перевага querySelectorAll це те що він створює не HTMLCollection, а
NodeList в якого є метод forEach (при цьому він залишається псевдомасивом).

Приклад роботи:
const hearts = document.querySelectorAll('.heart');
hearts.forEach(item => {
  console.log(item);
}); 

В результаті ми отримаємо список з елементів псевдомасиву в такому вигляді:
<div class="heart">...</div>
<div class="heart">...</div>
<div class="heart">...</div>

document.querySelector('селектор') - отримуємо лише пирший знайдений селектор
*/
// #endregion

// #region 40 Замикання і лексичне середовище
// Замикання це функція яка запам‘ятовує свої зовнішні зміні і може отримати
// до них доступ. Щоб зрозуміти чому так відбувається потрібно засвоїти
// терміни: лексичне середовище і властивість Environment

// Лексичне середовище є не лише у функцій а у любого блоку кода

function createCounter() {
  let counter = 0;

  const myFunction = function() {
    counter = counter + 1;
    return counter;
  };

  return myFunction;
}

const increment = createCounter();
const c1 = increment();
const c2 = increment();
const c3 = increment();

console.log(c1, c2, c3); // результат: 1 2 3



// #endregion 

// #region 38 - 39
/*
Breakpoints - мітка яка допомагає зупиняти код в певному місці

Консоль розробника > Source
Щоб створити breakpoint просто клікаєм на потрібний рядок (наприклад
початковий рядок і кінцевий) і перезевантажуємо сторінку.

Також можна в самому файлі прописати debugger; і це створить свого
роду нативний брейкпоінт, який в браузері буде розпізнаватись.

  Function Declaration = коли функція задається у змінній

*/
// #endregion

// #region 36 ООП Об‘єктно орієнтоване програмування
/*
Коротко про різні підходи програмування:
Імперативне програмування: В основі цього підходу лежать інструкції, що
змінюють стан програми. Програміст визначає, які кроки потрібно виконати 
для досягнення конкретного результату.

Декларативне програмування: Програміст описує бажаний результат, а не 
послідовність дій для його отримання. Прикладами є SQL для роботи з базами
даних або React для розробки інтерфейсів.

Об'єктно-орієнтоване програмування (ООП): Програмування розглядається як 
маніпулювання об'єктами, які представляють реальні або абстрактні сутності, 
і мають власні дані та методи.

Функціональне програмування: Основний акцент робиться на функціях, які 
вважаються базовими блоками побудови програм. Підтримує ідеї неізменності 
даних та уникання побічних ефектів.

Процедурне програмування: Програмування структурується навколо процедур або 
функцій, які можуть бути викликані для виконання конкретних завдань.

Логічне програмування: Програмування базується на логіці і правилах. 
Примітний приклад - мова програмування Prolog.
----------------------------------------------------------------------------

Зв‘язуємо 2 об‘єкти:
  const soldier = {
    health: 400,
    armor:100
  }

  const john = {
    health: 100
  }

  Старий спосіб, щоб вказати зв‘язок який зараз не використовуєтсья:
  john.__proto__ = soldier; //depricated

  Тепер якщо console.log(john) - то ми отримаємо лише {health: 100}.
  Але разом з цим ми можемо console.log(john.armor) - і отримаємо 100,
  що показує нам що soldier є прототипом john.

  Реальний риклад, коли прототипи корисні:
    Створюємо прототип модального вікна, в якого є задані по замовчуванню
    ширина, висота, якийсь базовий функціонал (при кліку на хрестик, 
    закриваєтсья) і тд.
    Таким чином, ми після цього зможемо створювати нові вікна, в які зможемо
    прописувати їхні ширину, висоту і тд, але при цьомо зможемо використовувати
    ті значення, що були задані в прототипі, як значення по замовчуванню

  Зараз правильно використовувати:
  Object.create - створює об‘єкт з певним прототипом;
  Object.getPrototypeOf - отримує цей прототип;
  Object.setPrototypeOf - встановлює прототип

  На практиці це виглядає так:
    Якщо у нас вже є створений об‘єкти і потрібно йому назначити прототип:
      Object.setPrototypeOf(john, soldier) - перший аргумент: об‘єкт якому
              ми назачаємо прототип, а другий: прототип який ми назначаємо.
              Такий запис ідентичний устарілому: john.__proto__ = soldier;

    На практиці частіше ми знаємо, що прототипом john буде soldier, тому
    його назначають відразу при створені:
      const john = Object.create(soldier);


*/
// #endregion

// #region 35 Передача даних по ссилці і значенню, Spread оператор
/*
Приклад 1:
let a = 5,
    b = a;

b = b + 5; // в консолі буде b = 10 i a = 5.

Примітивні типи даних передаються по значенню. На прикладі, коли ми 
оголошували зміну b = а, то в неї фактично записалось значення а, в момент 
оголошення (5). 

Приклад 2:
const obj = {
  a: 5,
  b: 1
}

const copy = obg;
copy.a = 10; // В консолі буде copy.a = 10 i obj.a = 10

Коли ми працюємо з об‘єктами (об‘єкти, масиви, функції і тд.) передача
даних відбувається по ссилці і фактично копія об‘єкта не створюється.
Іншими словами коли ми записали const copy = obg - в copy  не записався новий
об‘єкт, а просто створилась ссилка на об‘єкт.

Щоб насправді копіювати об‘єкт можна використовувати:
  1. Цикл for in
    function copy (mainObj) {
      let objCopy = {};

      for (let key in mainObj) {
        objCopy[key] = mainObj[key];
      }

      return objCopy;
    }
    За допомогою такого цикл ми створимо справжню копію. 

    Але, якщо наш mainObj буде виглядати так:
      const numbers = {
        a: 5,
        b: 6,
        c: {
          x: 5,
          y: 7
        }
      }
    і ми створимо його копію за допомогою функції:
      const newNumbers = copy(numbers);

    а після цього спробуємо змінити значення x або y, то воно зміниться і в
    копії і в оригінальному об‘єкті "numbers.c". Все тому що таке копіювання,
    як ми використали в copy(), називається поверхневим. Так само спрацювалоб,
    якби numbers.c містив масив.
    
    Пізніше по курсу, розберемо, як створювати глибокі копії. 
    Тому тут приклади лише поверхневих копій.

  2. Копію за допомогою Object.assign('Перший об‘єкт (може бути {})', 'Об‘єкт, який ми додаємо'):
      const add = {
        a: 17,
        b, 20
      }
      const clone = Object.assign({}, add); // таким чином створюєтья поверхневе копіювання

Копія масива:
  const arr = [4, 3, 6, 7];
  const newArr = arr.slice(); // якщо не використовувати .slice, то буде посилання.

Способи, які прийшли в ES6 та ES8:
  Використовуєм спред оператор (ES6):
      cons video = [ 'youtube', 'vimeo'],
           blogs = ['wordpress', 'livejourmals', 'blogger'],
           internet = [...video, ...blogs, 'facebook'] // ... перед назвою масиву, розбирає масив на елементи. Відповідно в наш новий масив потрапляють окремі елементи з інших масивів.
      ще приклад:
        const array = ['a', 'b'];
        const newArray = [...array]; // поверхнева копія.

  Спред оператор для об‘єктів(ES9, хоча почав використовуватись раніше):
    sdfas 
      const q = {
        one: 1,
        two: 2
      };

      const newQ = {...q}; // поверхнева копія об‘єкта
*/
// #endregion

// #region Алгоритми:
// Книга "Грокаем алгоритмы".
// Приклади з книги написати на JS для тренування
// Перед співбесідой краще вивчити все це: https://web.archive.org/web/20221025084508/http://mathhelpplanet.com/static.php?p=javascript-algoritmy-poiska
// По ссилці вище в лівом сайдбарі є додаткові посилання по темі
// #endregion

// #region 33 Масиви і псевдомасиви
/*
console.dir() – дозволяє побачити всі властивості і методи 

const arr = [12, 2, 3, 16, 8];

arr.pop() - вирізає останій елемент в масиві
arr.push(10) - додає 10 в кінець масиву

shift() і unshift() - схожі на попередні але працюють з початкому масиву. 
Використовують рідко, бо вони впливають на весь масив (в усіх елементів
змінюється індекс)

Для перебору елементів в масиві можна використовувати звичайний for, або
for of (https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Statements/for...of):
for (let value of arr) {
  console.log(value);
}

for of дозволяє перебрати всі масиво подобні сущності. Наприклад можна 
перебрати: рядок, псевдомасив, .map, .set або навіть всі елементи на сторінці

arr.forEach() - теж дозволяє перебрати елементи всередині масиву. 
Приймає callback функцію, яка буде застосовуватись до кожного елементу масиву.
Ця функція може приймати 3 аргументи: елемент масиву, порядковий номер (індекс),
і третім аргументом може бути сам масив (приклад запису функції: function(item, i, arr))
arr.forEach(function(item, i, arr) {
  console.log(`${i}: ${item} всередині масиву ${arr}`);
})

forEach() - дуже часто використовується.
але у for of є 1 вагома перевага, в ньому можна використовувати break і 
continue, які дозволяють зупинити виконання циклу, коли нам це потрібно.
В інших випадках forEach() зручніший.

Є ще кілька методів, які перебирають масив, але всі вони крім перебору, ще 
модифікують наш масив (.map, .every/some, .filter, .reduce - будуть пізніше по курсу).

Ще 3 корисні методи: 
.split() - розділяє строку по певному знаку і формує масив
.join() - обєднує масив в рядок і приймає аргумент який буде розділювати елементи приклад: ", "
.sort() - сортує по алфавітному порядку, але лише рядки. Приклад сортування 
          цифр: 12, 16, 2, 3, 8. Все тому що спочатку сортує по першому символу, 
          потім по другому і так далі (в перших 2-х елементів перша цифра 1, 
          тому вони перші).
          Але sort може приймати callback функцію, за допомогою якої, ми можемо
          самі вирішувати, як буде сортуватись масив.

          Функція яка досить часто зустрічається:
          function compareNum(a, b) {
            return a - b;
          }

          тепер якщо ми можоме:
          arr.sort(compareNum); і наші числа стануть в нормальну послідовність

          про те як і чому працює ця функція і чому все з нею сортується, розписано 
          тут: https://algolist.ru/sort/quick_sort.php

Псевдомасиви
Коли ми працюємо з елементами на сторінці, ми будемо отримувати
псевдомасиви. Фактично це об‘єкт структура якого співпадає зі
структурою масиву, але з важливою особливістю: в псевдомасивах 
немає методів (не forEach, не .push і тд).

Шпаргалка по масивам:
https://drive.google.com/file/d/17D4THU5-UJtzihybKVjSDHeX67pz3xLR/view
*/
// #endregion

// #region 32 О‘єкти і деструктуризація
/*
Багато інфи про об‘єкти: https://javascript.ru/tutorial/object/intro

Об‘єкт для прикладу:
const obg = {
  name: 'test',
  width: 1024,
  height: 1024,
  colors: {
    border: 'black',
    bg: 'red'
  }
};

Видалення з об‘єкти:
delete obg.name;

Перебір всіх властивостей об‘єкта (буде стільки циклів скільки властивостей у об‘єкта).
(уточнення for of не буде працювати з об‘єктом)
for (let key in obg) {
  if (typeof(obg[key]) === 'object') { // перебір в середині перебору
    for (let i in obg[key]) { // obg[key] так як у нас цикли всередині if то ми знаємо що індекст key тут буде той що нам потрібен
      console.log(`Властивості ${i} має значення ${obg[key][i]}`); // obg[key][i] - таким чином ми отримуємо доступ до об‘єкти в середині об‘єкта
    }
  } else {
    console.log(`Властивості ${key} має значення ${obg[key]}`); // дає доступ до значення властивості

  }
}

Детальніше про for in: https://learn.javascript.ru/object#forin

Інший спосіб перебору - за допомогою рекурсії. Це буде далі в уроках.

Щоб отримати доступ до об‘єкта всередині об‘єкта:
console.log(obg['colors']['borders']);

В об‘єкта немає властивості .length, тому досить часто використовують змінну 
в яку записують скільки разів пройшов перебір і таким чином дізнаються 
кількість властивостей. Але це не найкращий спосіб.

Методи
!!! Object.keys(var) – бере об‘єкт і на його основі створює масив із всіх ключів.
 
 ----------------------------------------------------
| цей метод можна доповнити, щоб отримати кількість: |
| Object.keys(var).length                            |
 ----------------------------------------------------

В середину об‘єкта можна додати функцію, яка буде називатись метод. Приклад:
const obg = {
  name: 'test',
  width: 1024,
  height: 1024,
  colors: {
    border: 'black',
    bg: 'red'
  }
  makeTest: function() {
    console.log('test');
  }
};
obg.makeTest();

Деструктуризація (https://learn.javascript.ru/destructuring-assignment)
const {border, bg} =  obg.colors; \\ таким чином у нас з‘євляється дві нові змінні border і bg

В JS все йде від об‘єкта. Наприклад у рядка є метод toUpperCase, а все тому 
що на базовому рівні рядок теж об‘єкт і отримує цей метод через цепочку 
прототипів. Все тому що JS об‘єкто орієнтована мова і всі сущності зводяться 
до об‘єктів. В цілому по термінології програмування JS можна назвати більш
прототипно орієнтованим

Ще інфа про властивості і конфігурації об‘єктів:
https://learn.javascript.ru/object-properties
*/
// #endregion

// #region 30 .trim
// Дозволяє прибрати зайві пробіли
// #endregion

// #region 28 Методи і властивості
/*
Методи це допоміжні функцій.
Властивості це допоможні значення.

Приклади властивостей String:
.length

Приклад методу String:
.toUpperCase()
.toLowerCase()
.indexOf('буква або слово яке шукаємо') - рузультат індекс початку того що шукали (-1 означає не знайшло) - Правильна назва "пошук підрядка"

3 методи які взіємодіють з рядками:
1: .slice(індекс початку, індекс кінця(індекс зазначається як a < b, а не а <= b))
вирізає частину рядка. Якщо буде лише перший аргумент, то рядок буде вирізатись 
до кінця. Можна використовувати мінусові аргументи.

2: .substring() - майже те саме що метод вище. Не дозволяє використовувати мінусові 
значення і дозволяє щоб перший аргумент був більший другого (так не потрібно робити).

3: .substr(індекс початку, довжина скільки нам потрібно вирізати символів)

-----------------------------
Для Number є вбудована бібліотека Math

Приклади властивостей Number:


Приклад методу Number:
  Math.round(число яке будемо округлювати до найблищого цілого) - приклади 5.5 = 6, 5.4 = 5
  parseInt(наш рядок в якому є цифри, які ми хочемо витягнути) – приклади '12.2px' = 12
  parseFloat(як і метод вище, але повертає з десятими) - приклад '12.2px' = 12.2



Методи і властивості для string: 
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String

Методи і властивості для Number:
https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Number

*/
// #endregion

// #region 25, 26, 27 - Функції
/*
Замикання функції – це сама функція разом з усіма 
зовнішніми змінними, які їй доступні.

Стрілочна функція не має контекста визову, саме тому її 
частіше можна зустріти в обробниках подій

--------------------------------------

Хороша практика робити функція максимально незалежними, приклад:

const usdCurr = 28;

function convert(amount, curr) {
  return (curr * amount);
}

console.log(conver(500, usdCurr));

В прикладі вище, можна було зміну usdCurr записати відразу в 
функцію, але такий запис буде важче читати і функція буде менш 
універсальною (завжди буде залежати від змінної usdCurr).

Ще аргумент в користь запису функції, як в прикладі вище, те що 
у нас може бути багато таких змінних, як usdCurr, а значить у нас
вибір стає між створенням кількох функцій і однієї.

Цей принцип називається DRW - Don't repeat yourself
------------------

Якщо функція без return або return без значення, то така функція 
віддає undefined

Якщо в консоль написати console.log('22'); то ми отримаємо 22 та
undefind. А все тому що console.log це функція, без return.

Після return не можна ставити перенос рядка, тому що при виконанні
js може підставити ; і тоді наш код не спрацює. Приклад:

return
a + b;

*/
// #endregion

// #region 23 – Цикл в циклі
/*
Щоб невиникала колізія, у ложеному циклі використовують 
замість і – j (негласний стандарт), потім k і так далі.

Мій варіант вирішення:
let result = '';
const length = 7;

for (let i = 1; i < length; i++) {
  result += '*';
  console.log(result)
}

Варіант з уроку:
let result = '';
const length = 7;

for (let i = 1; i < length; i++) {
  for (let j = 0; j < i; j++) {
    result += '*';
  }
  result += '\n'; //перенос на новий рядок
}
------------------------------

Як зупинити вкладений цикл і продовжити основний?
Потрібно використати мітку, це може бути будь яке слово, 
в прикладі "first:"
first: for (let i = 0; i < 3; i++) {
  console.log(`First level: ${i}`)

  for (let j = 0; j < 3; j++) {
    console.log(`Second level: ${j}`)

    for (let k = 0; k < 3; k++) {
      if (k === 2) continue first;
      console.log(`Third level: ${k}`)
    }
  }
}
Таким чином за допомогою мітки, ми можемо вказати, 
що буде після пропуску чи зупинки
*/
// #endregion

// #region 22 - Цикли
/*
1. while - нічого нового

2. Спочатку заставляємо цикл щось зробити, а потім перевірити умову:
do {
  num++
}
while (num < 55);

3. for. 
Для того щоб примусово зупинити цикл, можна використати break:
  for (let i = 1; i < 8; i++) {
    if (i === 6) {
      break; 
    }
    console.log(i)
  }

Для того щоб пропустити крок є continue:
for (let i = 1; i < 8; i++) {
    if (i === 6) {
      continue; 
    }
    console.log(i)
  } // в такому випадку в консоль виведеться: 1 2 3 4 5 7 (6 пропускається)

*/
// #endregion

// #region 21 - Логічні оператори
/*
5 сутностей які завжди будуть false:
0
пустий рядок (якщо з пробілом, то вона вже не пуста і тому true)
null
undefined
NaN

Оператор && (і)
Приклад, 2 друга хоче гамбургер, а я хочу гамбургер і картоплю:
const hamburger = 2;
const fries = 1;

if (hamburger >= 3 && fries) { // fries нам не потрібно вказувати == 1, тому що якщо не одна з 5 сутностей вище, то значить це true і це більше 0 по замовчуванню.
  ...
}

Особливість
Якщо вивести умову в консоль, то вона видасть останнє значення, або те на якому перервалась перевірка:
console.log(1 && 0 && 2) – видасть 0, бо він входить в число сутностей які завжди false
console.log(1 && 2 && 5) - видасть 5, що буде загалом як true;
console.log(null && 0 && 1) - видасть null (далі перевірка не пішла);
console.log(0 && 1) – видасть 0.

З цього всього формується 2 правила:
Оператор && завжди віддає перше не правдиве значення, якщо воно є. На нього він запинається і наступні не перевіряє.
Якщо всі аргументи правдиві, то він віддає значення останнього аргументу.

-------------------------------------------------

Оператор || (або)
Приклад, щоб залишитись в закладі, нам потрібно щоб там було хоч щось.
const hamburger = 3;
const fries = 0;
const cpla = 0;

if (hamburger || cola || fries) { 
  Віддає перше правдиве значення. Як тільки оператор || зустрів true він зупиняється і не перевіряє всі інші.
  Якщо все не правда, то повертається останнє значення.
}
 
*/
// #endregion

// #region 20 - Умови
/*
const num = 50; // змінна для прикладу
 
Приклад запису умови за допомогою if:
if (a === a) {
  console.log('a')
} else if (b === b) {
  console.log('b')
} else {
  console.log('else')
}

Тернальний оператор:
(num === 50) 
? console.log('ok')
: console.log('error');
Тернальний тому що складається з 3-х аргументів: умова, ? правда, : не правда

Бінарний аргумент це наприклад + у виразі: 4 + 4

Унарний аргумент, це +"1";

Альтернатива if з багатьма умовами є switch:
switch (num) { // в дужки додаємо об‘єкт перевірки (те що ми будемо порівнювати), а самі перевірки будуть нижче
  case 49:
    console.log('wrong');
    break; // потрібно записувати після виконная кожної умови (обов‘язкова синтаксична конструкція), якщо не постаавити, то скрипт продовжить перебирати всі кейси, які будуть нижче навіть якщо умова буде виконана.
  case 100:
    console.log('wrong');
    break;
  case 50:
    console.log('done');
    break;
  default: \\ потрібен, якщо жодна з умов не була виконана
    console.log('wrong');
    break;
}

switch завжди перевіряє на сувору відповідальність, як і ===

*/
// #endregion

// #region 17 - Git на різних комп‘ютерах
/*
Копіюємо посилання з gitgub (https), потім в терміналі заходимо в потрібну папку cd ...
  git clone https://github.com/Agilexus/udemy.git it project_name – project_name це назва новой папки в яку все скопіюється з гіта

Щоб оновити дані з віддаленого репозиторію:
  git pull

Якщо спробувати оновити віддалений з компа 1, а потім з компа 2, то буде помилка, тому що репозиторій має новішу версію.
В таких випадках потрібно спрочату зробути git pull щоб відбувсі merge, задати повідомлення нашого коміту, натиснути 2 рази control + с, написати :wq і натиснути enter
Після цього можна перевірити git status і якщо все добре, то повторити git push

GIT IGNORE - файл з назвою .gitignore в середині якого зберегається список файлів і папок, які не будуть копіюватись на віддалений репозиторій
*/
// #endregion

// #region 16 - Git
// Документація по Git: https://git-scm.com/book/uk/v2
// Ще одна ссилка: https://githowto.com/uk

/*
Налаштування Git, після встановлення: brew install git
    git init - ініціалізуємо наш проект
    git config – можна налаштовувати, як global (застосовуються для комп‘ютера і відповідно для всіх нових проектів) так і local (якщо вони задані, то глобальні ігноруються).
        git config --local user.name "Oleksii S."
        git config --local user.email seleznyov25@gmail.com

------------------------------------------------------------

    Перший стан - файли просто створенні
    git status - показує поточий стан

    Другий стан - файли додані до відстежження змін
    git add -A – всі файли додаються в git для відстеження змін
        git add *.css або git add name.css - додає всі файли з певним роширенням або конкретний файл

    Третій стан - commit
    git commit -a -m"message" – (-a) означає всі файли і можна конкртні вказати, (-m""") обов‘язкове повідомлення пищеться без пробілів

    Тепер у нас створення контрольна точка. Тепер коли ми щось змінемо то статус покаже "modified: file_name"

    ------------------------------------------------------------

    git log - подивитись всі коміти, ким і коли вони були зроблені

    Github
    Якщо у нас вже виконані команди вище, то:
    1. git remote add origin https://github.com/Agilexus/udemy.git
    2. git branch -M main
    3. git push -u origin main
*/
// #endregion

// #region 15 - оператори
// інкримент var++ (постфіксна форма) або ++var (префіксна форма). Декремент відповідно --var і var--
// let incr = 10,
//     decr = 10;

// console.log(incr++); // виведе 10, тому що спочатку виводить, а потіми додає.

// % - залишок ділення двох чисел
// console.log(5%2); //результат буде 1. Взяли 5 і розділили її на 2 стільки раз скільки можливо і після цього відобразили залишок.

// = це знак присвоювання
// == це не суворе порівняння. Можна порівняти number і string
// === це суворе порівння, тобто 4 === "4" буде false

// && це суворе виконання умов (і)
// || це додаткові умови (або)

// Таблиця порівняння операторів: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#Table
// Побітові оператори - важка тема: https://learn.javascript.ru/bitwise-operators
// #endregion

// #region 13 - спілкування з користувачем
//alert('Hello');

//const result = confirm('Are you here?'); // алерт з питанням і 2 кнопками "Ок" і "Відміна". В таку змінну записується відповідь користувача true or false

// const answer = prompt('Вам є 18?', ''); // пусті '' потрібні щоб ми могли підставити якиусь дефолтну відповідь. Крім того завжди потрібно залишати хочаб пусті, для інтернет експлорера 
// console.log(typeof(answer)); // показує тип данних
// для того щоб промт видав числове значення можна записати так: +prompt('...');

// const answers = [];
// answers[0] = prompt('Ваше ім‘я?');
// answers[1] = prompt('Прізвище?');
// answers[2] = prompt('Вік?');

// document.write(answers);
// промпт записує string в змінну. document.write - переписує всю інформацію на сторінці тому в реальності не використовується (і він є застарілим).
// #endregion