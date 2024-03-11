export const multiDefault = () => {
  const elements = document.querySelectorAll('.multi-select');
  elements.forEach(el => {
    // Проверяем, не инициализирован ли уже плагин на данном элементе
    if (!el.classList.contains('choices-initialized')) {
      const choices = new Choices(el, {
        searchEnabled: false,
        itemSelectText: '',
        shouldSort: false,
        
      });
      // Добавляем класс для отметки инициализации плагина
      el.classList.add('choices-initialized');
    };
  });
};

