const router = require("express").Router();
const Comment = require("../models/Comment");
const verify = require("../verifyToken");

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Thêm một bình luận mới cho phim
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Nội dung của bình luận (bắt buộc)
 *                 example: "This movie is amazing!"
 *               movieId:
 *                 type: string
 *                 description: ID của phim mà bình luận thuộc về
 *                 example: "60d21b2f67d0d8992e610c85"
 *     responses:
 *       201:
 *         description: Tạo mới bình luận thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 movieId:
 *                   type: string
 *                 replies:
 *                   type: array
 *                   items:
 *                     type: object
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

router.post("/", verify, async (req, res) => {
    try {
        // Lấy ID người dùng từ token
        const userId = req.user.id;

        // Tạo comment mới dựa trên dữ liệu từ body và userId
        const newComment = new Comment({
            content: req.body.content,
            userId: userId,
            movieId: req.body.movieId,
            parentId: null
        });

        // Lưu comment vào database
        const savedComment = await newComment.save();
        console.log(newComment);
        res.status(201).json(savedComment);

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /api/comments/replies:
 *   post:
 *     summary: Thêm một bình luận con (reply) vào bình luận cha
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               parentId:
 *                 type: string
 *               contentReplies:
 *                 type: string
 *                 description: Nội dung của bình luận con (bắt buộc)
 *                 example: "I totally agree with your opinion!"
 *     responses:
 *       201:
 *         description: Thêm bình luận con thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 parentId:
 *                   type: string
 *                 contentReplies:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Yêu cầu không hợp lệ
 *       404:
 *         description: Bình luận cha không tồn tại
 *       500:
 *         description: Lỗi máy chủ
 */

router.post("/replies", verify, async (req, res) => {
    try {
        const parentId = req.body.parentId;  // ID của bình luận cha
        const userId = req.user.id;  // ID người dùng từ token

        // Tìm bình luận cha
        const parentComment = await Comment.findById(parentId);
        if (!parentComment) {
            return res.status(404).json({ message: "Bình luận cha không tồn tại" });
        }

        // Thêm bình luận con vào mảng replies của bình luận cha
        const newReply = {
            userId: userId,
            parentId: parentId,
            contentReplies: req.body.contentReplies,
        };

        parentComment.replies.push(newReply);  // Thêm reply vào mảng replies

        // Lưu thay đổi vào database
        const updatedComment = await parentComment.save();

        res.status(201).json(updatedComment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});


/**
 * @swagger
 * /api/comments/{movieId}:
 *   get:
 *     summary: Lấy tất cả bình luận của một bộ phim theo ID phim
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         description: ID của bộ phim
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thành công, trả về danh sách bình luận
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   content:
 *                     type: string
 *                   username:
 *                     type: string
 *                     description: Tên người dùng của bình luận
 *                   originName:
 *                     type: string
 *                     description: Tên gốc của bộ phim
 *                   replies:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         username:
 *                           type: string
 *                           description: Tên người dùng của bình luận con
 *                         parentContent:
 *                           type: string
 *                           description: Nội dung của bình luận cha
 *                         contentReplies:
 *                           type: string
 *                           description: Nội dung của bình luận con
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Thời gian tạo bình luận
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Thời gian cập nhật bình luận
 *       404:
 *         description: Không tìm thấy bình luận nào cho phim này
 *       500:
 *         description: Lỗi máy chủ
 */

router.get("/:movieId", async (req, res) => {
    const movieId = req.params.movieId;

    try {
        // Tìm tất cả các bình luận theo movieId và lấy thông tin cần thiết
        const comments = await Comment.find({ movieId })
            .populate({
                path: "userId",  // Lấy thông tin user
                select: "username"  // Chỉ lấy trường username
            })
            .populate({
                path: "movieId",  // Lấy thông tin movie
                select: "originName"  // Chỉ lấy trường originName
            })
            .populate({
                path: "replies.userId",  // Lấy thông tin user của các replies
                select: "username"  // Chỉ lấy trường username
            })
            .populate({
                path: "replies.parentId",  // Lấy thông tin bình luận cha trong replies
                select: "content"  // Chỉ lấy nội dung của bình luận cha
            });

        // Biến để lưu trữ các bình luận đã được định dạng
        const formattedComments = comments.map(comment => ({
            _id: comment._id,
            content: comment.content,
            username: comment.userId.username,  // Tên người dùng của bình luận
            originName: comment.movieId ? comment.movieId.originName : null,  // Tên phim
            replies: comment.replies.map(reply => ({
                _id: reply._id,
                username: reply.userId ? reply.userId.username : null,  // Tên người dùng của reply
                parentContent: reply.parentId ? reply.parentId.content : null,  // Nội dung bình luận cha
                content: reply.contentReplies,  // Nội dung reply
                createdAt: comment.updatedAt,
            })),
            createdAt: comment.createdAt,
        }));

        if (formattedComments.length === 0) {
            return res.status(404).json("Không có bình luận nào cho phim này.");
        }

        res.status(200).json(formattedComments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;