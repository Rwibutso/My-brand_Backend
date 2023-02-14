const mongoose = require('mongoose');

const likeblogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
    },
    blogId: {
        type: String
    },
    name: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Like', likeblogSchema);