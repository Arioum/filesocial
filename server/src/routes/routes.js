const router = require('express').Router();
// const multer = require('multer');
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// Controllers
// const { uploadFiles } = require('../controllers/upload.controller');
const { userRegister, userLogin } = require('../controllers/auth.controller');
const { uploadFile, getAllFilesByUserId, downloadFile } = require('../controllers/file.controller');
const { createShareAction, cancelShareAction, receiveSharedFiles } = require('../controllers/share.controller');
const { createStripePaymentIntent, createSubscription } = require('../controllers/subscription.controller');

// Middlewares
// const { uploadMiddleware } = require('../middlewares/upload');
const { requireAuthentication, authorize } = require('../middlewares/jwtMiddleware');

// Routes
// router.post('/upload', upload.single('file'), uploadFiles);
// User
router.post('/auth', requireAuthentication, authorize);
router.post('/auth/register', userRegister);
router.post('/auth/login', userLogin);
// File
router.post('/get-presigned-url', uploadFile);
router.get('/download-file/:fileId', downloadFile);
router.get('/get-all-files', getAllFilesByUserId);
// Share
router.post('/share/start', requireAuthentication, createShareAction);
router.post('/share/stop', requireAuthentication, cancelShareAction);
router.get('/share/:sharableCode', receiveSharedFiles);

// Payments
router.post('/subscribe/:tier/payment-intent', createStripePaymentIntent);
router.post('/subscribe/:tier/', createSubscription);

// Health check
router.get('/', (req, res) => {
  res.send('OK');
});

module.exports = router;
