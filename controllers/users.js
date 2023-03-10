const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../middlewares/validation.js'); 


//register validation

let userRegister = async function(req, res)
 {
    //make validation before making the user
     
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message); 

    //check if user exists

    const userCheck = await User.findOne({email: req.body.email});
    if (userCheck) return res.status(400).json('Email arleady exists!');

    // encrypt the user password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

   // create new user 

    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,
    });
    try{
        const saveUser = await user.save();
        res.json(saveUser);
    }catch (err) {
        res.status(400).json(err); 
    }
};  

//login validation

let userLogin = async function(req, res)
 {
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message); 

        //check if user exists

        const userCheck = await User.findOne({email: req.body.email});
        if (!userCheck) return res.status(400).json('user not found!');

        // check the password

        const passCheck =  await bcrypt.compare(req.body.password, userCheck.password);
        if (!passCheck) return res.status(400).json('Invalid password!');
         
        //create assign token

        const token = jwt.sign({_id: userCheck._id}, process.env.TOKEN_SECRET);
        res.header('auth-token', token).json(token); 

};

//Get all users

let usersGet = async function(req, res)
{
    const users = await User.find();
    res.json(users);
 };
 
 //Get user by id
 
 let userGet = async function(req, res)
 {
     try{
         const user = await User.findOne({ _id: req.params.id})
         res.json(user)
     } catch{
         res.status(404)
         res.json({error: "user doesn't exist!"})
     }
  };
 
  // Edit user by id
  
  let userPatch = async function(req, res)
  {
     try{
         const user = await User.findOne({_id: req.params.id})
 
         if(req.body.firstname){
             user.firstname = req.body.firstname
         }
         if(req.body.lastname){
            user.lastname = req.body.lastname
        }
         if(req.body.email){
             user.email = req.body.email
         }
         await user.save()
         res.json(user)
     }
     catch{
         res.status(404)
         res.json({error:"user doesn't exist!!"})
     }
  };
 
  // Delete the user by id
 
  let userDelete = async function(req, res)
  {
     try{
         await User.deleteOne({_id: req.params.id})
         res.status(204).json()
     }
     catch{
         res.status(404)
         res.json({error:"user doesn't exist!"})
     }
  };

  module.exports ={ userDelete, userGet, usersGet, userPatch, userLogin, userRegister}