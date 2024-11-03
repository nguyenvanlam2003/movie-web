import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const UserProfile = () => {
    const { handleSubmit, register, setValue } = useForm();
    const navigate = useNavigate();
    const changeTypePassword = (inputId, btnInd) => {
        const currentPassword = document.getElementById(inputId);
        const changeTypeBtn = document.getElementById(btnInd);
        currentPassword.type =
            currentPassword.type === "text" ? "password" : "text";
        changeTypeBtn.src =
            currentPassword.type === "text" ? "/show.svg" : "/hide.svg";
    };
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/img-placeholder.jpg")
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = Cookies.get("accessToken");// Lấy accessToken từ cookie
                if (token) {
                    setIsLoggedIn(true)
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
                    setPassword(userData.password);
                    setAvatarPreview("http://localhost:8080/images/avatar/" + userData.avatar);
                    setValue("username", userData.username);
                    setValue("email", userData.email);
                    setValue("_id", decodedToken.id);
                    setValue("password", confirmPassword)
                } else {
                    setIsLoggedIn(false)
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu người dùng:", error);
            }
        };
        fetchUser();
    }, [isLoggedIn]); // Chạy khi component mount



    const handleChangeAvatar = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setAvatarPreview(previewUrl);
            setValue("avatar", e.target.files);
        }
    };

    const handleClearData = () => {
        setNewPassword("");
        setConfirmPassword("");
    };

    const onSubmit = async (data) => {
        const token = Cookies.get("accessToken");
        if (newPassword !== confirmPassword) {
            setErrorMessage(
                "Mật khẩu xác nhận không trùng khớp. Vui lòng kiểm tra lại!",
            );
            return;
        } else {
            setErrorMessage("");
            try {
                const formData = new FormData();

                // Thêm các trường dữ liệu khác vào formData
                formData.append("_id", id);
                formData.append("username", userName);
                formData.append("email", email);
                formData.append("password", confirmPassword);

                // Nếu có ảnh mới, thêm file vào formData
                if (data.avatar) {
                    formData.append("avatar", data.avatar[0]);  // data.avatar[0] vì file là array
                }


                const response = await axios.put(
                    "http://localhost:8080/api/users/",
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data",  // Đảm bảo header phù hợp
                        },
                    }
                );
                console.log({ formData: data });
                navigate("/")
            } catch (error) {
                console.error("Error updating user:", error);
            }
        }
    };
    const handleLogout = () => {
        // Xóa cookie chứa access token
        Cookies.remove("accessToken");
        window.location.href = "/";
    };
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#292e39]">
            <div className="mx-auto w-[1170px] max-w-[calc(100%-48px)] rounded-3xl bg-[#fbf7f4] px-6 py-7 lg:px-16">
                <h1 className="inline-block border-b border-[#d0d0d0] px-2 py-3 text-2xl font-semibold text-[#384d6c]">
                    Thông tin cá nhân
                </h1>
                <section>
                    <div className="mt-10 flex flex-col items-start gap-4 border-b border-[#d0d0d0] pb-9 lg:flex-row lg:items-center">
                        <div>
                            <input
                                type="file"
                                name=""
                                id="avatar"
                                hidden
                                accept="image/*"
                                form="profile-form"
                                onChange={handleChangeAvatar}
                            />
                            <label
                                className="font-bold text-[#384d6c]"
                                htmlFor="avatar"
                            >
                                <img
                                    src={avatarPreview}
                                    alt=""
                                    className="h-[90px] w-[90px] cursor-pointer rounded-[50%] object-cover"
                                />
                            </label>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-[#384d6c]">
                                {userName}
                            </h2>
                            <p className="mt-1 text-lg text-[#384d6c]">
                                {email}
                            </p>
                        </div>
                        <div className="ml-auto flex flex-wrap gap-5">
                            <a
                                onClick={handleLogout}
                                href="#!"
                                className="flex h-12 items-center gap-2 rounded-full border border-solid border-[#384d6c] bg-white px-10 text-[#384d6c]"
                            >
                                <span className="font-medium">Đăng xuất</span>
                                <FontAwesomeIcon
                                    icon={faArrowRightFromBracket}
                                />
                            </a>
                            <a
                                href="/"
                                className="flex h-12 items-center rounded-lg bg-[#384d6c] px-10 text-white"
                            >
                                <span className="font-medium">
                                    Về trang chủ
                                </span>
                            </a>
                        </div>
                    </div>
                </section>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    action=""
                    className="mt-8"
                    id="profile-form"
                >
                    <div className="mb-4 flex flex-col gap-10 lg:flex-row">
                        <div className="flex-1">
                            <label
                                className="font-bold text-[#384d6c]"
                                htmlFor="user-name"
                            >
                                Tên người dùng
                            </label>
                            <div className="mt-3 flex h-[48px] w-full items-center rounded-lg border border-solid border-[#d1d5db] bg-white px-3 italic focus-within:border-[#77dae6]">
                                <input
                                    {...register("username")}
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="Nhập tên người dùng của bạn"
                                    className="h-full w-full"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-4 flex flex-col gap-10 lg:flex-row">
                        <div className="flex-1">
                            <label
                                className="font-bold text-[#384d6c]"
                                htmlFor="email"
                            >
                                Địa chỉ email
                            </label>
                            <div className="mt-3 flex h-[48px] w-full items-center rounded-lg border border-solid border-[#d1d5db] bg-white px-3 italic focus-within:border-[#77dae6]">
                                <input
                                    {...register("email")}
                                    className="h-full w-full"
                                    type="email"
                                    name="email"
                                    id="email"
                                    pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                                    value={email}
                                    readOnly
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <img
                                    src="/message.svg"
                                    alt=""
                                    className="ml-1"
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <label
                                className="font-bold text-[#384d6c]"
                                htmlFor="current-password"
                            >
                                Mật khẩu hiện tại
                            </label>
                            <div className="mt-3 flex h-[48px] w-full items-center rounded-lg border border-solid border-[#d1d5db] bg-white px-3 italic focus-within:border-[#77dae6]">
                                <img src="/lock.svg" alt="" className="mr-1" />
                                <input
                                    className="h-full w-full"
                                    type="password"
                                    name="current-password"
                                    id="current-password"
                                    value={password}
                                    readOnly
                                />
                                <img
                                    id="change-type-current-password"
                                    src="/hide.svg"
                                    alt=""
                                    className="ml-1 h-6 w-6"
                                    onClick={() => {
                                        changeTypePassword(
                                            "current-password",
                                            "change-type-current-password",
                                        );
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-4 flex flex-col gap-10 lg:flex-row">
                        <div className="flex-1">
                            <label
                                className="font-bold text-[#384d6c]"
                                htmlFor="new-password"
                            >
                                Mật khẩu mới
                            </label>
                            <div className="mt-3 flex h-[48px] w-full items-center rounded-lg border border-solid border-[#d1d5db] bg-white px-3 italic focus-within:border-[#77dae6]">
                                <img src="/lock.svg" alt="" className="mr-1" />
                                <input
                                    className="h-full w-full"
                                    type="password"
                                    name="new-password"
                                    id="new-password"
                                    placeholder="Nhập mật khẩu mới"
                                    value={newPassword}
                                    minLength={6}
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                />
                                <img
                                    id="change-type-new-password"
                                    src="/hide.svg"
                                    alt=""
                                    className="ml-1 h-6 w-6"
                                    onClick={() => {
                                        changeTypePassword(
                                            "new-password",
                                            "change-type-new-password",
                                        );
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <label
                                className="font-bold text-[#384d6c]"
                                htmlFor="confirm-password"
                            >
                                Xác nhận lại mật khẩu mới
                            </label>
                            <div
                                className={`mt-3 flex h-[48px] w-full items-center rounded-lg border border-solid border-[#d1d5db] bg-white px-3 italic focus-within:border-[#77dae6] ${errorMessage ? "border-[#ed4337] bg-[#ed43371a]" : ""}`}
                            >
                                <img src="/lock.svg" alt="" className="mr-1" />
                                <input
                                    {...register("password")}
                                    className="h-full w-full"
                                    type="password"
                                    name="password"
                                    id="confirm-password"
                                    placeholder="Xác nhận lại mật khẩu mới"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                                <img
                                    id="change-type-confirm-password"
                                    src="/hide.svg"
                                    alt=""
                                    className="ml-1 h-6 w-6"
                                    onClick={() => {
                                        changeTypePassword(
                                            "confirm-password",
                                            "change-type-confirm-password",
                                        );
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    {errorMessage && (
                        <p className="mt-2 font-medium text-red-500">
                            {errorMessage}
                        </p>
                    )}
                    <div className="mt-10 flex justify-end gap-4">
                        <button
                            type="button"
                            className="inline-flex h-11 items-center justify-center rounded-md border border-solid border-[#384d6c] bg-white px-4 font-medium text-[#384d6c]"
                            onClick={handleClearData}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="inline-flex h-11 items-center justify-center rounded-md border border-solid border-[#384d6c] bg-[#384d6c] px-4 font-medium text-white"
                        >
                            Lưu thông tin
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default UserProfile;
