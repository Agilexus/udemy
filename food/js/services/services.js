
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

async function getResource(url) {
  let res = await fetch(url);

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


export {postData, getResource};