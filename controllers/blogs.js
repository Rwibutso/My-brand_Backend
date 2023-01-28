const Blog = require('../model/Blog');
const jwt = require('jsonwebtoken');
const {blogValidation} = require('../middlewares/validation.js');
const blogs = require('../routes/blog');




//blog validation

let addBlog = async function(req, res)
 {
    //make validation before making the user
     
    const {error} = blogValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message); 

   // create new blog 

    const blog = new Blog({
        tittle: req.body.tittle,
        description: req.body.description,
    });
    try{
        const saveBlog = await blog.save();
        res.send(saveBlog);
    }catch (err) {
        res.status(400).send("..."+err); 
    }
};  


//Get all blogs

let Allblogs = async function(req, res)
{
    const blog = await Blog.find();
    res.send(blogs);
 };
 
 //Get blog by id
 
 let oneBlog = async function(req, res)
 {
     try{
         const blog = await Blog.findOne({ _id: req.params.id})
         res.send(blog)
     } catch{
         res.status(404)
         res.send({error: "blog doesn't exist!"})
     }
  };
 
  // Edit blog by id
  
  let patchBlog = async function(req, res)
  {
     try{
         const blog = await Blog.findOne({_id: req.params.id})
 
         if(req.body.tittle){
             blog.tittle = req.body.tittle
         }
         if(req.body.description){
             blog.description = req.body.description
         }
         await blog.save()
         res.send(blog)
     }
     catch{
         res.status(404)
         res.send({error:"blog doesn't exist!!"})
     }
  };
 
  // Delete the user by id
 
  let deleteBlog = async function(req, res)
  {
     try{
         await Blog.deleteOne({_id: req.params.id})
         res.status(204).send()
     }
     catch{
         res.status(404)
         res.send({error:"blog doesn't exist!"})
     }
  };

  module.exports ={ deleteBlog, oneBlog, Allblogs, patchBlog, addBlog}

