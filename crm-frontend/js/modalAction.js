import { createModalChangeClients } from "./createModalChangeClients.js";
import { getDataClient } from "./dataApi.js";
import { clearAddedContacts, addContactBtnShow } from "./helper.js";


const onCloseModal = () => {
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalsWindow = document.querySelectorAll('.modal');
  const errBlockNew = document.querySelector('.error-block-new');
  const errBlockChange = document.querySelector('.error-block-change');
  const saveBtn = document.querySelector('.modal__save-contact-btn');
  const modalAddContactBtn = document.querySelector('.modal__add-contact-btn');

  modalOverlay.classList.remove('modal-overlay--visible');
  modalsWindow.forEach((el) => {
    el.classList.remove('modal--visible', 'animate__animated', 'animate__fadeInDown');
  });
  saveBtn.outerHTML = saveBtn.outerHTML;
  errBlockNew.textContent = '';
  errBlockChange.textContent = '';
  
  // Восстановление состояния кнопки "Добавить контакт"
  addContactBtnShow(modalAddContactBtn); // Показываем кнопку "Добавить контакт"
  enableBodyScroll();
};

const disableBodyScroll = () => {
  document.body.style.overflow = 'hidden';
};

export const enableBodyScroll = () => {
  document.body.style.overflow = ''; // Удалить стиль overflow, чтобы разблокировать скролл
};

// По клику открываем модальное окно с изменением
export const openChangeAndDeleteModal = () => {
  const buttonСhange = document.querySelectorAll('.btn-change');
  buttonСhange.forEach(button => {
    button.addEventListener('click', async () => {
      const clientId = button.dataset.id;
      const parentButton = button.closest('.btn-change');
      const spinner = parentButton.querySelector('.actions-spinnerEdit');
      const btnIcon = parentButton.querySelector('.svg-change');
      // Показываем спиннер при начале загрузки данных
      spinner.style.display = 'block';
      btnIcon.querySelector('path').setAttribute('fill', 'transparent');

      try {
        // код для загрузки данных клиента
        const data = await getDataClient(clientId);
        const modal = createModalChangeClients(clientId);
        const modalId = document.querySelector('.modal__id');
        modalId.textContent = `ID: ${clientId.substring(7, 13)}`;
        openModal('change', modal);
        disableBodyScroll();
      } catch (error) {
        console.error('Error loading client data:', error);
      } finally {
        // Скрываем спиннер после загрузки данных
        spinner.style.display = 'none';
        btnIcon.querySelector('path').setAttribute('fill', '#9873FF');
      }

    });
  });

  //  По клику открываем модальное окно с удалением
  const buttonDelete = document.querySelectorAll('.btn-delete');
  buttonDelete.forEach(button => {
    button.addEventListener('click', () => {
      const parentButton = button.closest('.btn-delete');
      const spinnerDel = parentButton.querySelector('.actions-spinnerDel');
      const btnIconDel = parentButton.querySelector('.svg-del');
      spinnerDel.style.display = 'block';
      btnIconDel.querySelector('path').setAttribute('fill', 'transparent');

      setTimeout(() => {
        spinnerDel.style.display = 'none';
        btnIconDel.querySelector('path').setAttribute('fill', '#F06A4D');

        openModal('delete');
        disableBodyScroll();
      }, 1000);
    });
  });
}

//Открытие модального окна
export const openModal = (path) => {
  const modalsWindow = document.querySelectorAll('.modal');
  const modalOverlay = document.querySelector('.modal-overlay');

  modalsWindow.forEach((el) => {
    el.classList.remove('modal--visible');
  });

  document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible', 'animate__animated', 'animate__fadeInDown');
  modalOverlay.classList.add('modal-overlay--visible');
  // Восстановление состояния кнопки "Добавить контакт"
  const modalAddContactBtn = document.querySelector('.modal__add-contact-btn');
  addContactBtnShow(modalAddContactBtn);
};

export const clickBtn = () => {
  const btns = document.querySelectorAll('.btn-modal');

  const modalsWindow = document.querySelectorAll('.modal');

  btns.forEach((el) => {
    el.addEventListener('click', (e) => {
      const path = e.currentTarget.getAttribute('data-path');

      openModal(path);
      disableBodyScroll();
    });

    el.addEventListener('click', (e) => {
      const path = e.currentTarget.getAttribute('data-path');
      const modalOverlay = document.querySelector('.modal-overlay');

      modalsWindow.forEach((modal) => {
        modal.classList.remove('modal--visible');
      });

      document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
      modalOverlay.classList.add('modal-overlay--visible');
    });
  });
};

export const closeModal = () => {
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalForm = document.querySelector('.modal__form');
  const btnCloseModal = document.querySelectorAll('.modal__close-btn');
  const cancelButton = document.querySelector('.modal__cancel-client-btn');
  const cancelDellButton = document.querySelectorAll('.modal__cancel-contact-btn');
  const addContacts = document.querySelectorAll('.modal__add-contact-btn'); 

  cancelButton.addEventListener('click', () => { //при клике на кнопку Отмена закрывается модальное окно
    onCloseModal();
    modalForm.reset();
    clearAddedContacts(addContacts);
    enableBodyScroll();   
  });

  // Закрыть модальное окно при клике вне его
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      onCloseModal();
      clearAddedContacts(addContacts);
      enableBodyScroll();    
    }
  });

  // Закрыть модальное окно по кнопке
  btnCloseModal.forEach((element) => {
    element.addEventListener('click', () => {
      onCloseModal();
      clearAddedContacts(addContacts);
      enableBodyScroll();     
    });
  });

  // Закрытие модального окна Удаления(по кнопке отменить)
  cancelDellButton.forEach((element) => {
    element.addEventListener('click', () => {
      onCloseModal();
      clearAddedContacts(addContacts);
      enableBodyScroll();      
    });
  });

  // Закрыть модальное окно при нажатии на Esc
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      onCloseModal();
      clearAddedContacts(addContacts);
      enableBodyScroll();     
    }
  });
};

export const dropdownPosition = () => {
  document.addEventListener('click', function (event) {
    const target = event.target;
    if (target.closest('.choices__inner')) {
      const select = target.closest('.choices');
      const dropdown = select.querySelector('.choices__list--dropdown');
      const dropdownRect = dropdown.getBoundingClientRect();
      const modalContactWrapp = document.querySelector('.modal__contact-wrapp');
      const modalContactWrappRect = modalContactWrapp.getBoundingClientRect();

      // Проверяем, если нижний край выпадающего списка ниже нижнего края модального окна
      if (dropdownRect.bottom > modalContactWrappRect.bottom) {
        // Позиционируем выпадающий список сверху модального окна
        dropdown.style.top = `-${dropdownRect.height}px`;
      } else {
        // Возвращаем позицию выпадающего списка по умолчанию
        dropdown.style.top = '';
      }
    }
  });
};