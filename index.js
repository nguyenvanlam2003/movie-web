const express = require("express");
const app = express();
const setupSwagger = require("./swagger");
const mongoose = require("mongoose")
const authRoutes = require("./routers/auth.js")
const userRoutes = require("./routers/user.js")
const genreRouter = require("./routers/genre.js")
const movieRouter = require("./routers/movie.js")
const favoriteRouter = require("./routers/favoriteMovie.js")
const cors = require('cors');
const dotenv = require("dotenv")

dotenv.config();

const port = process.env.PORT || 5000
mongoose
    .connect(process.env.MONGO_URL, {})
    .then(() => console.log(`db connection successful`))
    .catch((error) => {
        console.error(error);
    });

setupSwagger(app);
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/genres", genreRouter);
app.use("/api/movies", movieRouter);
app.use("/api/favoriteMovies", favoriteRouter);


app.listen(port, () => {
    console.log(`Backend server is listening ${port}`)
})
