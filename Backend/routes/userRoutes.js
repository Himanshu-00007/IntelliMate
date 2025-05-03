const express = require('express');
const router = express.Router();
const { createUser,saveChat, getChatHistory,deleteChat } = require("../controllers/userControllers");

router.post('/create', createUser);
router.post('/chatsaved',saveChat);
router.get('/history/:clerkId',getChatHistory);
router.delete('/deletechat/:clerkId/:chatId', deleteChat);
module.exports = router;
