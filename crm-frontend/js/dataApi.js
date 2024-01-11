import { changeAndDelClient } from "./btnAction.js";
import { clientsAdd } from "./clientAction.js";
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

    if (!response.ok) 
    {
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

    if (!response.ok) 
    {
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

// ОТРИСОВКИ КЛИЕНТОВ ПРИ ПОИСКЕ
export const getSearchClientsData = async () => {
  try {
    clearList(); // 
    const inputSearch = document.querySelector('.header__search');
    const response = await fetch(`${url}?search=${inputSearch.value}`);
    const data = await response.json();
    clientsListClear(data);
    changeAndDelClient();
    return data;
  } catch (error) {
    console.error(`Ошибка при загрузке клиентов: ${error}`);
  }
}
