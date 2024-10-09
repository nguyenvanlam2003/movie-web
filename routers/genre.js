const router = require("express").Router();
const Genre = require("../models/Genre");
const verify = require('../verifyToken');

//create 

/**
 * @swagger
 * /api/genres/:
 *   post:
 *     summary: Tạo một thể loại mới
 *     tags: [Genres]
 *     security:
 *       - bearerAuth: []  # Sử dụng xác thực token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nameGenre:
 *                 type: string
 *                 description: Tên của thể loại (bắt buộc)
 *               desc:
 *                 type: string
 *                 description: Mô tả về thể loại
 *     responses:
 *       201:
 *         description: Tạo thể loại thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID của thể loại mới được tạo
 *                 nameGenre:
 *                   type: string
 *                   description: Tên của thể loại
 *                 desc:
 *                   type: string
 *                   description: Mô tả về thể loại
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Thời gian tạo thể loại
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Thời gian cập nhật thể loại
 *       403:
 *         description: Người dùng không có quyền tạo thể loại mới
 *       500:
 *         description: Lỗi máy chủ
 */

router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newGenre = new Genre(req.body);
        try {
            const saveGenre = await newGenre.save();
            res.status(201).json(saveGenre);
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("you are not allowed!")
    }
})

//get all genres 


/**
 * @swagger
 * /api/genres:
 *   get:
 *     summary: Lấy danh sách tất cả thể loại
 *     tags: [Genres]
 *     parameters:
 *       - in: query
 *         name: new
 *         required: false
 *         schema:
 *           type: boolean
 *         description: Nếu có, sẽ sắp xếp danh sách thể loại theo _id
 *     responses:
 *       200:
 *         description: Danh sách thể loại đã được lấy thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID của thể loại
 *                   nameGenre:
 *                     type: string
 *                     description: Tên của thể loại
 *                   desc:
 *                     type: string
 *                     description: Mô tả về thể loại
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Thời gian tạo thể loại
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Thời gian cập nhật thể loại
 *       403:
 *         description: Người dùng không có quyền truy cập vào danh sách thể loại
 *       500:
 *         description: Lỗi máy chủ
 */

router.get("/", async (req, res) => {

    const query = req.query.new;

    try {
        const genres = query
            ? await Genre.find().sort({ _id: 1 }).limit(2)
            : await Genre.find();
        res.status(200).json(genres);
    } catch (err) {
        res.status(500).json(err)
    }

})

// get by id

/**
 * @swagger
 * /api/genres/find/{id}:
 *   get:
 *     summary: Lấy thông tin genre theo ID
 *     description: Truy vấn thông tin của một genre dựa trên ID được cung cấp.
 *     tags: [Genres]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của genre cần lấy thông tin.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thông tin genre thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 nameGenre:
 *                   type: string
 *                 email:
 *                   type: string
 *                 desc:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: genre không tìm thấy
 *       500:
 *         description: Lỗi máy chủ
 */

router.get("/find/:id", async (req, res) => {
    try {
        const genres = await Genre.findById(req.params.id);
        res.status(200).json(genres)

    } catch (err) {
        res.status(500).json(err)
    }
})


//update
/**
 * @swagger
 * /api/genres/:
 *   put:
 *     summary: Cập nhật thông tin genre
 *     tags: [Genres]
 *     security:
 *       - bearerAuth: []  # Sử dụng xác thực token JWT
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
 *                 description: ID của genre cần cập nhật
 *               nameGenre:
 *                 type: string
 *                 description: Tên genre (không bắt buộc)
 *               desc:
 *                 type: string
 *                 description: Mô tả về genre
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
 *                 nameGenre:
 *                   type: string
 *                 desc:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       403:
 *         description: Người dùng không có quyền cập nhật thông tin này
 *       500:
 *         description: Lỗi máy chủ
 */

router.put("/", verify, async (req, res) => {
    try {
        if (req.user.isAdmin) {
            const updatedGenre = await Genre.findByIdAndUpdate(
                req.body._id,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(updatedGenre);
        } else {
            res.status(403).json("Bạn không có quyền!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete


/**
 * @swagger
 * /api/genres/{id}:
 *   delete:
 *     summary: Xóa genre
 *     description: Xóa một genre dựa trên ID. Chỉ admin mới có thể xóa genre.
 *     security:
 *       - bearerAuth: []
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của genre cần xóa
 *     responses:
 *       200:
 *         description: Xóa genre thành công
 *       403:
 *         description: Bạn không có quyền xóa genre này
 *       404:
 *         description: genre không tồn tại
 *       500:
 *         description: Lỗi máy chủ
 */
router.delete("/:id", verify, async (req, res) => {
    try {
        if (req.user.isAdmin) {
            const deletedGenre = await Genre.findByIdAndDelete(req.params.id);

            if (!deletedGenre) {
                return res.status(404).json("Genre không tồn tại!");
            }

            res.status(200).json("Đã xóa Genre thành công.");
        } else {
            res.status(403).json("Bạn không có quyền!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router  