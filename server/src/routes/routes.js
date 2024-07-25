const router = require('express').Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
// controllers
const uploadsController = require('../controllers/upload.controller');
// Middlewares
const uploadMiddleware = require('../middlewares/upload');

router.get('/', (req, res) => {
  res.send('Hi');
});

router.post('/upload', upload.single('file'), uploadsController);

module.exports = router;
