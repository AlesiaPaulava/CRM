import { changeInfoClients, delClientsGetData, getClientIdData, getClientsData, postData } from "./dataApi.js";
import { createElement, mask } from "./helper.js";
import { closeModal, openChangeAndDeleteModal, enableBodyScroll } from "./modalAction.js";

export const addClientBtn = () => {
  const errBlockNew = document.querySelector('.error-block-new');

  const submitHandler = async (event) => {
    event.preventDefault();
    errBlockNew.textContent = '';
    errBlockNew.style.color = 'red';
    errBlockNew.style.fontSize = '10px';

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

    // Проверка наличия данных о фамилии, имени и отчестве и отсутствия цифр
    if (formData.surname !== '' && formData.name !== '' && formData.lastName !== '') {
      // Проверка отсутствия цифр в полях ввода фамилии, имени и отчества
      const isValidSurname = !/\d/.test(formData.surname);
      const isValidName = !/\d/.test(formData.name);
      const isValidLastName = !/\d/.test(formData.lastName);

      if (isValidSurname && isValidName && isValidLastName) {
        // Если ввод допустим, отправляем данные на сервер и обновляем список клиентов
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
        // Если ввод содержит цифры, выводится сообщение об ошибке
        errBlockNew.textContent = 'Фамилия, имя и отчество не должны содержать цифры';
      }
    } else {
      // Если поля фамилии, имени или отчества пустые, выводится сообщение об ошибке
      errBlockNew.textContent = 'Фамилия, имя и отчество обязательны для заполнения';
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
      clientId = e.currentTarget.dataset.id;
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
        const spinnerSave = document.querySelector('.actions-spinnerSave');
        spinnerSave.style.display = 'flex';

        const modal = document.querySelector('.modal-overlay');

        try {
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
              enableBodyScroll(); // Вызов функции для восстановления скролла
            } else {
              return;
            }
          }
        } catch (error) {
          console.error('Error:', error);
        } finally {
          const spinnerSave = document.querySelector('.actions-spinnerSave');
          // Скрываем спиннер
          spinnerSave.style.display = 'none';
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
      const clientId = e.currentTarget.dataset.id;
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