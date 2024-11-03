import { Navigate } from 'react-router-dom';
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const AdminRoute = ({ element }) => {
    // Lấy accessToken từ cookie
    const accessToken = Cookies.get("accessToken");

    // Nếu không có token, chuyển hướng về trang đăng nhập
    if (!accessToken) {
        return <Navigate to="/sign-in" replace />;
    }

    try {
        // Giải mã token và kiểm tra trường isAdmin
        const decodedToken = jwt_decode(accessToken);
        const isAdmin = decodedToken.isAdmin;

        // Nếu không phải là admin, chuyển hướng về trang không có quyền truy cập
        if (!isAdmin) {
            return <Navigate to="/" replace />;
        }

        // Nếu là admin, cho phép truy cập
        return element;
    } catch (error) {
        console.error("Đăng nhập không hợp lệ:", error);
        // Nếu token không hợp lệ, chuyển hướng về trang đăng nhập
        return <Navigate to="/sign-in" replace />;
    }
};

export default AdminRoute;
