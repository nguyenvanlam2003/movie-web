const mongoose = require("mongoose");

const GenreSchema = new mongoose.Schema({
    nameGenre: { type: String, require: true, unique: true },
    desc: { type: String, default: "" }
}, {
    timestamps: true
});

module.exports = mongoose.model("Genre", GenreSchema)