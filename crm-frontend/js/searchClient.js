import { getSearchClientsData } from "./dataApi.js";

export const searchClient = () => {
  const inpSearch = document.querySelector('.header__search');
  let deleyTimer;
  inpSearch.addEventListener('input', () => {
    clearTimeout(deleyTimer);
    deleyTimer = setTimeout(() => {
      getSearchClientsData()
      .then()
      .catch((error) => {
        console.error(error);
      });
    }, 300);
  });
  return inpSearch;
}