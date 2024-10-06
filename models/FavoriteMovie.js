
const mongoose = require("mongoose");

const FavoriteMovieSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.ObjectId, ref: "User" },
    movieIds: [{
        type: mongoose.Schema.ObjectId, ref: "Movie"
    }]
}, {
    timestamps: true,
})
module.exports = mongoose.model("FavoriteMovie", FavoriteMovieSchema)