const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  
    tittle:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required:true,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Blog', blogSchema);