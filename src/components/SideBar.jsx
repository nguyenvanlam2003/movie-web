import {
    faFilm,
    faRightFromBracket,
    faTableList,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";

const SideBar = ({ onLoadComplete }) => {
    const [id, setId] = useState("");
    const [userName, setUserName] = useState("");
    const token = Cookies.get("accessToken");
    const [loading, setLoading] = useState(true);
    const handleLogout = () => {
        // Xóa cookie chứa access token
        Cookies.remove("accessToken");
        window.location.href = "/";
    };
    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (token) {
                    const decodedToken = jwt_decode(token); // Giải mã accessToken
                    setId(decodedToken.id);
                }
                const response = await axios.get(
                    `http://localhost:8080/api/users/find/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                const userData = response.data;
                setUserName(userData.username);
                console.log(userName);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu người dùng:", error);
            } finally {
                setLoading(false);
                onLoadComplete(); // Gọi hàm khi dữ liệu đã được tải xong
            }
        };
        fetchUser();
    }, [onLoadComplete, id, token]);
    return (
        <aside className="min-h-screen flex-shrink-0 bg-[#343a40] px-10 py-2 text-white shadow-sm shadow-slate-700">
            <a href="/">
                <h1 className="text-2xl font-bold uppercase text-red-500">
                    MỌT PHIM
                </h1>
            </a>
            <div className="my-4 flex items-center gap-2 border border-transparent border-b-[#4f5962] border-t-[#4f5962] py-2">
                <img
                    src="https://www.speak2university.com/assets/admin/dist/img/user-avatar.png"
                    className="h-8 w-8 rounded-full"
                    alt=""
                />
                {/* <p className="text-xl">{userName}</p> */}
                <p className="text-xl">Admin</p>
            </div>
            <nav className="text-lg">
                <ul className="space-y-5">
                    <li>
                        <a
                            href="/admin/movie"
                            className="flex items-center gap-2"
                        >
                            <FontAwesomeIcon icon={faFilm} />
                            <p>Quản lý phim</p>
                        </a>
                    </li>
                    <li>
                        <a
                            href="/admin/genre"
                            className="flex items-center gap-2"
                        >
                            <FontAwesomeIcon icon={faTableList} />
                            <p>Quản lý thể loại</p>
                        </a>
                    </li>
                    <li>
                        <a
                            href="/admin/user"
                            className="flex items-center gap-2"
                        >
                            <FontAwesomeIcon icon={faUser} />
                            <p>Quản lý tài khoản</p>
                        </a>
                        {/* <ul className="ml-4">
                            <li className="flex items-center gap-2 py-2">
                                <FontAwesomeIcon
                                    icon={faCircle}
                                    className="h-2 w-2"
                                />
                                <a href="#!">Tài khoản Admin</a>
                            </li>
                            <li className="flex items-center gap-2 py-2">
                                <FontAwesomeIcon
                                    icon={faCircle}
                                    className="h-2 w-2"
                                />
                                <a href="#!">Tài khoản User</a>
                            </li>
                        </ul> */}
                    </li>
                    <li>
                        <a href="/comment" className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faTableList} />
                            <p>Quản lý bình luận</p>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#!"
                            className="flex items-center gap-2"
                            onClick={handleLogout}
                        >
                            <FontAwesomeIcon icon={faRightFromBracket} />
                            <p>Đăng xuất</p>
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default SideBar;
