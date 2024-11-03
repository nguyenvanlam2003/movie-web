import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Mật khẩu không khớp.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/api/auth/register", {
                username: formData.username,
                email: formData.email,
                password: formData.password
            });

            if (response.status === 201) {
                alert("Đăng ký thành công!");
                setFormData({
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                });
                setError("");
                navigate("/sign-in");
            }
        } catch (err) {
            setError("Đăng ký thất bại, vui lòng thử lại.");
        }
    };
    return (
        <div className="flex h-[100vh]">
            <div className="w-content-inner mx-auto px-5 py-20 lg:py-40">
                <div className="flex flex-col items-center">
                    <h1>
                        <a href="/" className="text-3xl font-bold uppercase text-red-500">
                            Mọt phim
                        </a>
                    </h1>
                    <h2 className="mt-10 text-3xl text-[#010101]">Đăng ký</h2>
                    <p className="mt-3 text-center text-[#777e90]">
                        Hãy tạo tài khoản và bắt đầu trải nghiệm cùng chúng tôi
                    </p>
                    <form action="" onSubmit={handleSubmit} className="mt-7 w-full">
                        <div className="mt-6">
                            <div className="flex h-12 items-center rounded-xl border-2 border-solid border-[#d9d9d9] px-3 focus-within:border-[#77dae6]">
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    placeholder="User Name"
                                    className="h-full w-full text-base"
                                />
                                <img src="/message.svg" alt="" className="ml-3" />
                            </div>
                        </div>
                        <div className="mt-6">
                            <div className="flex h-12 items-center rounded-xl border-2 border-solid border-[#d9d9d9] px-3 focus-within:border-[#77dae6]">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Email"
                                    className="h-full w-full text-base"
                                    autoFocus
                                    pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
                                />
                                <img src="/message.svg" alt="" className="ml-3" />
                            </div>
                        </div>
                        <div className="mt-6">
                            <div className="flex h-12 items-center rounded-xl border-2 border-solid border-[#d9d9d9] px-3 focus-within:border-[#77dae6]">
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    minLength={6}
                                    placeholder="Mật khẩu"
                                    className="h-full w-full"
                                />
                                <img src="/lock.svg" alt="" />
                            </div>
                        </div>
                        <div className="mt-6">
                            <div className="flex h-12 items-center rounded-xl border-2 border-solid border-[#d9d9d9] px-3 focus-within:border-[#77dae6]">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    minLength={6}
                                    placeholder="Nhập lại mật khẩu"
                                    className="h-full w-full"
                                />
                                <img src="/lock.svg" alt="" />
                            </div>
                        </div>
                        {error && <p className="mt-3 text-red-500">{error}</p>}
                        <div className="mt-10">
                            <button type="submit"
                                className="flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-[#0166ff] px-5 text-white">
                                Đăng ký
                            </button>
                        </div>
                    </form>
                    <p className="mt-7 flex gap-1">
                        Đã có tài khoản?
                        <a href="/sign-in" className="font-medium text-[#0166ff]">
                            Đăng nhập ngay
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
