const Message = require('../model/message');
const jwt = require('jsonwebtoken');
const {messageValidation} = require('../middlewares/validation.js');
const messages = require('../routes/blog');





//message validation

let addMessage = async function(req, res)
 {
    //make validation before making the message
     
    const {error} = messageValidation(req.body);
    if (error) {
        console.log(error)
        return res.status(400).json(error.details[0].message); 
    }

   // create new message 

    const message = new Message({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        message: req.body.message,
    });
    try{
        const saveMessage = await message.save();
        res.json(saveMessage);
    }catch (err) {
        res.status(400).json(err); 
        console.log(err)
    }
};  


//Get all messages

let allMessage = async function(req, res)
{
    const message = await Message.find();
    res.json(message);
 };
 
 
 
// Delete the user by id
 
let deleteMessage = async function(req, res)
  {
     try{
         await Message.deleteOne({_id: req.params.id})
         res.status(204).json()
     }
     catch{
         res.status(404)
         res.json({error:"message doesn't exist!"})
     }
  };

  module.exports ={ deleteMessage, allMessage, addMessage}