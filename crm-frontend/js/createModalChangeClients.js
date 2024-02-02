import { addContactBtnShow, createElement, mask, svgIcons } from "./helper.js";
import { createModalNewClients } from "./createModalNewClients.js";
import { createModalDeleteClients } from "./createModalDeleteClients.js";
import { multiDefault } from "./choices.js";
import { createContact } from "./createContact.js";

export const createModalChangeClients = () => {

  const modalOverlay = createElement('div', {
    className: 'modal-overlay',
  });

  const modalСhange = createElement('div', {
    className: 'modals__change modal',
  });
  modalСhange.dataset.target = 'change';

  const modalContentTop = createElement('div', {
    className: 'modal__top',
  });

  const modalTitle = createElement('div', {
    className: 'modal__title',
    textContent: 'Изменить данные',
  });

  const modalId = createElement('span', {
    className: 'modal__id',
  });

  const btnCloseModal = createElement('button', {
    className: 'modal__close-btn btn-reset',
    innerHTML: '<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2333 1.73333L15.2666 0.766664L8.49991 7.53336L1.73324 0.766696L0.766576 1.73336L7.53324 8.50003L0.766603 15.2667L1.73327 16.2333L8.49991 9.46669L15.2666 16.2334L16.2332 15.2667L9.46657 8.50003L16.2333 1.73333Z" fill="#B0B0B0" /> </svg>'
  });

  const modalForm = createElement('form', {
    className: 'modal__form',
  });

  const wrapInput = createElement('div', {
    className: 'input-dscr',
  });

  const descrSurname = createElement('span', {
    className: 'inp-title',
    textContent: 'Фамилия*',
  });

  const inputSurname = createElement('input', {
    className: 'input input-surname',
  });

  const descrName = createElement('span', {
    className: 'inp-title',
    textContent: 'Имя*',
  });

  const inputName = createElement('input', {
    className: 'input input-name',
  });

  const descrLastName = createElement('span', {
    className: 'inp-title',
    textContent: 'Отчество*',
  });

  const inputLastName = createElement('input', {
    className: 'input input-lastname',
  });

  const modalContact = createElement('div', {
    className: 'modal__contact',
  });

  const wrapButtonAdd = createElement('div', {
    className: 'modal__add-contact-wrap',
  });

  const errValidateBlock = createElement('div', {
    className: 'error-block-change',
  });

  const addContact = createElement('button', {
    className: 'modal__add-contact-btn btn-reset',
    type: 'button',
    innerHTML: `${svgIcons.addContact} Добавить контакт`,
  });
  wrapButtonAdd.append(addContact);
  modalContact.append(wrapButtonAdd);

  addContact.addEventListener('click', () => { //при клике на кнопку создаются элементы для внесения контактов
    modalContact.prepend(createContact());

    const newSelect = modalContact.querySelector('.multi-select');
    const newInputSelect = modalContact.querySelector('#contact-input');

    const im = new Inputmask("+375 (99) 999-99-99");
    im.mask(newInputSelect);

    newSelect.addEventListener('change', () => {
      mask(newSelect.value, newInputSelect);
    });
    multiDefault(); //вызов choices(кастомного селекта)

    addContactBtnShow(addContact);
  });

  const saveClient = createElement('button', {
    className: 'modal__save-contact-btn',
    textContent: 'Сохранить',
    type: 'submit',
  });

  const saveSpinner = createElement('span', {
    className: 'actions-spinnerSave',
    innerHTML: svgIcons.saveSpinner
  });

  const deleteClient = createElement('button', {
    className: 'modal__delete-contact-btn btn-reset',
    textContent: 'Удалить клиента',
  });

  const modalNewClients = createModalNewClients();
  const modalDelete = createModalDeleteClients();

  wrapInput.append(
    descrSurname,
    inputSurname,
    descrName,
    inputName,
    descrLastName,
    inputLastName,
  );
  saveClient.prepend(saveSpinner);
  modalForm.append(wrapInput, modalContact,errValidateBlock, saveClient, deleteClient);
  modalContentTop.append(modalTitle, modalId);
  modalСhange.append(modalContentTop, btnCloseModal, modalForm);
  modalOverlay.append(modalСhange, modalDelete, modalNewClients);

  return modalOverlay;
}