const mongoose = require('mongoose');

const likeblogSchema = new mongoose.Schema({
    author:{type: String },
    blogId: {type: String}
});

module.exports = mongoose.model('Like', likeblogSchema);