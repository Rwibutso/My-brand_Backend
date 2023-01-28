const express = require('express');
const { allMessage, addMessage, deleteMessage } = require('../controllers/messages.js')
const messages = express.Router();
const checkToken = require('../middlewares/verifyToken');


messages.post("/add-messages", addMessage)

messages.get("/messages", checkToken, allMessage)

messages.delete("/del-message/:id", checkToken, deleteMessage)


module.exports = messages;
