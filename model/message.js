const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    firstname:{type: String,
    required: true
    },
    lastname:{type: String,
        required: true
    },
    email:{type: String,
        required: true
        },
    message: {
        type: String,
        required:true,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Message', messageSchema);