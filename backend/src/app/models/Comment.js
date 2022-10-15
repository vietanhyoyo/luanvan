const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema({
    news: { type: Schema.Types.ObjectId, ref: 'News', required: true },
    createUser: { type: Schema.Types.ObjectId, ref: 'Account', required: true},
    text: { type: String, required: true },
    usersLike: [{ type: Schema.Types.ObjectId, ref: 'Account'}],
}, {
    timestamps: true
})

module.exports = mongoose.model('Comment', Comment);