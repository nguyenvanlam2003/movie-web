const router = require("express").Router();
const User = require("../models/User");
const verify = require('../verifyToken');

//get all user
/**
 * @swagger
 * /api/users/:
 *   get:
 *     summary: Lấy danh sách người dùng
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Nếu bạn đang sử dụng xác thực JWT
 *     parameters:
 *       - in: query
 *         name: new
 *         required: false
 *         schema:
 *           type: boolean
 *         description: Nếu có, sẽ sắp xếp danh sách thể loại theo _id
 *     responses:
 *       200:
 *         description: Danh sách người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *                   avatar:
 *                     type: string
 *                   isAdmin:
 *                     type: boolean
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       403:
 *         description: Người dùng không có quyền xem tất cả người dùng
 *       500:
 *         description: Lỗi máy chủ
 */


router.get("/", verify, async (req, res) => {
    const query = req.query.new;
    if (req.user.isAdmin) {
        try {
            const users = query
                ? await User.find().select("-password").sort({ _id: 1 }).limit(1)
                : await User.find().select("-password");
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("you are not allowed to see all users!")
    }
})

// get by id

/**
 * @swagger
 * /api/users/find/{id}:
 *   get:
 *     summary: Lấy thông tin người dùng theo ID
 *     description: Truy vấn thông tin của một người dùng dựa trên ID được cung cấp. 
 *                  Trả về tất cả thông tin người dùng ngoại trừ mật khẩu.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của người dùng cần lấy thông tin.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thông tin người dùng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 avatar:
 *                   type: string
 *                 isAdmin:
 *                   type: boolean
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Người dùng không tìm thấy
 *       500:
 *         description: Lỗi máy chủ
 */

router.get("/find/:id", verify, async (req, res) => {
    try {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            const user = await User.findById(req.params.id);
            const { password, ...info } = user._doc;
            res.status(200).json(info)
        }
        else {
            res.status(403).json("Bạn chỉ có thể xem tài khoản của mình!");
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

//update
/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Cập nhật thông tin người dùng
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Sử dụng xác thực token JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của người dùng cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Tên người dùng (không bắt buộc)
 *               email:
 *                 type: string
 *                 description: Địa chỉ email (không bắt buộc)
 *               password:
 *                 type: string
 *                 description: Mật khẩu mới (nếu có)
 *               isAdmin:
 *                 type: boolean
 *                 description: Xác định xem người dùng có phải là admin hay không (chỉ admin có thể thay đổi)
 *                 default: false
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
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 isAdmin:
 *                   type: boolean
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

router.put("/:id", verify, async (req, res) => {
    try {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(updatedUser);
        } else {
            res.status(403).json("Bạn chỉ có thể chỉnh sửa tài khoản của mình!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


//delete



/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Xóa người dùng
 *     description: Xóa một người dùng dựa trên ID. Chỉ người dùng đang đăng nhập hoặc admin mới có thể xóa tài khoản.
 *     security:
 *       - bearerAuth: []
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID của người dùng cần xóa
 *     responses:
 *       200:
 *         description: Xóa người dùng thành công
 *       403:
 *         description: Bạn không có quyền xóa tài khoản này
 *       404:
 *         description: Người dùng không tồn tại
 *       500:
 *         description: Lỗi máy chủ
 */
router.delete("/:id", verify, async (req, res) => {
    try {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            const deletedUser = await User.findByIdAndDelete(req.params.id);

            if (!deletedUser) {
                return res.status(404).json("Người dùng không tồn tại!");
            }

            res.status(200).json("Đã xóa người dùng thành công.");
        } else {
            res.status(403).json("Bạn chỉ có thể xóa tài khoản của mình!");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router