import { createElement, formatDate, svgIcons, svgIconsFormate } from "./helper.js";

export const clientsAdd = (obj) => {
  const clientsWrappBlock = document.querySelector('.clients__info');
  const clientsList = createElement('tr', {
    className: 'clients__list'
  });

  // ID
  const clientsId = createElement('td', {
    className: 'clients__item-id grey-text',
    textContent: obj.id.substring(7, 13),
  })
  clientsList.append(clientsId);

  // ФИО
  const clientsFio = createElement('td', {
    className: 'clients__item-fio black-text',
    textContent: `${obj.surname} ${obj.name} ${obj.lastName}`
  });
  clientsList.append(clientsFio);

  // Форматирование даты создания
  const createdAt = new Date(obj.createdAt);
  const formattedCreatedAt = formatDate(createdAt);//вызов функции форматирования
  const nowDate = createElement('td', {
    className: 'clients__item-date black-text',
    innerHTML: formattedCreatedAt,
  });
  clientsList.append(nowDate);

  // Форматирование даты последнего изменения
  const updatedAt = new Date(obj.updatedAt);
  const formattedUpdatedAt = formatDate(updatedAt);//вызов функции форматирования
  const lastChange = createElement('td', {
    className: 'clients__item-last__change black-text',
    innerHTML: formattedUpdatedAt,
  });
  clientsList.append(lastChange);

  // Контакты
  const contactsArray = obj.contacts;
  const listContacts = createElement('ul', {
    className: 'clients__list-contacts',
  });

  if (contactsArray.length > 0) {
    const displayContacts = contactsArray.slice(0, 4);
    displayContacts.forEach(contact => {
      const clientContact = svgIconsFormate(contact);
      listContacts.append(clientContact);
      clientsList.append(listContacts);
    });
  }
  if (contactsArray.length > 4) {
    const clientFourContact = createElement('li', {
      className: 'clients__item-contact black-text',
    });

    const showBtn = createElement('button', {
      className: 'show-btn btn-reset',
      innerHTML: `+${contactsArray.length - 4}`,
    });

    showBtn.addEventListener('click', () => {
      listContacts.innerHTML = '';
      contactsArray.forEach(contact => {
        const clientContact = svgIconsFormate(contact);

        listContacts.append(clientContact);
      });
    });

    clientFourContact.append(showBtn);
    listContacts.append(clientFourContact);
    clientsList.append(listContacts);
  } else if (contactsArray.length === 0) {
    const clientZeroContact = createElement('li', {
      className: 'clients__item-contact black-text',
      innerHTML: ``,
    });
    listContacts.append(clientZeroContact);
    clientsList.append(listContacts);
  }

  // _______________MOVE

  const listMove = createElement('tr', {
    className: 'clients__list-move',
  });

  const buttonClientMoveItem = createElement('td', {
    className: 'clients__item-move'
  });

  const wrappBtnCange = createElement ('div', {
    className: 'clients__item-wrapp'
  })

  const buttonСhange = createElement('button', {
    className: 'btn btn-change btn-modal black-text',
    innerHTML: svgIcons.btnChange,
  })
  buttonСhange.dataset.path = 'change';
  buttonСhange.dataset.id = obj.id;

  const wrappBtnDel = createElement ('div', {
    className: 'clients__item-wrapp'
  })

  const buttonDelete = createElement('button', {
    className: 'btn btn-modal btn-delete black-text',
    innerHTML: svgIcons.btnDel,
  });
  buttonDelete.dataset.path = 'delete';
  buttonDelete.dataset.id = obj.id;


  const buttonClientLink = createElement('button', {
    className: 'client__table-btn-linkbtn btn-reset btn',
    innerHTML: svgIcons.clientLink,
  });
  buttonClientLink.dataset.id = obj.id;
  tippy(buttonClientLink, {
    placement: 'top-start',
    content: 'Поделиться'
  });

  const editSpiner = createElement('span', {
    className: 'actions-spinnerEdit',
    innerHTML: svgIcons.editSpiner
  });

  const deleteSpinner = createElement('span', {
    className: 'actions-spinnerDel',
    innerHTML: svgIcons.deleteSpinner
  });

  buttonСhange.append(editSpiner);
  wrappBtnCange.append(buttonСhange);
  buttonDelete.append(deleteSpinner);
  wrappBtnDel.append(buttonDelete);

  buttonClientMoveItem.append(wrappBtnCange, wrappBtnDel, buttonClientLink);
  listMove.append(buttonClientMoveItem);
  clientsList.append(listMove);
  clientsWrappBlock.append(clientsList);

  //создание ссылки на карточку клиента
  buttonClientLink.addEventListener('click', () => {
    let copyId = window.location.origin + '/' + '#' + buttonClientLink.dataset.id;

    const textarea = document.createElement('textarea');
    textarea.value = copyId;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    // Выводим сообщение пользователю
    alert("Скопируйте ссылку вручную: " + copyId);
  })
}