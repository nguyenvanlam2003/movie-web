const router = require("express").Router();
const User = require("../models/User");
const verify = require('../verifyToken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const CryptoJS = require("crypto-js");

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
 *                 password:
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
            res.status(200).json(user)
        }
        else {
            res.status(403).json("Bạn chỉ có thể xem tài khoản của mình!");
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

//update
// Đường dẫn đến thư mục images/avatar trong thư mục gốc của dự án
const avatarDir = path.join(__dirname, '..', 'images', 'avatar');

// Tạo thư mục nếu chưa tồn tại
if (!fs.existsSync(avatarDir)) {
    fs.mkdirSync(avatarDir, { recursive: true });
}

// Cấu hình storage cho multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, avatarDir); // Đặt đường dẫn đến thư mục images/avatar
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Tạo tên file duy nhất
    }
});

const upload = multer({ storage: storage });
/**
 * @swagger
 * /api/users/:
 *   put:
 *     summary: Cập nhật thông tin người dùng
 *     tags: [Users]
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
 *               username:
 *                 type: string
 *                 description: Tên người dùng (không bắt buộc)
 *               email:
 *                 type: string
 *                 description: Địa chỉ email (không bắt buộc)
 *               password:
 *                 type: string
 *                 description: Mật khẩu mới (nếu có)
 *               avatar:
 *                 type: string
 *                 description: avatar mới (nếu có)
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
 *       403:
 *         description: Người dùng không có quyền cập nhật thông tin này
 *       500:
 *         description: Lỗi máy chủ
 */


router.put("/", verify, upload.single('avatar'), async (req, res) => {
    try {
        if (req.user.id === req.body._id || req.user.isAdmin) {
            // Kiểm tra nếu mật khẩu không rỗng và khác "string"
            if (req.body.password && req.body.password !== "" && req.body.password !== "string") {
                // Mã hóa mật khẩu mới
                req.body.password = CryptoJS.AES.encrypt(
                    req.body.password,
                    process.env.SECRET_KEY
                ).toString();
            } else {
                // Nếu mật khẩu không hợp lệ ("" hoặc "string"), xóa trường password để không cập nhật
                delete req.body.password;
            }
            // Nếu có ảnh mới, kiểm tra xem ảnh cũ có tồn tại không
            const findUser = await User.findById(req.body._id)
            if (req.file) {
                const oldAvatarPath = path.join(avatarDir, findUser.avatar); // Đường dẫn cũ đến ảnh

                // Kiểm tra xem ảnh cũ có tồn tại không
                if (findUser.avatar && fs.existsSync(oldAvatarPath)) {
                    // Nếu có, xóa ảnh cũ
                    fs.unlinkSync(oldAvatarPath);
                }
                // Lưu tên file mới vào DB
                req.body.avatar = req.file.filename;
            }
            console.log(req.body);

            // Cập nhật user với các dữ liệu từ req.body
            const updatedUser = await User.findByIdAndUpdate(
                req.body._id,
                { $set: req.body },
                { new: true }
            );
            console.log(updatedUser);

            res.status(200).json(updatedUser);
        } else {
            res.status(403).json("Bạn chỉ có thể chỉnh sửa tài khoản của mình!");
        }
    } catch (err) {
        console.error(err);

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
            if (deletedUser.avatar) {  // Kiểm tra avatar tồn tại
                const oldAvatarPath = path.join(avatarDir, deletedUser.avatar); // Đường dẫn cũ đến ảnh

                // Kiểm tra xem ảnh cũ có tồn tại không
                if (fs.existsSync(oldAvatarPath)) {
                    // Nếu có, xóa ảnh cũ
                    fs.unlinkSync(oldAvatarPath);
                }
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