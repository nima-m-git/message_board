const express = require('express');
const router = express.Router();

// Require controller modules
const message_controller = require('../controllers/messageController');

// Message Routes //

// messages index, show most recent messages
router.get('/', message_controller.message_index);

// GET request for creating a message.
router.get('/create', message_controller.message_create_get);

// POST request for creating message.
router.post('/create', message_controller.message_create_post);

// // GET request to delete message.
// router.get('/message/:id/delete', message_controller.message_delete_get);

// // POST request to delete message.
// router.post('/message/:id/delete', message_controller.message_delete_post);

// // GET request to update message.
// router.get('/message/:id/update', message_controller.message_update_get);

// // POST request to update message.
// router.post('/message/:id/update', message_controller.message_update_post);

// GET request for displaying one messages details.
router.get('/:id', message_controller.message_detail);

module.exports = router;