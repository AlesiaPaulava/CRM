# <img src="http://img.sergey-gadaev.tmweb.ru/program-ux.png" height="26"/> CRM skillbus - система управления контактными данными клиентов

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

> Используется JavScript, HTML, CSS

## Информация о проекте

Мною создана программа в которой реализован базовый функционал работы с контактной информацией всех клиентов. Backend-часть проекта уже разработана, я же создала интерфейс проекта (frontend). Есть возможность просмотра списка клиентов в виде таблицы, добавление нового клиента, изменение информации о существующем клиенте (ФИО и контактная информация) и удаление клиента. Все заголовки колонок, кроме контактов и действий, можно нажать, чтобы установить сортировку по соответствующему полю. Первое нажатие устанавливает сортировку по возрастанию, повторное - по убыванию. При вводе текста в поле поиска данные таблицы перезапрашиваются из API с введённым поисковым запросом, при этом запрос отправляется только после окончания ввода поискового запроса пользователем. Все контакты клиента отображаются в виде иконок с сылками на данный контакт, так же при наведении появляется всплывающая подсказка с типом и значением этого контакта. При добавлении, удалении и изменении клиента появляется модальное окно.

## Запуск приложения

1. Необходимо склонировать все содержимое репозитория `git clone <this repo>` или скачать ZIP архив репозитория.
2. Затем для запуска сервера, находясь в корне проекта, необходимо перейти в папку `crm-backend`. Открыв командную строку выполните команду `node index`. Перед запуском убедитесь, что вы установили Node.js версии 12 или выше.
3. Далее в связи с политекой CORS вам необходимо запустить проект из папки `crm-frontend` с помощью плагина Live Server в вашем редакторе кода или любого другого сервера.

