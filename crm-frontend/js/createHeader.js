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

  const inputSearch = createElement('input', {
    className: 'header__search',
    type: 'search',
    placeholder: 'Введите запрос',
  });

  
  headerBlock.append(image, inputSearch);
  container.append(headerBlock, title);
  section.append(container);

  return section;
}