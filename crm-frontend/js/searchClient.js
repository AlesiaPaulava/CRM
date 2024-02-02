import { createAutocompleteList } from "./dataApi.js";

export const searchClient = () => {
  const inpSearch = document.querySelector('.header__search');
  const tbodyContainer = document.querySelector('.clients');
  let deleyTimer;
  inpSearch.addEventListener('input', () => {
    clearTimeout(deleyTimer);
    deleyTimer = setTimeout(() => {
      createAutocompleteList();
    }, 300);
    // Удаляем подсветку у всех элементов, имеющих класс 'highlighted'
    const highlightedContacts = document.querySelectorAll('.highlighted');
    highlightedContacts.forEach((contact) => {
      contact.classList.remove('highlighted');
    });
    // Прокручиваем родительский контейнер так, чтобы tbody оказался в верхней части видимой области
    tbodyContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // При загрузке страницы также прокрутим родительский контейнер в начало
  window.addEventListener('load', () => {
    tbodyContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  return inpSearch;
}
