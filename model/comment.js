const mongoose = require('mongoose');

const commentblogSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
      },
    blogId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
      }
});

module.exports = mongoose.model('Comment', commentblogSchema);