import { createElement } from "./helper.js";

export const createContact = (data = null) => {

  const newContactDescr = createElement('div', {
    className: 'modal__contact-descr',
    style: 'display: flex',
  });

  const newContactSelect = createElement('select', {
    className: 'multi-select',
    id: 'select',
    name: 'type',
  });

  const newMobile = createElement('option', {
    value: 'phone',
    textContent: 'Телефон',
  });

  const newMobileTwo = createElement('option', {
    value: 'dopPhone',
    textContent: 'Другое',
  });

  const newEmail = createElement('option', {
    value: 'email',
    textContent: 'Email',
  });

  const newVk = createElement('option', {
    value: 'vk',
    textContent: 'VK',
  });

  const newFc = createElement('option', {
    value: 'fc',
    textContent: 'Facebook',
  });

  const newModalInput = createElement('input', {
    className: 'modal__contact-inp',
    id: 'contact-input',
    name: 'value',
    placeholder: 'Введите данные контакта',
  });

  const newCloseContactBtn = createElement('button', {
    className: 'modal__close-contact-btn',
    type: 'button',
    innerHTML: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z" fill="#B0B0B0" /> </svg>'
  });

  tippy(newCloseContactBtn, {
    content: 'Удалить контакт'
  });

  if (data !== null) {

    let arrayOptions = [
      {
        var: newMobile,
        value: "phone",
      },
      {
        var: newMobileTwo,
        value: "dopPhone",
      },
      {
        var: newEmail,
        value: "email",
      },
      {
        var: newVk,
        value: "vk",
      },
      {
        var: newFc,
        value: "fc",
      },
    ];

    for (let i = 0; i < arrayOptions.length; i++) {

      if (data.type == arrayOptions[i].value) {
        arrayOptions[i].var.setAttribute("selected", "selected");
      }
    }
    newModalInput.value = data.value;
  }

  newCloseContactBtn.addEventListener('click', () => {
    newContactDescr.remove();
  });

  newContactDescr.append(newContactSelect, newModalInput, newCloseContactBtn);
  newContactSelect.append(newMobile, newMobileTwo, newEmail, newVk, newFc);

  return newContactDescr;
};