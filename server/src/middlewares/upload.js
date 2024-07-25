const multer = require('multer');

function uploadMiddleware(req, res, next) {
  console.log('multer middleware');
  const storage = multer.memoryStorage();
  const upload = multer({ storage });
  upload.single('file');
  next();
}

module.exports = uploadMiddleware;
