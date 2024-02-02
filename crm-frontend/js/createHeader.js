import { createElement } from "./helper.js"

export const createHeader = () => {

  const section = createElement('section', {
    className: 'main',
  });

  const title = createElement('h1', {
    className: 'visually-hidden',
    textContent: 'CRM система',
  });

  const container = createElement('div', {
    className: 'container',
  });

  const headerBlock = createElement('div', {
    className: 'header',
  });

  const image = createElement('img', {
    className: 'header__logo',
    src: './img/header-logo.png',
    alt: 'Логотип',
    width: 50,
    height: 50,
  });

  const autocompleteWrap = createElement('div', {
    className: 'autocomplete-wrap',
  })

  const inputSearch = createElement('input', {
    className: 'header__search',
    type: 'search',
    placeholder: 'Введите запрос',
    autocomplete: 'off',
  });

  autocompleteWrap.append(inputSearch);
  headerBlock.append(image, autocompleteWrap); //
  container.append(headerBlock, title);
  section.append(container);

  // Функция для изменения логотипа и его размеров
  const updateLogo = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 640) {
      // Изменяем изображение и его размеры
      image.src = './img/header-logo-mobile.png';
      image.width = 24;
      image.height = 24;
    } else {
      // Изменяем изображение и его размеры обратно
      image.src = './img/header-logo.png';
      image.width = 50;
      image.height = 50;
    }
  };
  // Вызываем функцию при загрузке страницы и при изменении размера окна браузера
  window.addEventListener('load', updateLogo);
  window.addEventListener('resize', updateLogo);
  
  return section;
}