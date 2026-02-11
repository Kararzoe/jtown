const express = require('express');
const { getChats, getChat, createChat, sendMessage } = require('../controllers/chatController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, getChats);
router.get('/:id', protect, getChat);
router.post('/', protect, createChat);
router.post('/:id/message', protect, sendMessage);

module.exports = router;
