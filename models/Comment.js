
const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
    content: { type: String, require: true },
    userId: { type: mongoose.Schema.ObjectId, ref: "User" },
    movieIds: { type: mongoose.Schema.ObjectId, ref: "Movie" },
    replies: [{
        _id: { type: mongoose.Schema.ObjectId, auto: true },
        parentId: { type: String },
        content: { type: String },
    }]
}, {
    timestamps: true,
})
module.exports = mongoose.model("Comment", CommentSchema)