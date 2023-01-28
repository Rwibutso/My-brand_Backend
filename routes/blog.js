const express = require('express');
const blogs = express.Router();
const { Allblogs, oneBlog, addBlog, patchBlog, deleteBlog } = require('../controllers/blogs.js');
const checkToken = require('../middlewares/verifyToken');

// all blog Routes

blogs.get("/blogs", Allblogs);

blogs.get("/blog/:id", oneBlog);

blogs.post("/add-blog", addBlog);

blogs.patch("/edit-blog/:id", checkToken, patchBlog);

blogs.delete("/del-blog/:id", checkToken, deleteBlog);


module.exports = blogs;
