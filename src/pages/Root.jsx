import Footer from "@components/Footer";
import Header from "@components/Header";
import HeaderLogined from "@components/HeaderLogined";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";

const Root = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [id, setId] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = Cookies.get("accessToken");// Lấy accessToken từ cookie
                if (token) {
                    setIsLoggedIn(true);
                    const decodedToken = jwt_decode(token); // Giải mã accessToken
                    setId(decodedToken.id);

                    const response = await axios.get(`http://localhost:8080/api/users/find/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const userData = response.data;
                    // Cập nhật state với dữ liệu người dùng

                    setUserName(userData.username);
                    setEmail(userData.email);
                    setAvatar("http://localhost:8080/images/avatar/" + userData.avatar);
                    console.log(userName, email, avatar);

                }
                else {
                    setIsLoggedIn(false)
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu người dùng:", error);
            }
        };
        fetchUser();
    }, [isLoggedIn]); // Chạy khi component mount
    return (
        <div>
            {isLoggedIn ? (
                <HeaderLogined username={userName} email={email} avatar={avatar} />
            ) : (
                <Header />
            )}
            <Outlet />
            <Footer />
        </div>
    );
};
export default Root;
