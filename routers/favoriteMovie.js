const router = require("express").Router();
const FavoriteMovie = require("../models/FavoriteMovie");
const User = require("../models/User")
const Movie = require('../models/Movie');
const verify = require("../verifyToken");

// post 
/**
 * @swagger
 * /api/favoriteMovies:
 *   post:
 *     summary: Thêm phim vào danh sách yêu thích
 *     tags: [FavoriteMovies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movieIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: ID của phim cần thêm vào danh sách yêu thích
 *             required:
 *               - movieIds
 *     responses:
 *       201:
 *         description: Thêm phim vào danh sách yêu thích thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userName:
 *                   type: string
 *                   description: Tên người dùng
 *                 movieName:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: Danh sách tên phim
 *       400:
 *         description: Phim này đã có trong danh sách yêu thích
 *       403:
 *         description: Bạn không có quyền thêm phim vào danh sách
 *       500:
 *         description: Lỗi máy chủ
 */


router.post("/", verify, async (req, res) => {
    try {
        const findFavoriteMovie = await FavoriteMovie.findOne({ _id: req.user.id });

        if (findFavoriteMovie === null) {
            const newFavoriteMovie = new FavoriteMovie({
                _id: req.user.id,
                movieIds: req.body.movieIds
            });
            console.log("da va den day", newFavoriteMovie);

            const savedFavoriteMovie = await newFavoriteMovie.save();
            console.log("da luu", savedFavoriteMovie);


            // Lấy thông tin người dùng
            const user = await User.findById(savedFavoriteMovie._id);

            // Lấy thông tin phim
            const movies = await Movie.find({ _id: { $in: savedFavoriteMovie.movieIds } });

            const response = {
                userName: user.username,
                movieNames: movies.map(movie => movie.originName),
            };

            res.status(201).json(response);
        } else {

            // Nếu đã có danh sách yêu thích, chỉ thêm phim mới
            const newMovieIds = req.body.movieIds.filter(
                movieId => !findFavoriteMovie.movieIds.includes(movieId)
            );
            if (newMovieIds.length > 0) {
                // Cập nhật chỉ trường movieIds bằng cách thêm phim mới vào danh sách
                await FavoriteMovie.updateOne(
                    { _id: req.user.id },
                    { $push: { movieIds: { $each: newMovieIds } } }
                );
            }


            const updatedFavoriteMovie = await FavoriteMovie.findById(req.user.id);

            // Lấy thông tin người dùng và phim
            const user = await User.findById(updatedFavoriteMovie._id);
            const movies = await Movie.find({ _id: { $in: updatedFavoriteMovie.movieIds } });

            const response = {
                userName: user.username,
                movieNames: movies.map(movie => movie.originName),
            };

            res.status(200).json(response);
        }

    } catch (err) {
        console.error("Error details:", err);
        res.status(500).json(err);
    }
});

// get by Id

/**
 * @swagger
 * /api/favoriteMovies:
 *   get:
 *     summary: Lấy danh sách phim yêu thích
 *     tags: [FavoriteMovies]
 *     security:
 *       - bearerAuth: []  
 *     responses:
 *       200:
 *         description: Trả về danh sách phim yêu thích của người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userName:
 *                   type: string
 *                   description: Tên người dùng
 *                   example: "user123"
 *                 movieNames:
 *                   type: array
 *                   description: Danh sách tên phim yêu thích
 *                   items:
 *                     type: string
 *                     example: "The Matrix"
 *       404:
 *         description: Danh sách yêu thích không tồn tại
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Danh sách yêu thích không tồn tại!"
 *       500:
 *         description: Lỗi máy chủ
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Internal Server Error"
 */

router.get("/", verify, async (req, res) => {
    try {
        // Tìm danh sách yêu thích của người dùng
        const favoriteMovie = await FavoriteMovie.findOne({ _id: req.user.id }).populate("movieIds");

        if (!favoriteMovie) {
            return res.status(404).json("Danh sách yêu thích không tồn tại!");
        }

        // Lấy thông tin phim từ danh sách yêu thích
        const movies = favoriteMovie.movieIds.map(movie => movie.originName);

        // Lấy thông tin người dùng
        const user = await User.findById(favoriteMovie._id);

        // Tạo phản hồi
        const response = {
            userName: user.username,
            movieNames: movies,
        };

        res.status(200).json(response);


    } catch (err) {
        console.error("err", err);

        res.status(500).json(err);
    }
});

// Phương thức GET dành cho admin để lấy tất cả danh sách phim yêu thích


/**
 * @swagger
 * /api/favoriteMovies/all:
 *   get:
 *     summary: Lấy tất cả danh sách phim yêu thích
 *     tags: [FavoriteMovies]
 *     security:
 *       - bearerAuth: []  
 *     responses:
 *       200:
 *         description: Trả về danh sách phim yêu thích của tất cả người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userName:
 *                     type: string
 *                     description: Tên người dùng
 *                     example: "user123"
 *                   movieNames:
 *                     type: array
 *                     description: Danh sách tên phim yêu thích
 *                     items:
 *                       type: string
 *                       example: "The Matrix"
 *       403:
 *         description: Người dùng không có quyền truy cập
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Bạn không có quyền truy cập!"
 *       500:
 *         description: Lỗi máy chủ
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Internal Server Error"
 */

router.get("/all", verify, async (req, res) => {
    try {
        // Kiểm tra nếu người dùng không phải admin thì không cho truy cập
        if (!req.user.isAdmin) {
            return res.status(403).json("Bạn không có quyền truy cập!");
        }

        // Lấy tất cả danh sách phim yêu thích
        const favoriteMovies = await FavoriteMovie.find().populate("movieIds").populate("_id");

        // Tạo phản hồi chứa danh sách yêu thích của tất cả người dùng
        const response = favoriteMovies.map(favoriteMovie => ({
            userName: favoriteMovie._id.username,
            movieNames: favoriteMovie.movieIds.map(movie => movie.originName),
        }));

        res.status(200).json(response);
    } catch (err) {
        console.error("err", err);
        res.status(500).json(err);
    }
});

// xoa phim khỏi danh sách
/**
 * @swagger
 * /api/favoriteMovies/deleteMovieId/{movieId}:
 *   delete:
 *     summary: Xóa phim khỏi danh sách yêu thích
 *     tags: [FavoriteMovies]
 *     security:
 *       - bearerAuth: []  
 *     parameters:
 *       - name: movieId
 *         in: path
 *         required: true
 *         description: ID của phim cần xóa khỏi danh sách yêu thích
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa phim thành công và trả về danh sách phim còn lại
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userName:
 *                   type: string
 *                   description: Tên người dùng
 *                   example: "user123"
 *                 movieNames:
 *                   type: array
 *                   description: Danh sách tên phim còn lại sau khi xóa
 *                   items:
 *                     type: string
 *       404:
 *         description: Không tìm thấy phim trong danh sách yêu thích hoặc danh sách không tồn tại
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Phim không có trong danh sách yêu thích!"
 *       500:
 *         description: Lỗi máy chủ
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Internal Server Error"
 */


router.delete("/deleteMovieId/:movieId", verify, async (req, res) => {
    try {
        // Tìm danh sách yêu thích dựa trên userId
        const findFavoriteMovie = await FavoriteMovie.findOne({ _id: req.user.id });

        if (!findFavoriteMovie) {
            return res.status(404).json("Không tìm thấy danh sách yêu thích!");
        }

        // Kiểm tra xem movieId có trong danh sách yêu thích không
        if (!findFavoriteMovie.movieIds.includes(req.params.movieId)) {
            return res.status(404).json("Phim không có trong danh sách yêu thích!");
        }

        // Xóa movieId khỏi mảng movieIds
        await FavoriteMovie.updateOne(
            { _id: req.user.id },
            { $pull: { movieIds: req.params.movieId } }  // Sử dụng $pull để xóa phim
        );

        const updatedFavoriteMovie = await FavoriteMovie.findById(req.user.id);
        const movies = await Movie.find({ _id: { $in: updatedFavoriteMovie.movieIds } });

        const response = {
            userId: req.user.username,  // Có thể cần lấy lại từ User nếu cần
            movieIds: movies.map(movie => movie.originName),
        };

        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

module.exports = router