const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    originName: { type: String, require: true },
    slug: { type: String, default: "" },
    type: { type: String, default: "" },
    posterUrl: { type: String, default: "" },
    thumbUrl: { type: String, default: "" },
    year: { type: Number, default: 2000 },
    actor: { type: String },
    director: { type: String },
    content: { type: String },
    voteAverage: { type: String },
    genres: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre"
    }],
    time: { type: String, default: "" },
    trailerKey: { type: String, default: "" },
    episodes: [{
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        name: { type: String, default: "" },
        video: { type: String, default: "" },
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model("Movie", MovieSchema);