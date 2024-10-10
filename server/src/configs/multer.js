const multer = require('multer');

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 5MB file size limit
  },
});

module.exports = upload;
