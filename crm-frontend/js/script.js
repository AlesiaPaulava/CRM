import { addClientBtn } from "./btnAction.js";
import { createClients } from "./createClients.js";
import { createHeader } from "./createHeader.js";
import { fetchAndSortClients, getClientsData, getDataClient } from "./dataApi.js";
import { createElement, viewInfoClient } from "./helper.js";
import { clickBtn, closeModal, openModal } from "./modalAction.js";
import { searchClient } from "./searchClient.js";
import { createModalChangeClients } from "./createModalChangeClients.js";

const init = async () => {
  const app = document.getElementById('app');

  app.append(createHeader(), createClients());

  try {
    const clientsBlock = document.querySelector('.clients__info');

    const animate = createElement('div', {
      className: 'circle',
    });
    const circleAnim = createElement('span', {
      className: 'anim',
    });
    animate.append(circleAnim);
    clientsBlock.append(animate);

    getClientsData().then(data => { // отрисовка клиента
      animate.remove();

      if (data) {
        addClientBtn();
        searchClient();
      };

    }).catch((error) => {
      console.log('error: ', error);
    });

  } catch (error) {
    console.warn('error: ', error);
  }
  clickBtn(); // Открыть модальное окно
  closeModal(); // Закрыть модальное окно

  // Сортировка 
  const btnFio = document.getElementById('surname');
  btnFio.addEventListener('click', async () => {
    await fetchAndSortClients('surname');
  });

  const btnId = document.getElementById('id');
  btnId.addEventListener('click', async () => {
    await fetchAndSortClients('id');
  });

  const btnCreated = document.getElementById('createdAt');
  btnCreated.addEventListener('click', async () => {
    await fetchAndSortClients('createdAt');
  });

  const btnUpdate = document.getElementById('updatedAt');
  btnUpdate.addEventListener('click', async () => {
    await fetchAndSortClients('updatedAt');
  });
}
init();

//ссылка на карточку клиента
let linkCard = window.location.href; //при загрузке страницы проверяем, содержит ли текущий URL символ #.

if (linkCard.includes("#") == true) {
  let hashId = window.location.hash.replace(/[#]/gi, ""); //убирает все значения до # вместе с ним.Остаётся только то, что после #

  getDataClient(hashId)
    .then((data) => {
      const clientId = hashId;
      viewInfoClient(data); //передаем данные в модальное окно для изменения данных клиента
      const modal = createModalChangeClients(clientId);//создаем модальное окно
      const modalId = document.querySelector('.modal__id');
      modalId.textContent = `ID: ${clientId.substring(7, 13)}`; //передает ID в модальное окно
      openModal('change', modal); //открываем модальное окно
    })
    .catch(() => {
      alert("Клиента с данным ID не найдено!");
    });
}

window.addEventListener("hashchange", () => { //отслеживание изменений в хэше
  let hashId = window.location.hash.replace(/[#]/gi, "");
  let numberTest = /^\d/; //проверяет, начинается ли строка с цифры

  if (numberTest.test(hashId)) { //Проверяет, соответствует ли hashId numberTest (начинается ли с цифры)

    getDataClient(hashId)
      .then((data) => {
        const clientId = hashId;
        viewInfoClient(data);
        const modal = createModalChangeClients(clientId);
        openModal('change', modal);
      })
      .catch(() => {
        alert("Клиента с данным ID не найдено!");
      });
  }
});
