const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');

// User Routes //

// router.get('/user', user_controller.index);

// Create user
router.get('/signup', user_controller.signup_get);

router.post('/signup', user_controller.signup_post);

// Login
router.get('/login', user_controller.login_get);

router.post('/login', user_controller.login_post);

// Logout
router.get('/logout', user_controller.logout);

// // GET request to delete user.
// router.get('/:id/delete', user_controller.user_delete_get);

// // POST request to delete user.
// router.post('/:id/delete', user_controller.user_delete_post);

// // GET request to update user.
// router.get('/:id/update', user_controller.user_update_get);

// // POST request to update user.
// router.post('/:id/update', user_controller.user_update_post);

// // GET request for one user.
// router.get('/:id', user_controller.user_detail);

module.exports = router;