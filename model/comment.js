const mongoose = require('mongoose');

const commentblogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
      },
    comment: {
        type: String,
        required: true
    },
    blogId: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Comment', commentblogSchema);