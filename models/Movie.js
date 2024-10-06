const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    originName: { type: String, require: true },
    slug: { type: String, default: "" },
    type: { type: String, default: "" },
    posterUrl: { type: String, default: "" },
    thubUrl: { type: String, default: "" },
    year: { type: Number, default: 2000 },
    acctor: [{
        name: { type: String, default: "" }
    }],
    direcor: [{
        name: { type: String, default: "" }
    }],
    genres: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre"
    }],
    time: { type: String, default: "" },
    trailerKey: { type: String, default: "" },
    episodes: [{
        name: { type: String, default: "" },
        video: { type: String, default: "" },
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model("Movie", MovieSchema);