import { createElement } from "./helper.js";
import { createModalChangeClients } from "./createModalChangeClients.js";
import { svgIcons } from "./helper.js";

export const createClients = () => {

  const section = createElement('section', {
    className: 'clients',
  });

  const container = createElement('div', {
    className: 'container',
  });

  const clientsTitle = createElement('h2', {
    className: 'clients__title',
    textContent: 'Клиенты',
  });

  const tableWrapp = createElement('div', {
    className: 'clients__table-wrapp'
  });

  const table = createElement('table', {
    className: 'clients__table',
  });


  const thead = createElement('thead', {
    className: 'clients__table-wrap',
  });

  const tableTheadTr = createElement('tr', {
    className: 'clients__table-title',
  });

  const tableTheadTrItemId = createElement('th', {
    className: 'clients__table-title__id clients__table-title',
    innerHTML: `<button id="id" class="clients__title-btn btn-reset" >ID ${svgIcons.arrowUp}</button>
    `,
  });

  const tableTheadTrItemFio = createElement('th', {
    className: 'clients__table-title__fio clients__table-title grey-text',
    innerHTML: `<button id="surname" class="grey-text btn-reset" >Фамилия Имя Отчество ${svgIcons.arrowDown}${svgIcons.tableFioSvg}</button>
    `,
  });

  const tableTheadTrItemDate = createElement('th', {
    className: 'clients__table-title__date clients__table-title grey-text',
    innerHTML: `<button id="createdAt" class="grey-text btn-reset" >Дата и время<br>создания ${svgIcons.arrowDown}</button>
    `,
  });

  const tableTheadTrItemLastChange = createElement('th', {
    className: 'clients__table-title__change clients__table-title grey-text',
    innerHTML: `<button id="updatedAt" class="grey-text btn-reset" >Последние<br>изменения ${svgIcons.arrowDown}</button>
    `,
  });

  const tableTheadTrItemContacts = createElement('th', {
    className: 'clients__table-title__contact clients__table-title grey-text',
    textContent: 'Контакты',
  });

  const tableTheadTrItemMove = createElement('th', {
    className: 'clients__table-title__move clients__table-title grey-text',
    textContent: 'Действия',
  });

  const tbody = createElement('tbody', {
    className: 'clients__info',
  });

  const addClients = createElement('div', {
    className: 'clients__add'
  })

  const buttonAdd = createElement('button', {
    className: 'clients__btn btn-modal',
    innerHTML: `${svgIcons.btnAddCLient} Добавить клиента`
  });
  buttonAdd.dataset.path = 'clients';


  // МОДАЛКА
  const modals = createElement('div', {
    className: 'modals',
    id: 'modals',
  });
  const modalOverlay = createModalChangeClients();

  addClients.append(buttonAdd);
  tableTheadTr.append(tableTheadTrItemId,
    tableTheadTrItemFio,
    tableTheadTrItemDate,
    tableTheadTrItemLastChange,
    tableTheadTrItemContacts,
    tableTheadTrItemMove);
  thead.append(tableTheadTr);
  table.append(thead, tbody);
  tableWrapp.append(table);
  container.append(clientsTitle, tableWrapp, addClients);
  modals.append(modalOverlay);
  section.append(container, modals);
  return section;
}

