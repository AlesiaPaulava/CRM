// СОРТИРОВКА ПО ФИО
let sortDirection = 'asc';

const compareProp = (clientOne, clientTwo, prop) => {
  const nameOne = clientOne[prop] ? clientOne[prop].toUpperCase() : '';
  const nameTwo = clientTwo[prop] ? clientTwo[prop].toUpperCase() : '';

  let comparison = 0;

  if (nameOne > nameTwo) {
    comparison = 1;
  } else if (nameOne < nameTwo) {
    comparison = -1;
  }
  return sortDirection === 'desc' ? comparison * -1 : comparison;
}

const compareDates = (dateOne, dateTwo) => {
  const valueOne = new Date(dateOne);
  const valueTwo = new Date(dateTwo);

  let comparison = 0;

  if (valueOne > valueTwo) {
    comparison = 1;
  } else if (valueOne < valueTwo) {
    comparison = -1;
  }

  return sortDirection === 'desc' ? comparison * -1 : comparison;
}

export const sortClietns = (clients, prop) => {
  clients.sort((a, b) => {
    if (prop === 'createdAt' || prop === 'updatedAt') {
      return compareDates(a[prop], b[prop]);
    } else {
      return compareProp(a, b, prop);
    }
  });
}

export const addSortListener = (btn, clients, prop) => {
  const arrowElement = btn.querySelector('svg'); // Находим элемент <svg> внутри кнопки

  btn.addEventListener('click', () => {
    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    sortClietns(clients, prop);

    // Переворачиваем стрелку в зависимости от направления сортировки
    if (arrowElement) {
      arrowElement.style.transform = `rotate(${sortDirection === 'desc' ? '180deg' : '0'})`;
    }
  })
}