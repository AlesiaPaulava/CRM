import { multiDefault } from "./choices.js";
import { clientsAdd } from "./clientAction.js";
import { createContact } from "./createContact.js";

//функция создания элемента
export const createElement = (tagName, attribute) => {
  const elem = document.createElement(tagName);
  Object.assign(elem, attribute);
  return elem;
};

// Функция для форматирования даты и времени
export const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}.${month}.${year} <span class="grey-text">${hours}:${minutes}</span>`;
};

//добавление прелоудера  в раздел клинтов 
export const animation = () => {
  const clientsInfo = document.querySelector('.clients__info');
  const animate = createElement('div', {
    className: 'circle',
  });
  const circleAnim = createElement('span', {
    className: 'anim',
  });
  animate.append(circleAnim);
  clientsInfo.append(animate);
};

//функция для управления списком клиентов
export const clientsListClear = (data) => {
  const clientsInfo = document.querySelector('.clients__info');
  if (data.length === 0) {
    const noClients = createElement('h2', {
      classList: 'no-clients',
      textContent: 'Список клиентов пуст'
    });

    const noClientsElem = document.querySelector('.no-clients');
    if (noClientsElem) {
      return
    } else {
      clientsInfo.append(noClients);
    }
  } else {
    clientsInfo.innerHTML = '';
    for (const clientsObj of data) {
      clientsAdd(clientsObj);
    }
  }
  return data;
};

//функция для очистки таблицы и удаления из DOM
export const clearList = () => {
  const clientsList = document.querySelectorAll('.clients__list');
  clientsList.forEach(cl => {
    cl.textContent = '';
    cl.remove();
  });
};

//функция для очистки таблицы (элеиенты остаются в DOM)
export const reRenderCLients = () => {
  const clientsList = document.querySelectorAll('.clients__list');
  clientsList.forEach(cl => {
    cl.textContent = '';
  });
};

//функция для передачи данных в модальное окно для изменения данных клиента
export const viewInfoClient = (data) => {
  const inpSurname = document.querySelector('.input-surname');
  const inpName = document.querySelector('.input-name');
  const inpLastName = document.querySelector('.input-lastname');

  inpSurname.value = data.surname;
  inpName.value = data.name;
  inpLastName.value = data.lastName;

  if (data.contacts.length > 0) {
    const dataContact = data.contacts;
    const modalContacts = document.querySelector('.modal__contact');
    const modalContactsDescr = document.querySelectorAll('.modal__contact-descr');
    modalContactsDescr.forEach(contactDescr => {
      contactDescr.remove();
    });
    dataContact.forEach(contact => {

      const contactElement = createContact(contact);

      modalContacts.prepend(contactElement);
      multiDefault(); //вызов кастомного селекта
    });
  } else {
    return
  }
};

export const mask = (select, input) => {
  const selectOption = select;
  if (selectOption === 'phone') {
    Inputmask({ mask: '+375 (99) 999-99-99' }).mask(input);
  } else if (selectOption === 'email') {
    Inputmask({ alias: 'email' }).mask(input);
  } else if (selectOption === 'vk') {
    Inputmask({ regex: 'vk\\.com\\/.+' }).mask(input);
  } else if (selectOption === 'fc') {
    Inputmask({ regex: 'facebook\\.com\\/.+' }).mask(input);
  } else if (selectOption === 'dopPhone') {
    Inputmask({ removeMaskOnSubmit: true }).mask(input);
  }
  return selectOption;
};

//скрытие кнопки добавить контакт, если контактов более 10
export const addContactBtnShow = (addContact) => {
  const contacts = document.querySelectorAll('.modal__contact-descr');
  const closeContactsInput = document.querySelectorAll('.modal__close-contact-btn');
  if (contacts.length >= 10) {
    addContact.style.display = 'none';
  }

  closeContactsInput.forEach(closeContact => {
    closeContact.addEventListener('click', () => {
      if (contacts.length < 10) {
        addContact.style.display = 'flex';
      }
    });
  });
};

//функция для использования иконки в зависимости от типа контакта
export const svgIconsFormate = (contact) => {
  const type = contact.type;
  const value = contact.value;
  let contactIcon = '';
  let cont = '';
  if (type === 'phone') {
    contactIcon = `<button class="btn-reset">${svgIcons.phone}</button>`;
    cont = `Телефон: ${value}`
  } else if (type === 'dopPhone') {
    contactIcon = `<button class="btn-reset">${svgIcons.dopPhone}</button>`;
    cont = `Другое: ${value}`
  } else if (type === 'email') {
    contactIcon = `<button class="btn-reset">${svgIcons.email}</button>`;
    cont = `Email: ${value}`
  } else if (type === 'vk') {
    contactIcon = `<button class="btn-reset">${svgIcons.vk}</button>`;
    cont = `ВКонтакте: ${value}`
  } else if (type === 'fc') {
    contactIcon = `<button class="btn-reset">${svgIcons.fc}</button>`;
    cont = `Facebook: ${value}`
  }

  const clientContact = createElement('li', {
    className: 'clients__item-contact black-text',
    innerHTML: `${contactIcon}`,
  });
  tippy(clientContact, {
    content: `${cont}`,
  });
  return clientContact;
}

export const svgIcons = {
  phone: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.7"><circle cx="8" cy="8" r="8" fill="#9873FF"/><path d="M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z" fill="white"/></g></svg>',
  dopPhone: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM3 8C3 5.24 5.24 3 8 3C10.76 3 13 5.24 13 8C13 10.76 10.76 13 8 13C5.24 13 3 10.76 3 8ZM9.5 6C9.5 5.17 8.83 4.5 8 4.5C7.17 4.5 6.5 5.17 6.5 6C6.5 6.83 7.17 7.5 8 7.5C8.83 7.5 9.5 6.83 9.5 6ZM5 9.99C5.645 10.96 6.75 11.6 8 11.6C9.25 11.6 10.355 10.96 11 9.99C10.985 8.995 8.995 8.45 8 8.45C7 8.45 5.015 8.995 5 9.99Z" fill="#9873FF"/></svg>',
  email: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 5.75C4 5.3375 4.36 5 4.8 5H11.2C11.64 5 12 5.3375 12 5.75V10.25C12 10.6625 11.64 11 11.2 11H4.8C4.36 11 4 10.6625 4 10.25V5.75ZM8.424 8.1275L11.04 6.59375C11.14 6.53375 11.2 6.4325 11.2 6.32375C11.2 6.0725 10.908 5.9225 10.68 6.05375L8 7.625L5.32 6.05375C5.092 5.9225 4.8 6.0725 4.8 6.32375C4.8 6.4325 4.86 6.53375 4.96 6.59375L7.576 8.1275C7.836 8.28125 8.164 8.28125 8.424 8.1275Z" fill="#9873FF"/></svg>',
  vk: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <g opacity="0.7"> <path d="M8 0C3.58187 0 0 3.58171 0 8C0 12.4183 3.58187 16 8 16C12.4181 16 16 12.4183 16 8C16 3.58171 12.4181 0 8 0ZM12.058 8.86523C12.4309 9.22942 12.8254 9.57217 13.1601 9.97402C13.3084 10.1518 13.4482 10.3356 13.5546 10.5423C13.7065 10.8371 13.5693 11.1604 13.3055 11.1779L11.6665 11.1776C11.2432 11.2126 10.9064 11.0419 10.6224 10.7525C10.3957 10.5219 10.1853 10.2755 9.96698 10.037C9.87777 9.93915 9.78382 9.847 9.67186 9.77449C9.44843 9.62914 9.2543 9.67366 9.1263 9.90707C8.99585 10.1446 8.96606 10.4078 8.95362 10.6721C8.93577 11.0586 8.81923 11.1596 8.43147 11.1777C7.60291 11.2165 6.81674 11.0908 6.08606 10.6731C5.44147 10.3047 4.94257 9.78463 4.50783 9.19587C3.66126 8.04812 3.01291 6.78842 2.43036 5.49254C2.29925 5.2007 2.39517 5.04454 2.71714 5.03849C3.25205 5.02817 3.78697 5.02948 4.32188 5.03799C4.53958 5.04143 4.68362 5.166 4.76726 5.37142C5.05633 6.08262 5.4107 6.75928 5.85477 7.38684C5.97311 7.55396 6.09391 7.72059 6.26594 7.83861C6.45582 7.9689 6.60051 7.92585 6.69005 7.71388C6.74734 7.57917 6.77205 7.43513 6.78449 7.29076C6.82705 6.79628 6.83212 6.30195 6.75847 5.80943C6.71263 5.50122 6.53929 5.30218 6.23206 5.24391C6.07558 5.21428 6.0985 5.15634 6.17461 5.06697C6.3067 4.91245 6.43045 4.81686 6.67777 4.81686L8.52951 4.81653C8.82136 4.87382 8.88683 5.00477 8.92645 5.29874L8.92808 7.35656C8.92464 7.47032 8.98521 7.80751 9.18948 7.88198C9.35317 7.936 9.4612 7.80473 9.55908 7.70112C10.0032 7.22987 10.3195 6.67368 10.6029 6.09801C10.7279 5.84413 10.8358 5.58142 10.9406 5.31822C11.0185 5.1236 11.1396 5.02785 11.3593 5.03112L13.1424 5.03325C13.195 5.03325 13.2483 5.03374 13.3004 5.04274C13.6009 5.09414 13.6832 5.22345 13.5903 5.5166C13.4439 5.97721 13.1596 6.36088 12.8817 6.74553C12.5838 7.15736 12.2661 7.55478 11.9711 7.96841C11.7001 8.34652 11.7215 8.53688 12.058 8.86523Z" fill="#9873FF" /> </g> </svg>',
  fc: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.7"><path d="M7.99999 0C3.6 0 0 3.60643 0 8.04819C0 12.0643 2.928 15.3976 6.75199 16V10.3775H4.71999V8.04819H6.75199V6.27309C6.75199 4.25703 7.94399 3.14859 9.77599 3.14859C10.648 3.14859 11.56 3.30121 11.56 3.30121V5.28514H10.552C9.55999 5.28514 9.24799 5.90362 9.24799 6.53815V8.04819H11.472L11.112 10.3775H9.24799V16C11.1331 15.7011 12.8497 14.7354 14.0879 13.2772C15.3261 11.819 16.0043 9.96437 16 8.04819C16 3.60643 12.4 0 7.99999 0Z" fill="#9873FF"/></g></svg>',
  btnDel: '<svg class="svg-del" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.7" clip-path="url(#clip0_216_224)"><path d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z" fill="#F06A4D"/> </g></svg>Удалить',
  btnChange: '<svg class="svg-change" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <g opacity="0.7" clip-path="url(#clip0_216_219)"> <path d="M2 11.5002V14.0002H4.5L11.8733 6.62687L9.37333 4.12687L2 11.5002ZM13.8067 4.69354C14.0667 4.43354 14.0667 4.01354 13.8067 3.75354L12.2467 2.19354C11.9867 1.93354 11.5667 1.93354 11.3067 2.19354L10.0867 3.41354L12.5867 5.91354L13.8067 4.69354Z" fill="#9873FF"/> </g></svg>Изменить',
  btnAddCLient: '<svg class="svg-add" width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14.5 8C16.71 8 18.5 6.21 18.5 4C18.5 1.79 16.71 0 14.5 0C12.29 0 10.5 1.79 10.5 4C10.5 6.21 12.29 8 14.5 8ZM5.5 6V3H3.5V6H0.5V8H3.5V11H5.5V8H8.5V6H5.5ZM14.5 10C11.83 10 6.5 11.34 6.5 14V16H22.5V14C22.5 11.34 17.17 10 14.5 10Z"/></svg>',
  arrowDown: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_224_2095)"><path d="M10 6L9.295 5.295L6.5 8.085L6.5 2H5.5L5.5 8.085L2.71 5.29L2 6L6 10L10 6Z" fill="#9873FF"/></g></svg>',
  arrowUp: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 6L2.705 6.705L5.5 3.915L5.5 10L6.5 10L6.5 3.915L9.29 6.71L10 6L6 2L2 6Z" fill="#9873FF"/>',
  tableFioSvg: ' <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.37109 8L4.6582 6.01758H1.92871L1.23047 8H0L2.6709 0.832031H3.94043L6.61133 8H5.37109ZM4.35059 5.01172L3.68164 3.06836C3.63281 2.93815 3.56445 2.73307 3.47656 2.45312C3.39193 2.17318 3.33333 1.9681 3.30078 1.83789C3.21289 2.23828 3.08431 2.67611 2.91504 3.15137L2.27051 5.01172H4.35059ZM6.96289 5.80762V4.83105H9.47266V5.80762H6.96289ZM13.0322 5.13867L11.2646 8H9.93164L11.9434 4.87012C11.0319 4.55436 10.5762 3.8903 10.5762 2.87793C10.5762 2.22363 10.8024 1.72396 11.2549 1.37891C11.7074 1.03385 12.373 0.861328 13.252 0.861328H15.3955V8H14.2236V5.13867H13.0322ZM14.2236 1.83789H13.2959C12.8044 1.83789 12.4268 1.92578 12.1631 2.10156C11.9027 2.27409 11.7725 2.55729 11.7725 2.95117C11.7725 3.33529 11.8994 3.63477 12.1533 3.84961C12.4072 4.06445 12.8011 4.17188 13.335 4.17188H14.2236V1.83789Z" fill="#9873FF"/></svg>',
  addContact: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_121_1073)"><path d="M8.00001 4.66665C7.63334 4.66665 7.33334 4.96665 7.33334 5.33331V7.33331H5.33334C4.96668 7.33331 4.66668 7.63331 4.66668 7.99998C4.66668 8.36665 4.96668 8.66665 5.33334 8.66665H7.33334V10.6666C7.33334 11.0333 7.63334 11.3333 8.00001 11.3333C8.36668 11.3333 8.66668 11.0333 8.66668 10.6666V8.66665H10.6667C11.0333 8.66665 11.3333 8.36665 11.3333 7.99998C11.3333 7.63331 11.0333 7.33331 10.6667 7.33331H8.66668V5.33331C8.66668 4.96665 8.36668 4.66665 8.00001 4.66665ZM8.00001 1.33331C4.32001 1.33331 1.33334 4.31998 1.33334 7.99998C1.33334 11.68 4.32001 14.6666 8.00001 14.6666C11.68 14.6666 14.6667 11.68 14.6667 7.99998C14.6667 4.31998 11.68 1.33331 8.00001 1.33331ZM8.00001 13.3333C5.06001 13.3333 2.66668 10.94 2.66668 7.99998C2.66668 5.05998 5.06001 2.66665 8.00001 2.66665C10.94 2.66665 13.3333 5.05998 13.3333 7.99998C13.3333 10.94 10.94 13.3333 8.00001 13.3333Z" fill="#9873FF" /></g></svg>',
  clientLink: '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="16" viewBox="0,0,256,256"><g fill="#9873ff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(8.53333,8.53333)"><path d="M25.98047,2.99023c-0.03726,0.00118 -0.07443,0.00444 -0.11133,0.00977h-5.86914c-0.36064,-0.0051 -0.69608,0.18438 -0.87789,0.49587c-0.18181,0.3115 -0.18181,0.69676 0,1.00825c0.18181,0.3115 0.51725,0.50097 0.87789,0.49587h3.58594l-10.29297,10.29297c-0.26124,0.25082 -0.36648,0.62327 -0.27512,0.97371c0.09136,0.35044 0.36503,0.62411 0.71547,0.71547c0.35044,0.09136 0.72289,-0.01388 0.97371,-0.27512l10.29297,-10.29297v3.58594c-0.0051,0.36064 0.18438,0.69608 0.49587,0.87789c0.3115,0.18181 0.69676,0.18181 1.00825,0c0.3115,-0.18181 0.50097,-0.51725 0.49587,-0.87789v-5.87305c0.04031,-0.29141 -0.04973,-0.58579 -0.24615,-0.80479c-0.19643,-0.219 -0.47931,-0.34042 -0.77338,-0.33192zM6,7c-1.09306,0 -2,0.90694 -2,2v15c0,1.09306 0.90694,2 2,2h15c1.09306,0 2,-0.90694 2,-2v-10v-2.57812l-2,2v2.57813v8h-15v-15h8h2h0.57813l2,-2h-2.57812h-2z"></path></g></g></svg>',
  editSpiner: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><g clip-path="url(#clip0_224_6260)"><path d="M3.00008 8.03996C3.00008 10.8234 5.2566 13.08 8.04008 13.08C10.8236 13.08 13.0801 10.8234 13.0801 8.03996C13.0801 5.25648 10.8236 2.99996 8.04008 2.99996C7.38922 2.99996 6.7672 3.1233 6.196 3.348" stroke="#B89EFF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/></g><defs><clipPath id="clip0_224_6260"><rect width="16" height="16" fill="white"/></clipPath></defs></svg>',
  deleteSpinner: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">< g clip- path="url(#clip0_224_2792)" >      <path d="M3.00008 8.04008C3.00008 10.8236 5.2566 13.0801 8.04008 13.0801C10.8236 13.0801 13.0801 10.8236 13.0801 8.04008C13.0801 5.2566 10.8236 3.00008 8.04008 3.00008C7.38922 3.00008 6.7672 3.12342 6.196 3.34812" stroke="#F06A4D" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" />  </ >  <defs>    <clipPath id="clip0_224_2792">      <rect width="16" height="16" fill="white" />    </clipPath>  </defs>  </svg >  ',
  saveSpinner: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_121_1254)"><path d="M3.00008 8.03996C3.00008 10.8234 5.2566 13.08 8.04008 13.08C10.8236 13.08 13.0801 10.8234 13.0801 8.03996C13.0801 5.25648 10.8236 2.99996 8.04008 2.99996C7.38922 2.99996 6.7672 3.1233 6.196 3.348" stroke="#B89EFF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/></g><defs><clipPath id="clip0_121_1254"><rect width="16" height="16" fill="white"/></clipPath></defs></svg>'
}