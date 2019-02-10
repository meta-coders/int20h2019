# EmotionTime

Що необхідно для коректної роботи застосунку на локальній машині:

- [Node.js](https://nodejs.org/en/), [NPM](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- `api_key` для ресурсу `Flickr API`(без ключа ви не зможете користуватися `Flickr API`). 
Отримати його можна після реєстрації [тут](https://www.flickr.com/services/api/keys/).
- `api_key` та `api_secret` для ресурсу `Face++`. Отримати їх можна [тут](https://console.faceplusplus.com/app/apikey/create).

## Підготовка

#### Крок 1

Склонуйте репозиторій за допомогою даної команди:
```
git clone https://github.com/meta-coders/int20h2019.git
```

#### Крок 2

У `PostgreSQL` створіть базу даних для застосунку. 

#### Крок 3

Встановіть змінні середовища:

- `FLICKR_API_KEY` - ключ API для ресурсу `Flick API`.
- `FACEPP_API_KEY` - ключ API для ресурсу `Face++`.
- `FACEPP_SECRET` - ключ SECRET `Face++`.
- `PORT` - порт мережевого інтерфейсу, на якому буде піднято сервер застосунку. 
- `DATABASE_URL` - адресса підключення до бази данних. Наприклад, якщо власником 
бази данних є користувач `username`, його пароль `password`, назва бази даних `database_name`,
хостнейм сервера `localhost` а порт `5432`, то адреса підключеня вигляатиме так:
`postgres://username:password@localhost:5432/database_name`

## Запуск

Після того як все готово, перейдіть до склонованого репозиторію:
```
cd int20h2019/
```

Та запустіть `npm`-скрипти `isntall` та `start`:
```
npm install
npm start
```

## Використання

Веб сторінка застосунку представлена набором фотографій з хакатону INT20h 2016. 
Фільтр фотографій розташований з лівого краю сторінки. Обираючи емоції у фільтрі, 
ви регулюєте відображення фотографій на сторінці.    

