import { createModalChangeClients } from "./createModalChangeClients.js";
import { getDataClient } from "./dataApi.js";

const onCloseModal = () => {
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalsWindow = document.querySelectorAll('.modal');
  const errBlockNew = document.querySelector('.error-block-new');
  const errBlockChange = document.querySelector('.error-block-change');
  const saveBtn = document.querySelector('.modal__save-contact-btn');

  modalOverlay.classList.remove('modal-overlay--visible');
  modalsWindow.forEach((el) => {
    el.classList.remove('modal--visible', 'animate__animated', 'animate__fadeInDown');
  });
  saveBtn.outerHTML = saveBtn.outerHTML;
  errBlockNew.textContent = '';
  errBlockChange.textContent = '';
};

// По клику открываем модальное окно с изменением
export const openChangeAndDeleteModal = () => {
  const buttonСhange = document.querySelectorAll('.btn-change');
  buttonСhange.forEach(button => {
    button.addEventListener('click', async () => {
      const clientId = button.dataset.id;
      const parentButton = button.closest('.btn-change');
      const textChange = button.querySelector('.black-text');
      const spinner = parentButton.querySelector('.actions-spinnerEdit');
      const btnIcon = parentButton.querySelector('.svg-change');
      // Показываем спиннер при начале загрузки данных
      // spinner.style.visibility = 'visible';
      // btnIcon.style.visibility = 'hidden';
      spinner.style.display = 'block';
      btnIcon.querySelector('path').setAttribute('fill', 'transparent');

      try {
        // Здесь ваш код для загрузки данных клиента
        const data = await getDataClient(clientId);
        const modal = createModalChangeClients(clientId);
        const modalId = document.querySelector('.modal__id');
        modalId.textContent = `ID: ${clientId.substring(7, 13)}`;
        openModal('change', modal);
      } catch (error) {
        console.error('Error loading client data:', error);
      } finally {
        // Скрываем спиннер после загрузки данных
        // spinner.style.visibility = 'hidden';
        // btnIcon.style.visibility = 'visible';
        spinner.style.display = 'none';
        btnIcon.querySelector('path').setAttribute('fill', '#9873FF');
      }

    });
  });

  //  По клику открываем модальное окно с удалением
  const buttonDelete = document.querySelectorAll('.btn-delete');
  buttonDelete.forEach(button => {
    button.addEventListener('click', () => {
      openModal('delete');
    });
  })
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
};


export const clickBtn = () => {
  const btns = document.querySelectorAll('.btn-modal');
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalsWindow = document.querySelectorAll('.modal');

  btns.forEach((el) => {
    el.addEventListener('click', (e) => {
      const path = e.currentTarget.getAttribute('data-path');
      const clientId = e.currentTarget.getAttribute('data-id');
      const modal = createModalChangeClients(clientId);
      modalOverlay.append(modal);
      openModal(path);
    });

    el.addEventListener('click', (e) => {
      const path = e.currentTarget.getAttribute('data-path');

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


  cancelButton.addEventListener('click', () => { //при клике на кнопку Отмена закрывается модальное окно

    onCloseModal();
    modalForm.reset();
  });

  // Закрыть модальное окно при клике вне его
  modalOverlay.addEventListener('click', (e) => {

    if (e.target === modalOverlay) {
      onCloseModal();
    }
  });

  // Закрыть модальное окно по кнопке
  btnCloseModal.forEach((element) => {
    element.addEventListener('click', () => {
      onCloseModal();
    });
  });

  // Закрытие модального окна Удаления(по кнопке отменить)
  cancelDellButton.forEach((element) => {
    element.addEventListener('click', () => {
      onCloseModal();
    });
  });


  // Закрыть модальное окно при нажатии на Esc
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      onCloseModal();
    }
  });

};
