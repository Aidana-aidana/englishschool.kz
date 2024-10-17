const express = require('express');
const multer  = require('multer');
const path = require('path');

const app = express();

// Настраиваем хранилище для multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Настройка статической папки для файлов, включая index.html
app.use(express.static(path.join(__dirname, 'public')));

// Роут для обработки загрузки файлов
app.post('/upload', upload.single('uploadedFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'Файл не был загружен.' });
  }
  res.send({ message: 'Файл успешно загружен!', file: req.file });
});

// Обработка всех GET-запросов на корневой маршрут
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // отправляем файл index.html
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});