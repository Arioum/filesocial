const router = require('express').Router();

// Controllers
const { userRegister, userLogin, editProfileDetails, getUserStats } = require('../controllers/auth.controller');
const { uploadFile, getAllFilesByUserId, downloadFile, cancelUploads } = require('../controllers/file.controller');
const { createShareAction, cancelShareAction, receiveSharedFiles, getShareHistory, getActiveShare } = require('../controllers/share.controller');
const { createStripePaymentIntent, createSubscription, getSubscriptionDetails } = require('../controllers/subscription.controller');

// Middlewares
const { requireAuthentication, authorize } = require('../middlewares/jwtMiddleware');

// Routes
// User
router.post('/auth', requireAuthentication, authorize);
router.post('/auth/register', userRegister);
router.post('/auth/login', userLogin);
router.post('/update-profile', requireAuthentication, editProfileDetails);
router.get('/get-user-stats', requireAuthentication, getUserStats);
// File
router.post('/get-presigned-url', uploadFile);
router.get('/download-file/:fileId', downloadFile);
router.get('/get-all-files', requireAuthentication, getAllFilesByUserId);
router.post('/cancel-uploads', requireAuthentication, cancelUploads);
// Share
router.post('/share/start', requireAuthentication, createShareAction);
router.post('/share/stop', requireAuthentication, cancelShareAction);
router.get('/get-active-share', requireAuthentication, getActiveShare);
router.get('/get-share-history', requireAuthentication, getShareHistory);
router.get('/share/:sharableCode', receiveSharedFiles);
// Subscription - payments
router.post('/subscribe/:tier/payment-intent', requireAuthentication, createStripePaymentIntent);
router.post('/subscribe/:tier/', requireAuthentication, createSubscription);
router.get('/your-plan-details', requireAuthentication, getSubscriptionDetails);

// Health check
router.get('/', (req, res) => {
  res.send('OK');
});

module.exports = router;
