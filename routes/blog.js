const express = require('express');
const blogs = express.Router();
const { Allblogs, oneBlog, addBlog, patchBlog, deleteBlog, likeBlog, getlikeBlog, commentBlog, getcomentBlog, getcomentBlogNumber} = require('../controllers/blogs.js');
const checkToken = require('../middlewares/verifyToken');

// all blog Routes

blogs.get("/blogs", Allblogs);

blogs.get("/blog/:id", oneBlog);

blogs.get("/blog-like-get/:id", getlikeBlog);

blogs.get("/blog-comment-get/:id", getcomentBlog);

blogs.get("/blog-comment-length/:id", getcomentBlogNumber);

blogs.post("/add-blog/:id", addBlog);

blogs.post("/blog-like/:id", likeBlog);

blogs.post("/blog-comment/:id", commentBlog);

blogs.patch("/edit-blog/:id", checkToken, patchBlog);

blogs.delete("/del-blog/:id", checkToken, deleteBlog);



module.exports = blogs;
