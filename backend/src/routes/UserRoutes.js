// const express = require('express');
// const router = express.Router();
// const UserController = require('../controllers/UserController');
// const authMiddleware = require('../middleware/authMiddleware');

// router.post('/create',UserController.createUser);
// router.delete('/:id',UserController.deleteUser);
// router.post('/login', UserController.authLogin);
// router.post('/logout', UserController.logout);
// router.get('/:id', UserController.getUser);
// router.get('/', UserController.getAllUsers);

// module.exports = router;


const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Public routes
router.post('/register', UserController.createUser);
router.post('/register-admin', UserController.createAdmin);
router.post('/login', UserController.authLogin);
router.post('/logout', UserController.logout);

// Protected/Admin routes
router.get('/:id', UserController.getUser);
router.get('/', UserController.getAllUsers);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
