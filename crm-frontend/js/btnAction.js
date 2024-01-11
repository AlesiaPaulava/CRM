import { changeInfoClients, delClientsGetData, getClientIdData, getClientsData, postData } from "./dataApi.js";
import { createElement, mask } from "./helper.js";
import { closeModal, openChangeAndDeleteModal } from "./modalAction.js";

export const addClientBtn = () => {
  const errBlockNew = document.querySelector('.error-block-new');
  
  const submitHandler = async (event) => {
    event.preventDefault();
    errBlockNew.textContent = '';

    //извлечение данных из формы
    const form = document.getElementById('form');
    const modal = document.querySelector('.modal-overlay');
    const myForm = new FormData(form);
    const formData = {
      surname: myForm.get('surname'),
      name: myForm.get('name'),
      lastName: myForm.get('lastname'),
      contacts: [],
    }

    //извлечение данных о контактах из формы
    const contactElements = form.querySelectorAll('.modal__contact-descr');
    contactElements.forEach(contactElement => {
      const type = contactElement.querySelector('[name="type"]').value;
      const value = contactElement.querySelector('[name="value"]').value;

      const contact = { type, value };
      formData.contacts.push(contact);
    });

    //Проверка наличия данных о фамилии и имени
    if (formData.surname !== '' && formData.name !== '') {
      //Отправка данных на сервер и обновление списка клиентов
      await postData(formData);
      await getClientsData();
      form.reset();
      // Удаление блоков с описанием контактов
      const modalContactsDescr = document.querySelectorAll('.modal__contact-descr');
      modalContactsDescr.forEach(contactDescr => {
        contactDescr.remove();
      });
      // Закрытие модального окна
      if (modal.classList.contains('modal-overlay--visible')) {
        modal.classList.remove('modal-overlay--visible');
        form.removeEventListener('click', submitHandler);
      } else {
        return;
      }
    } else {
      // Обработка ошибок валидации
      const validateInput = await postData(formData);
      validateInput.forEach(inpError => {
        const errorField = createElement('span', {
          className: 'error-field',
          textContent: inpError.message,
        });
        errBlockNew.append(errorField);
      });
    }
  };

  const buttonAdd = document.querySelector('.clients__btn');

  buttonAdd.addEventListener('click', () => {
    const form = document.getElementById('form');
    form.reset();

    form.addEventListener('submit', submitHandler);
  });
}

export const changeAndDelClient = () => {
  const buttonСhange = document.querySelectorAll('.btn-change');
  const buttonDelete = document.querySelectorAll('.btn-delete');
  const errBlockChange = document.querySelector('.error-block-change');

  buttonСhange.forEach(bChange => {
    let clientId;
    bChange.addEventListener('click', async (e) => {
      clientId = e.target.dataset.id;
      const btnDelete = document.querySelector('.modal__delete-contact-btn');
      btnDelete.dataset.id = clientId;

      const clientInfo = await getClientIdData(clientId);

      const modalContact = document.querySelector('.modal__contact');

      if (clientInfo.contacts.length === 0) {
        const notContacts = modalContact.querySelectorAll('.modal__contact-descr');
        notContacts.forEach((contact) => contact.remove());
      } else {
        const haveContacts = modalContact.querySelectorAll('.modal__contact-descr');
        haveContacts.forEach((contact) => {
          const selectModal = contact.querySelector('.multi-select');
          const inputModal = contact.querySelector('#contact-input');
          mask(selectModal.value, inputModal);
          selectModal.addEventListener('change', () => {
            mask(selectModal.value, inputModal);
          });
        });
      }

      const sBtn = document.querySelector('.modal__save-contact-btn');
      sBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        errBlockChange.textContent = '';
        const modal = document.querySelector('.modal-overlay');
        if (modal.classList.contains('modal-overlay--visible')) {
          const inpSurname = document.querySelector('.input-surname').value;
          const inpName = document.querySelector('.input-name').value;
          const inpLastName = document.querySelector('.input-lastname').value;
          const formData = {
            surname: inpSurname,
            name: inpName,
            lastName: inpLastName,
            contacts: [],
          }

          const modalContact = document.querySelector('.modal__contact');
          const contactElements = modalContact.querySelectorAll('.modal__contact-descr');
          if (contactElements) {
            contactElements.forEach(contactElement => {
              const type = contactElement.querySelector('[name="type"]').value;
              const value = contactElement.querySelector('[name="value"]').value;
              const contact = { type, value };
              formData.contacts.push(contact);
            });
          }

          await changeInfoClients(clientId, formData);
          await getClientsData();

          if (formData.surname === '' || formData.name === '') {
            const validateChangeInput = await changeInfoClients(clientId, formData);
            validateChangeInput.forEach(inpError => {
              console.log('inpError: ', inpError);
              const errorField = createElement('span', {
                className: 'error-field',
                textContent: inpError.message,
              });
              errBlockChange.append(errorField);
            });
          }
          if (modal.classList.contains('modal-overlay--visible') && formData.surname !== '' && formData.name !== '') {
            modal.classList.remove('modal-overlay--visible');
            const saveBtn = document.querySelector('.modal__save-contact-btn');
            saveBtn.outerHTML = saveBtn.outerHTML;
          } else {
            return;
          }
        }
      });
    });
  });

  // СОБЫТИЕ УДАЛЕНИЕ КЛИЕНТА
  const handleDeleteClientClick = async () => {
    const btnDeleteCLient = document.querySelector('.delete-btn');
    const id = btnDeleteCLient.dataset.id;
    const modal = document.querySelector('.modal-overlay');
    if (modal.classList.contains('modal-overlay--visible')) {
      modal.classList.remove('modal-overlay--visible');
      await delClientsGetData(id);
    }
    closeModal();
  }

  buttonDelete.forEach(bDel => {
    bDel.addEventListener('click', (e) => {
      const clientId = e.target.dataset.id;
      const btnDeleteCLient = document.querySelector('.delete-btn');
      btnDeleteCLient.dataset.id = clientId;

      btnDeleteCLient.addEventListener('click', handleDeleteClientClick);
    });
  });

  // СОБЫТИЕ УДАЛЕНИЕ КЛИЕНТА
  const handleDeleteClientFromModalChange = async (e) => {
    e.preventDefault();
    const changeClientDelete = document.querySelector('.modal__delete-contact-btn');
    const id = changeClientDelete.dataset.id;

    const modal = document.querySelector('.modal-overlay');
    if (modal.classList.contains('modal-overlay--visible')) {
      modal.classList.remove('modal-overlay--visible');
      await delClientsGetData(id);
    }
    closeModal();
  }

  const changeClientDelete = document.querySelectorAll('.modal__delete-contact-btn');
  changeClientDelete.forEach(deleteCl => {
    deleteCl.addEventListener('click', handleDeleteClientFromModalChange);
  })
  openChangeAndDeleteModal(); // открытие модалки ИЗМЕНЕНИЕ КЛИЕНТА и УДАЛЕНИЕ
}