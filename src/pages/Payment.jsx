import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faBackward,
    faClose,
} from "@fortawesome/free-solid-svg-icons";

const Payment = () => {
    const [amount, setAmount] = useState(200000);
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const token = Cookies.get("accessToken");
        if (token) {
            try {
                const decodedToken = jwt_decode(token);
                setUserId(decodedToken.id);
            } catch (error) {
                console.error("Lỗi khi giải mã token:", error);
            }
        }
    }, []);

    // const handlePayment = async () => {
    //     if (!userId) {
    //         alert("Không thể lấy ID người dùng. Vui lòng đăng nhập lại!");
    //         return;
    //     }

    //     setIsLoading(true);
    //     try {
    //         const response = await axios.post(
    //             "http://localhost:8080/api/payment/create_payment",
    //             {
    //                 amount,
    //                 userId,
    //             },
    //         );

    //         if (response.data && response.data.paymentUrl) {
    //             window.location.href = response.data.paymentUrl;
    //         }
    //     } catch (error) {
    //         console.error("Lỗi khi tạo thanh toán:", error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    const handlePayment = async () => {
        if (!userId) {
            alert("Vui lòng đăng nhập!");
            return;
        }

        setIsLoading(true);
        try {
            const { data } = await axios.post(
                "http://localhost:8080/api/payment/create_payment",
                { userId }, // Không cần gửi amount nếu cố định
            );

            // Mở trang VNPay trong tab mới
            window.open(data.paymentUrl, "_blank");
        } catch (error) {
            if (error.response?.data?.message) {
                alert(error.response.data.message); // Hiển thị thông báo từ backend
            } else {
                alert("Lỗi kết nối!");
            }
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
            {/* <div className="w-full max-w-md rounded-lg bg-gray-800 p-6 shadow-lg">
                <a
                    href="javascript:history.back()"
                    className="flex items-center gap-1"
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                    Quay lại
                </a>
                <h2 className="mb-4 mt-4 text-center text-2xl font-bold">
                    Hãy thanh toán để tận hưởng dịch vụ xem phim của chúng tôi
                </h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium">
                        Số tiền (VND)
                    </label>
                    <input
                        value={amount}
                        disabled
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    onClick={handlePayment}
                    disabled={isLoading}
                    className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium hover:bg-blue-700 disabled:bg-gray-600"
                >
                    {isLoading ? "Đang xử lý..." : "Thanh toán ngay"}
                </button>
            </div> */}
            <div className="overflow-hidden rounded-lg bg-white text-black shadow-lg">
                <div className="flex">
                    <div className="p-7">
                        <div className="flex items-center gap-5">
                            <div className="flex h-14 w-14 items-center justify-center rounded-[50%] bg-black text-center">
                                <h1 className="text-xs font-bold uppercase text-red-500">
                                    Mọt chill
                                </h1>
                            </div>
                            <h2 className="text-lg font-semibold text-[#2c2c2c]">
                                Tài khoản Mọt chill Pro
                            </h2>
                        </div>
                        <div>
                            <p className="mt-8 text-sm font-semibold">
                                Bạn nhận được gì khi sở hữu tài khoản Pro?
                            </p>
                            <ul className="ml-5 mt-2 list-disc text-sm">
                                <li>
                                    Xem phim với chất lượng, tốc độ cao nhất
                                </li>
                                <li>
                                    Tận hưởng tất cả nội dung phim mới nhất của
                                    chúng tôi
                                </li>
                                <li>
                                    Bạn sẽ được nhiều hơn với số tiền bỏ ra!
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="relative min-w-72 flex-shrink-0 bg-[#f5f5f5] p-7">
                        <h3 className="my-2 font-semibold">
                            Chi tiết thanh toán
                        </h3>
                        <div className="mt-2 h-[1px] bg-[#d5d5d5]"></div>
                        <p className="mt-2 text-sm font-semibold text-[#2e3441]">
                            Tài khoản Mọt chill Pro
                        </p>
                        <ul className="ml-4 mt-2 space-y-1 text-sm">
                            <li className="flex justify-between">
                                <span>Giá gốc</span>
                                <span className="line-through">499.000đ</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Giá ưu đãi hôm nay</span>
                                <span>200.000đ</span>
                            </li>
                        </ul>
                        <div className="mt-2 h-[1px] bg-[#d5d5d5]"></div>
                        <div className="mt-4 flex justify-between">
                            <span className="font-semibold text-[#2e3441]">
                                TỔNG
                            </span>
                            <span className="font-semibold text-[#2e3441]">
                                200.000đ
                            </span>
                        </div>
                        <button
                            onClick={handlePayment}
                            disabled={isLoading}
                            className="ml-auto mt-5 flex cursor-pointer items-center justify-center rounded-full bg-[#0265dc] px-6 py-2 text-sm font-semibold text-white hover:opacity-90"
                        >
                            {isLoading
                                ? "Đang xử lý..."
                                : "Tiếp tục thanh toán"}
                        </button>
                        <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-[50%] bg-[#16182314] text-[#4c4c4c] opacity-80 transition-opacity hover:opacity-100">
                            <FontAwesomeIcon icon={faClose} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
