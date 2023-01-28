const express = require('express');
const users = express.Router();
const { usersGet, userGet,userLogin, userRegister, userPatch, userDelete } = require('../controllers/users.js');

// all user Routes

users.get("/users", usersGet)

users.get("/users/:id", userGet)

users.post("/user-register", userRegister)

users.post("/user-login", userLogin)

users.patch("/edit-user/:id", userPatch)

users.delete("/del-user/:id", userDelete)

module.exports = users;
