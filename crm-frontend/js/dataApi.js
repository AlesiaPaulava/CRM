import { changeAndDelClient } from "./btnAction.js";
import { clientsAdd } from "./clientAction.js";
import { createElement } from "./helper.js";
import { clearList, clientsListClear, viewInfoClient } from "./helper.js";
import { addSortListener, sortClietns } from "./sortClients.js";

const url = 'http://localhost:3000/api/clients';

// ОТПРАВКА ДАННЫХ
export const postData = async (data) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      return errorData.errors;
    } else {
      const responseData = await response.json();
      console.log('Данные успешно отправлены на сервер');
      return responseData;
    }
  } catch (error) {
    console.error(`Возникла ошибка при отправке данных: ${error}`);
    throw error;
  }
}

// ПОЛУЧЕНИЕ ДАННЫХ
export async function getData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
      console.log(`Неудалось получить данные с сервера`);
    }
    return data;
  } catch (error) {
    console.error("Ошибка получения данных:", error);
    return [];
  }
}

// ПОЛУЧЕНИЕ ДАННЫХ КЛИЕНТА
export async function getDataClient(clientId) {
  try {
    const response = await fetch(`${url}/${clientId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Ошибка при получении данных клиента: ${error}`);
  }
}

// ИЗМЕНЕНИЯ КЛИЕНТА
export async function changeInfoClients(clientId, data) {
  try {
    const changeUrl = `${url}/${clientId}`;
    const response = await fetch(changeUrl, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return errorData.errors;
    } else {
      const responseData = await response.json();
      console.log('Данные успешно изменены на сервере');
      return responseData;
    }
  } catch (error) {
    console.log(`Возникла ошибка при изменении данных: ${error}`);
  }
}

// УДАЛЕНИЕ КЛИЕНТА
export async function deleteClients(clientId) {
  const deleteUrl = `${url}/${clientId}`;

  try {
    const res = await fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (res.ok) {
      console.log('Клиент успешно удален');
    }
  } catch (error) {
    console.error(`Ошибка при удалении клиента: ${error}`);
  }
}

// УДАЛЕНИ КЛИЕНТА И ПЕРЕРИСОВКА 
export const delClientsGetData = async (id) => {
  try {
    await deleteClients(id);
    clearList();
    const data = await getData();
    clientsListClear(data);
    changeAndDelClient();
    return data;
  } catch (error) {
    console.error(`Ошибка при удалении клиента: ${error}`);
  }
}

// ОТРИСОВКИ КЛИЕНТОВ
export const getClientsData = async () => {
  try {
    clearList(); // 
    const data = await getData();
    clientsListClear(data);
    changeAndDelClient();
    return data;
  } catch (error) {
    console.error(`Ошибка при загрузке клиентов: ${error}`);
  }
}

// ОТРИСОВКИ ВЫБРАННОГО КЛИЕНТА
export const getClientIdData = async (id) => {
  try {
    const data = await getDataClient(id); //получение данных клиента
    viewInfoClient(data); //передача данных в модальное окно
    return data;
  } catch (error) {
    console.error(`Ошибка при загрузке клиента: ${error}`);
  }
}

// СОРТИРОВКА ПО ФИО
export const fetchAndSortClients = async (prop) => {
  let clients = [];
  try {
    const res = await fetch(url);
    const data = await res.json();
    clients = data;
    clearList();
    sortClietns(clients, prop);
    clients.forEach(client => {
      clientsAdd(client);
    });
    addSortListener(document.getElementById(prop), clients, prop)
    return clients;
  } catch (error) {
    console.error('Ошибка при получении данных', error);
  }
}

//функция отвечает за обновление и отображение списка автодополнения
export const createAutocompleteList = async () => {
  removeAutocompleteDropdown();
  const inputSearch = document.querySelector('.header__search');
  const value = inputSearch.value.toLowerCase();
  if (value.length === 0) return;

  try {
    const response = await fetch(`${url}?search=${value}`);
    const data = await response.json();
    const clientsInfo = data.map((element) => ({
      name: element.name,
      surname: element.surname,
      lastName: element.lastName,
      id: element.id
    }));

    createAutocompleteDropdown(clientsInfo);
    // Добавляем обработчик события на элементы списка автодополнения
    const autocompleteLinks = document.querySelectorAll('.autocomplete-link');

    autocompleteLinks.forEach(link => {
      link.addEventListener('click', () => {
        const clientId = link.dataset.id;
        highlightAndScrollToContact(clientId);
      });
    });
  } catch (error) {
    console.error(`Ошибка при загрузке клиентов: ${error}`);
  }
};

// Подсветка контакта в таблице
const highlightAndScrollToContact = (clientId) => {
  const contactElement = document.querySelector(`.clients__list[data-id="${clientId}"]`);
  if (contactElement) {
    // Удаляем подсветку у всех элементов, имеющих класс 'highlighted'
    const highlightedContacts = document.querySelectorAll('.highlighted');
    highlightedContacts.forEach((contact) => {
      contact.classList.remove('highlighted');
    });

    // Добавляем подсветку к выбранному контакту
    contactElement.classList.add('highlighted');

    // Прокрутка таблицы до контакта
    contactElement.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Прокручивает таблицу до контакта
  }
};

//создаем список с автодополнением к поиску по ФИО
function createAutocompleteDropdown(list) {
  const autocompleteWrap = document.querySelector('.autocomplete-wrap');
  const autocompleteList = createElement('ul', {
    className: 'autocomplete-list',
  });

  let selectedElementIndex = -1; // Индекс текущего выбранного элемента

  list.forEach((element, index) => {
    const autocompleteItem = createElement('li', {
      className: 'autocomplete-item',
    });

    const fullName = `${element.surname} ${element.name} ${element.lastName}`;

    const autocompleteLink = createElement('a', {
      className: 'autocomplete-link',
      innerHTML: fullName,
    });
    autocompleteLink.setAttribute('data-id', element.id); // Устанавливаем атрибут data-id равным id элемента из списка

    autocompleteItem.append(autocompleteLink);
    autocompleteList.append(autocompleteItem);

    autocompleteItem.addEventListener('mouseenter', () => {
      selectedElementIndex = index;
      highlightSelectedItem();
    });

    autocompleteItem.addEventListener('click', () => {
      selectItem(element);
    });
  });

  autocompleteWrap.append(autocompleteList);

  function highlightSelectedItem() {
    const items = autocompleteList.querySelectorAll('.autocomplete-item');
    items.forEach((item, index) => {
      if (index === selectedElementIndex) {
        item.classList.add('highlighted');
      } else {
        item.classList.remove('highlighted');
      }
    });
  }

  function selectItem(selectedElement) {
    const inputSearch = document.querySelector('.header__search');
    inputSearch.value = `${selectedElement.surname} ${selectedElement.name} ${selectedElement.lastName}`;
    removeAutocompleteDropdown();
    highlightAndScrollToContact(selectedElement.id); // Выделение и прокрутка к выбранному клиенту
  }

  //управление выбором клиентов в списке автодополнения с клавиатуры
  document.addEventListener('keydown', (event) => {
    const items = autocompleteList.querySelectorAll('.autocomplete-item');

    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault(); // Отменяем стандартное поведение стрелок
        selectedElementIndex = Math.max(selectedElementIndex - 1, 0);
        highlightSelectedItem();
        break;
      case 'ArrowDown':
        event.preventDefault(); // Отменяем стандартное поведение стрелок
        selectedElementIndex = Math.min(selectedElementIndex + 1, items.length - 1);
        highlightSelectedItem();
        break;
      case 'Enter':
        if (selectedElementIndex !== -1) {
          selectItem(list[selectedElementIndex]);
        }
        break;
      default:
        break;
    }
  });

  // Добавляем обработчик события на клик для выбора клиента по клику мышью
  autocompleteList.addEventListener('click', (event) => {
    const targetItem = event.target.closest('.autocomplete-item');
    if (targetItem) {
      const selectedElement = list[selectedElementIndex];
      selectItem(selectedElement);
    }
  });
}


//очищаем список с автодополнением для поиска по ФИО
function removeAutocompleteDropdown() {
  const listEl = document.querySelector('.autocomplete-list');
  if (listEl) listEl.remove();
}

