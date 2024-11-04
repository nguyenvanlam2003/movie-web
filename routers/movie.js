const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../verifyToken");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const CryptoJS = require("crypto-js");
const mongoose = require("mongoose");

// Đường dẫn đến thư mục images/avatar trong thư mục gốc của dự án
const avatarDir = path.join(__dirname, '..', 'images', 'movies');

// Tạo thư mục nếu chưa tồn tại
if (!fs.existsSync(avatarDir)) {
    fs.mkdirSync(avatarDir, { recursive: true });
}

// Cấu hình storage cho multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, avatarDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Tạo tên file duy nhất
    }
});

const upload = multer({ storage: storage })
// Create a new movie
/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Tạo một bộ phim mới
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               originName:
 *                 type: string
 *                 description: Tên gốc của phim (bắt buộc)
 *                 example: "The Matrix"
 *               slug:
 *                 type: string
 *                 description: Slug của phim
 *                 example: "the-matrix"
 *               type:
 *                 type: string
 *                 description: Loại phim
 *                 example: "Phim lẻ"
 *               posterUrl:
 *                 type: string
 *                 description: URL ảnh poster của phim
 *                 example: "https://example.com/poster.jpg"
 *               thumbUrl:
 *                 type: string
 *                 description: URL ảnh thumbnail của phim
 *                 example: "https://example.com/thumbnail.jpg"
 *               year:
 *                 type: number
 *                 description: Năm phát hành của phim
 *                 example: 1999
 *               actor:
 *                 type: string
 *                 description: Tên diễn viên chính
 *                 example: "Keanu Reeves"
 *               director:
 *                 type: string
 *                 description: Tên đạo diễn
 *                 example: "Lana Wachowski"
 *               content:
 *                 type: string
 *                 description: Nội dung phimS
 *               genres:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: Mảng ID các thể loại của phim
 *                   example: "670550c138bd9b8519c82766"
 *               time:
 *                 type: string
 *                 description: Thời lượng của phim
 *                 example: "120 minutes"
 *               trailerKey:
 *                 type: string
 *                 description: Key trailer của phim
 *                 example: "xG2zhTMEQCo"
 *               episodes:
 *                 type: array
 *                 description: Mảng các tập phim
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       description: Tên của tập phim
 *                       example: "Tập 1"
 *                     video:
 *                       type: string
 *                       description: URL của video tập phim
 *                       example: "https://example.com/video.mp4"
 *     responses:
 *       201:
 *         description: Tạo mới bộ phim thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 originName:
 *                   type: string
 *                 slug:
 *                   type: string
 *                 type:
 *                   type: string
 *                 posterUrl:
 *                   type: string
 *                 thumbUrl:
 *                   type: string
 *                 year:
 *                   type: number
 *                 acctor:
 *                   type: string
 *                 direcor:
 *                   type: string
 *                 genres:
 *                   type: array
 *                   items:
 *                     type: string
 *                 time:
 *                   type: string
 *                 trailerKey:
 *                   type: string
 *                 episodes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       video:
 *                         type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Yêu cầu không hợp lệ
 *       500:
 *         description: Lỗi máy chủ
 */

router.post("/", verify,
    upload.fields([
        { name: 'posterUrl', maxCount: 1 },
        { name: 'thumbUrl', maxCount: 1 }
    ]),
    async (req, res) => {
        if (req.user.isAdmin) {
            try {
                // Chuyển đổi genres từ chuỗi thành mảng ObjectId
                if (req.body.genres) {
                    req.body.genres = req.body.genres.split(',').map(id => id.trim().replace(/^'|'$/g, ""));
                }
                // Chuyển đổi episodes từ chuỗi JSON thành mảng đối tượng
                if (req.body.episodes) {
                    req.body.episodes = JSON.parse(req.body.episodes).map(episode => {
                        return {
                            ...episode,
                            _id: new mongoose.Types.ObjectId(), // Tạo ObjectId mới cho mỗi episode
                        };
                    });
                }
                req.body.posterUrl = req.files['posterUrl']?.[0].filename;
                req.body.thumbUrl = req.files['thumbUrl']?.[0].filename;
                console.log(req.body);
                const newMovie = new Movie(req.body);
                const savedMovie = await newMovie.save();
                res.status(201).json(savedMovie);
            } catch (err) {
                console.error(err);

                res.status(500).json(err);
            }
        } else {
            res.status(403).json("Bạn không có quyền thêm phim mới!");
        }
    });
// get 
/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Lấy danh sách tất cả phim
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   originName:
 *                     type: string
 *                   slug:
 *                     type: string
 *                   type:
 *                     type: string
 *                   posterUrl:
 *                     type: string
 *                   thumbUrl:
 *                     type: string
 *                   year:
 *                     type: integer
 *                   acctor:
 *                     type: string
 *                   direcor:
 *                     type: string
 *                   genres:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         nameGenre:
 *                           type: string
 *                   time:
 *                     type: string
 *                   trailerKey:
 *                     type: string
 *                   episodes:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         video:
 *                           type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Lỗi máy chủ

 */

router.get("/", async (req, res) => {
    try {
        // Lấy giá trị của query parameter `originName` từ request
        const { originName } = req.query;

        // Kiểm tra nếu có `originName`, sẽ tìm kiếm theo từ khóa này, nếu không sẽ lấy toàn bộ phim
        const query = originName
            ? { originName: { $regex: originName, $options: "i" } } // Tìm kiếm không phân biệt hoa thường
            : {};

        // Tìm phim dựa trên query
        const movies = await Movie.find(query).populate({
            path: "genres",
            select: { nameGenre: 1, _id: 0 }, // Chỉ lấy `nameGenre` của `genre`
        });
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json(err);
    }
});
// get movie by id
/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Lấy thông tin phim theo ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của phim
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 originName:
 *                   type: string
 *                 slug:
 *                   type: string
 *                 type:
 *                   type: string
 *                 posterUrl:
 *                   type: string
 *                 thumbUrl:
 *                   type: string
 *                 year:
 *                   type: integer
 *                 acctor:
 *                   type: string
 *                 direcor:
 *                   type: string
 *                 genres:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: String
 *                       nameGenre:
 *                         type: string
 *                 time:
 *                   type: string
 *                 trailerKey:
 *                   type: string
 *                 episodes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       video:
 *                         type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Không tìm thấy phim
 *       500:
 *         description: Lỗi máy chủ
 */

router.get("/:id", async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id).populate({
            path: "genres",
            select: { nameGenre: 1, _id: 1 }
        });

        if (!movie) {
            return res.status(404).json({ message: "Không tìm thấy phim" });
        }

        res.status(200).json(movie);
    } catch (err) {
        console.error(err);

        res.status(500).json(err);
    }
});

// update movie by id
/**
 * @swagger
 * /api/movies/:
 *   put:
 *     summary: Cập nhật thông tin phim
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 required: true
 *                 description: ID của movie cần cập nhật
 *               originName:
 *                 type: string
 *                 description: Tên phim
 *               slug:
 *                 type: string
 *               type:
 *                 type: string
 *               posterUrl:
 *                 type: string
 *               thumbUrl:
 *                 type: string
 *               year:
 *                 type: integer
 *               acctor:
 *                 type: string
 *               direcor:
 *                 type: string
 *               genres:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Mảng ID của các genre
 *               time:
 *                 type: string
 *               trailerKey:
 *                 type: string
 *               episodes:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     video:
 *                       type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 originName:
 *                   type: string
 *                 slug:
 *                   type: string
 *                 type:
 *                   type: string
 *                 posterUrl:
 *                   type: string
 *                 thumbUrl:
 *                   type: string
 *                 year:
 *                   type: integer
 *                 acctor:
 *                   type: string
 *                 direcor:
 *                   type: string
 *                 genres:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       nameGenre:
 *                         type: string
 *                 time:
 *                   type: string
 *                 trailerKey:
 *                   type: string
 *                 episodes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       video:
 *                         type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Không tìm thấy phim
 *       500:
 *         description: Lỗi máy chủ
 */

router.put("/", verify,
    upload.fields([
        { name: 'posterUrl', maxCount: 1 },
        { name: 'thumbUrl', maxCount: 1 }
    ]),
    async (req, res) => {
        try {
            if (req.user.isAdmin) {
                if (req.body.genres) {
                    req.body.genres = req.body.genres.split(',').map(id => id.trim().replace(/^'|'$/g, ""));
                }
                // Chuyển đổi episodes từ chuỗi JSON thành mảng đối tượng
                if (req.body.episodes) {
                    req.body.episodes = JSON.parse(req.body.episodes).map(episode => {
                        return {
                            ...episode,
                            _id: new mongoose.Types.ObjectId(), // Tạo ObjectId mới cho mỗi episode
                        };
                    });
                }
                // Nếu có ảnh mới, kiểm tra xem ảnh cũ có tồn tại không
                const findMovie = await Movie.findById(req.body._id)
                if (!findMovie) {
                    return res.status(404).json("Không tìm thấy phim");
                }

                // Kiểm tra xem có ảnh mới được gửi lên không
                if (req.files) {
                    // Kiểm tra nếu có posterUrl mới thì xóa ảnh cũ
                    if (req.body.posterUrl !== "1") {
                        if (findMovie.avatar) {
                            const oldPosterPath = path.join(avatarDir, findMovie.avatar); // Đường dẫn cũ đến poster
                            if (fs.existsSync(oldPosterPath)) {
                                fs.unlinkSync(oldPosterPath); // Xóa ảnh cũ
                            }
                        }
                        // Cập nhật tên file mới vào DB
                        req.body.posterUrl = req.files['posterUrl'][0].filename;
                    } else {
                        req.body.posterUrl = findMovie.posterUrl
                    }

                    // Kiểm tra nếu có thumbUrl mới thì xóa ảnh cũ
                    if (req.body.thumbUrl !== "1") {
                        if (findMovie.thumbUrl) {
                            const oldThumbPath = path.join(avatarDir, findMovie.thumbUrl); // Đường dẫn cũ đến thumb
                            if (fs.existsSync(oldThumbPath)) {
                                fs.unlinkSync(oldThumbPath); // Xóa ảnh cũ
                            }
                        }
                        // Cập nhật tên file mới vào DB
                        req.body.thumbUrl = req.files['thumbUrl'][0].filename;
                    }
                    else {
                        req.body.thumbUrl = findMovie.thumbUrl
                    }
                }
                console.log(req.body);

                const updatedMovie = await Movie.findByIdAndUpdate(
                    req.body._id,
                    { $set: req.body },
                    { new: true, runValidators: true }  // new: true trả về document mới sau khi cập nhật
                ).populate({
                    path: "genres",
                    select: { nameGenre: 1, _id: 0 }  // Chỉ lấy ra nameGenre
                });
                console.log(updatedMovie);
                if (!updatedMovie) {
                    return res.status(404).json("Không tìm thấy phim");
                }


                res.status(200).json(updatedMovie);
            } else {
                res.status(403).json("Bạn không có quyên sửa!!");
            }

        } catch (err) {
            console.error(err);

            res.status(500).json(err);
        }
    });

// delete movie by id
/**
 * @swagger
 * /api/movies/{id}:
 *   delete:
 *     summary: Xóa phim theo ID
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của phim cần xóa
 *     responses:
 *       200:
 *         description: Xóa thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Phim đã được xóa thành công
 *       404:
 *         description: Không tìm thấy phim
 *       500:
 *         description: Lỗi máy chủ
 */

router.delete("/:id", verify, async (req, res) => {
    try {
        console.log(req.user.isAdmin);
        if (req.user.isAdmin) {


            const movie = await Movie.findById(req.params.id);

            if (!movie) {
                return res.status(404).json({ message: "Không tìm thấy phim" });
            }
            if (movie.posterUrl) {
                const oldPosterPath = path.join(avatarDir, movie.posterUrl); // Đường dẫn cũ đến poster
                if (fs.existsSync(oldPosterPath)) {
                    fs.unlinkSync(oldPosterPath); // Xóa ảnh cũ
                }
            }

            // Xóa ảnh cũ thumb nếu có
            if (movie.thumbUrl) {
                const oldThumbPath = path.join(avatarDir, movie.thumbUrl); // Đường dẫn cũ đến thumb
                if (fs.existsSync(oldThumbPath)) {
                    fs.unlinkSync(oldThumbPath); // Xóa ảnh cũ
                }
            }
            await Movie.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: "Phim đã được xóa thành công" });
        } else {
            res.status(403).json("Bạn không có quyền xóa!");
        }

    } catch (err) {
        console.error(err);

        res.status(500).json(err);
    }
});


module.exports = router;