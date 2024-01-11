import { createContact } from "./createContact.js";
import { svgIcons } from "./helper.js";
import { addContactBtnShow, createElement, mask } from "./helper.js";
import Inputmask from "./lib/inputmask.es6.js";
import { multiDefault } from "./choices.js";

export const createModalNewClients = () => {

  const modalNewClients = createElement('div', {
    className: 'modals__new-clients modal',
  });
  modalNewClients.dataset.target = 'clients';

  const modalTitleNew = createElement('div', {
    className: 'modal__title',
    textContent: 'Новый клиент',
  });

  const btnCloseModal = createElement('button', {
    className: 'modal__close-btn btn-reset',
    innerHTML: '<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2333 1.73333L15.2666 0.766664L8.49991 7.53336L1.73324 0.766696L0.766576 1.73336L7.53324 8.50003L0.766603 15.2667L1.73327 16.2333L8.49991 9.46669L15.2666 16.2334L16.2332 15.2667L9.46657 8.50003L16.2333 1.73333Z" fill="#B0B0B0" /> </svg>'
  });

  const modalForm = createElement('form', {
    className: 'modal__form',
    id: 'form',
  });

  const wrapInput = createElement('div', {
    className: 'input-dscr',
  });

  const descrSurname = createElement('label', {
    className: 'inp-title',
    for: 'surname',
    textContent: 'Фамилия*',
  });

  const inputSurname = createElement('input', {
    className: 'input surname',
    name: 'surname',
    id: 'surname',
  });

  const descrName = createElement('label', {
    className: 'inp-title',
    for: 'name',
    textContent: 'Имя*',
  });

  const inputName = createElement('input', {
    className: 'input name',
    name: 'name',
    id: 'name',
  });

  const descrLastName = createElement('label', {
    className: 'inp-title',
    for: 'lastname',
    textContent: 'Отчество*',
  });

  const inputLastName = createElement('input', {
    className: 'input lastname',
    id: 'lastname',
    name: 'lastname',
  });

  const modalContact = createElement('div', {
    className: 'modal__contact',
  });

  const newContactsWrapp = createElement('div', {
    className: 'modal__contact-wrapp',
  });

  const errValidateBlock = createElement('div', {
    className: 'error-block error-block-new',
  });

  const wrapButtonAdd = createElement('div', {
    className: 'modal__add-contact-wrap',
  });

  const addContact = createElement('button', {
    className: 'modal__add-contact-btn btn-reset',
    type: 'button',
    innerHTML: `${svgIcons.addContact} Добавить контакт`,
  });

  const saveClient = createElement('button', {
    className: 'modal__save-contact-btn',
    id: 'save-btn',
    type: 'submit',
    textContent: 'Сохранить',
  });

  wrapButtonAdd.append(addContact);

  addContact.addEventListener('click', () => { //при клике на кнопку создаются элементы для внесения контактов
    const newContact = createContact();
    newContactsWrapp.append(newContact);
    addContactBtnShow(addContact);

    const newSelect = newContact.querySelector('.multi-select');
    const newInputSelect = newContact.querySelector('#contact-input');

    const im = new Inputmask("+375 (99) 999-99-99");
    im.mask(newInputSelect);

    newSelect.addEventListener('change', () => {
      mask(newSelect.value, newInputSelect);
    });
    multiDefault();
  });

  const cancelButton = createElement('button', {
    className: 'modal__cancel-client-btn  btn-reset',
    type: 'button',
    textContent: 'Отмена',
  });

  wrapInput.append(
    descrSurname,
    inputSurname,
    descrName,
    inputName,
    descrLastName,
    inputLastName,
  );
  modalContact.append(newContactsWrapp, wrapButtonAdd);
  modalForm.append(wrapInput, modalContact, errValidateBlock, saveClient, cancelButton);
  modalNewClients.append(modalTitleNew, btnCloseModal, modalForm);

  return modalNewClients;
}