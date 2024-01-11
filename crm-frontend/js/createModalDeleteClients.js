import { createElement } from "./helper.js";

export const createModalDeleteClients = () => {

  const modalDelete = createElement('div', {
    className: 'modals__delete modal',
  });
  modalDelete.dataset.target = 'delete';

  const modalWrapper = createElement('div', {
    className: 'modal__wrap',
  });

  const modalTitle = createElement('div', {
    className: 'modal__title-delete',
    textContent: 'Удалить клиента',
  });

  const btnCloseModal = createElement('button', {
    className: 'modal__close-btn btn-reset',
    innerHTML: '<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2333 1.73333L15.2666 0.766664L8.49991 7.53336L1.73324 0.766696L0.766576 1.73336L7.53324 8.50003L0.766603 15.2667L1.73327 16.2333L8.49991 9.46669L15.2666 16.2334L16.2332 15.2667L9.46657 8.50003L16.2333 1.73333Z" fill="#B0B0B0" /> </svg>'
  });

  const descrModalDelete = createElement('p', {
    className: 'modal__close-descr',
    textContent: 'Вы действительно хотите удалить данного клиента?',
  })

  const deleteClientBtn = createElement('button', {
    className: 'delete-btn',
    textContent: 'Удалить',
  });

  const cancelClientBtn = createElement('button', {
    className: 'modal__cancel-contact-btn btn-reset',
    textContent: 'Отмена',
  });

  modalWrapper.append(modalTitle, btnCloseModal, descrModalDelete, deleteClientBtn, cancelClientBtn)

  modalDelete.append(modalWrapper);

  return modalDelete;
}