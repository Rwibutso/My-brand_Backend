const Blog = require('../model/Blog');
const Comment = require('../model/comment');
const Like = require('../model/like');
const User = require('../model/User');
const {blogValidation, commentValidation, likeValidation} = require('../middlewares/validation.js');
const { func } = require('@hapi/joi');




//blog validation

let addBlog = async function(req, res)
 {
    //make validation before making the user
     
    const {error} = blogValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message); 

   // create new blog 
    const user = await User.findById({ _id: req.params.id});
    const blog = new Blog({
        tittle: req.body.tittle,
        description: req.body.description,
        user: user.id,
        name: user.firstname +" "+ user.lastname
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
    const blogs = await Blog.find();
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

// Save a blog like

let likeBlog  = async function(req, res) {
    // validate the like
    const {error} = likeValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message); 
  
    // create a like
    const user = await User.findOne({ _id: req.params.id}); 
    const like = new Like({
        name: user.lastname,
        user: user.id,
        blogId: req.body.blogId,
    });
    
    try {    
      // Check if the post has already been liked

      const existingLike = await Like.findOne({ user: user.id, blogId: req.body.blogId });
      if (existingLike) return res.status(400).json({ msg: 'Blog already liked' });
  
      const saveLike = await like.save();
      res.send(saveLike);
    } catch (err) {
      res.status(400).send("..." + err); 
    }
  };

let getlikeBlog = async function(req, res)
   {
    try{
        const likes = await Like.find({ blogId: req.params.id});
        res.send(likes)
      
  } catch {
      res.send("blog doesn't exist!")
  }
};
  
let getlikeBlognumber = async function(req, res)
   {
    try{
        const likes = await Comment.find({ blogId: req.params.id});
        res.send(likes).length
      
  } catch {
      res.send("blog doesn't exist!")
  }
};

// coment a blog

let commentBlog  = async function(req, res)
 {
    // validate the comment

    const {error} = commentValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message); 

    // create a comment
    const user = await User.findOne({_id: req.params.id});
    const comment = new Comment({
        name: user.lastname,
        comment: req.body.comment,
        blogId: req.body.blogId,
        userId: user.id
    });
    try{    
        const saveComment = await comment.save()
        res.send(saveComment);
    }catch (err) {
        res.status(400).send("..."+err); 
    };
}

// get a coment a blog by id

let getcomentBlog = async function(req, res)
   {

      try{
            const comments = await Comment.find({ blogId: req.params.id});
            res.send(comments)
          
      } catch {
          res.send("blog doesn't exist!")
      }
};

// number of coments of a blog

let getcomentBlogNumber = async function(req, res)
   {

      try{
            const comments = await Comment.find({ blogId: req.params.id});
            res.send(comments).length
          
      } catch {
          res.send("blog doesn't exist!")
      }
};
  
  

module.exports ={ deleteBlog, oneBlog, Allblogs, patchBlog, addBlog, likeBlog, getlikeBlog, getlikeBlognumber, commentBlog, getcomentBlog, getcomentBlogNumber}