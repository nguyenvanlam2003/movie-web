const mongoose = require("mongoose");

const FavoriteMovieSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    movieIds: [
        { type: mongoose.Schema.ObjectId, ref: "Movie" }
    ]
}, {
    timestamps: true,
});

module.exports = mongoose.model("FavoriteMovie", FavoriteMovieSchema);
