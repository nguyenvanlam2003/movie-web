const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
    content: { type: String, require: true },
    userId: { type: mongoose.Schema.ObjectId, ref: "User", require: true },
    movieId: { type: mongoose.Schema.ObjectId, ref: "Movie", require: true },
    parentId: { type: mongoose.Schema.ObjectId, ref: "Comment" },
    replies: [{
        _id: { type: mongoose.Schema.ObjectId, auto: true },
        userId: { type: mongoose.Schema.ObjectId, ref: "User" },
        parentId: { type: mongoose.Schema.ObjectId, ref: "Comment" },
        contentReplies: { type: String },
    }]
}, {
    timestamps: true,
})
module.exports = mongoose.model("Comment", CommentSchema)