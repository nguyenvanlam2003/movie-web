const Payment = require("../models/Payment");
const router = require("express").Router();
const moment = require("moment");
const qs = require("querystring");
const crypto = require("crypto");
const config = require("../config");

router.post("/create_payment", async (req, res) => {
    const { userId } = req.body;

    try {
        // Kiểm tra bản ghi thanh toán
        const existingPayment = await Payment.findOne({ userId });

        if (existingPayment?.status === "success") {
            return res.status(400).json({ message: "Bạn đã thanh toán thành công trước đó!" });
        }

        // Nếu tồn tại payment pending -> trả về URL cũ
        if (existingPayment) {
            return res.status(200).json({ paymentUrl: existingPayment.paymentUrl });
        }

        // Tạo payment mới nếu không có bản ghi
        const ipAddr = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
        const createDate = moment().format("YYYYMMDDHHmmss");

        const vnp_Params = {
            vnp_Version: "2.1.0",
            vnp_Command: "pay",
            vnp_TmnCode: process.env.VNP_TMNCODE,
            vnp_Locale: "vn",
            vnp_CurrCode: "VND",
            vnp_TxnRef: `${userId}-${Date.now()}`, // Thêm timestamp để đảm bảo unique
            vnp_OrderInfo: `Thanh toán gói xem phim`,
            vnp_OrderType: "other",
            vnp_Amount: 200000 * 100,
            vnp_ReturnUrl: process.env.VNP_RETURNURL,
            vnp_IpAddr: ipAddr,
            vnp_CreateDate: createDate,
        };

        // Tạo secure hash
        const sortedParams = new URLSearchParams(vnp_Params);
        sortedParams.sort();
        const signData = sortedParams.toString();
        const hmac = crypto.createHmac("sha512", process.env.VNP_HASHSECRET);
        const secureHash = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

        // Tạo URL thanh toán
        const paymentUrl = `${process.env.VNP_URL}?${sortedParams.toString()}&vnp_SecureHash=${secureHash}`;

        // Lưu vào database
        await Payment.create({
            userId,
            amount: 200000,
            status: "pending",
            paymentUrl,
            vnp_TxnRef: vnp_Params.vnp_TxnRef,
        });

        res.json({ paymentUrl });
    } catch (error) {
        console.error("Lỗi tạo thanh toán:", error);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
});

router.get("/payment_return", async (req, res) => {
    let vnp_Params = req.query;
    let secureHash = vnp_Params["vnp_SecureHash"];
    let txnRef = vnp_Params["vnp_TxnRef"];

    // Tách userId từ vnp_TxnRef
    let userId = txnRef.split("-")[0]; // Lấy phần userId trước dấu "-"

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    // Tạo hash kiểm tra
    let sortedParams = new URLSearchParams(vnp_Params).toString();

    // let hmac = crypto.createHmac("sha512", config.vnp_HashSecret);
    let hmac = crypto.createHmac("sha512", process.env.VNP_HASHSECRET);

    let checkHash = hmac.update(sortedParams).digest("hex");

    if (secureHash === checkHash) {
        if (vnp_Params["vnp_ResponseCode"] === "00") {
            await Payment.findOneAndUpdate(
                { userId },
                { status: "success", transactionId: vnp_Params["vnp_TransactionNo"] }
            );
            return res.json({ status: "success", message: "Thanh toán thành công!" });
        } else {
            await Payment.findOneAndUpdate({ userId }, { status: "failed" });
            return res.json({ status: "failed", message: "Thanh toán thất bại!" });
        }
    } else {
        return res.json({ status: "error", message: "Sai chữ ký bảo mật!" });
    }
});

router.get("/payment-status/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        // Tìm giao dịch thanh toán gần nhất của user
        const payment = await Payment.findOne({ userId }).sort({ createdAt: -1 });

        if (payment && payment.status === "success") {
            return res.json({ paid: true });
        } else {
            return res.json({ paid: false });
        }
    } catch (error) {
        console.error("Lỗi khi kiểm tra thanh toán:", error);
        return res.status(500).json({ paid: false, error: "Lỗi server" });
    }
});

module.exports = router;
