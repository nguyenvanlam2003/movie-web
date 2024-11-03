import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Ngăn trang reload khi submit form
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                email,
                password,
            });
            const { accesstoken } = response.data;
            Cookies.set('accessToken', accesstoken, { expires: 5 }); // Lưu token vào cookie trong 5 ngày
            navigate('/'); // Chuyển hướng sau khi đăng nhập thành công
        } catch (error) {
            console.error('Đăng nhập thất bại:', error);
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
                    <h2 className="mt-10 text-3xl text-[#010101]">Đăng nhập</h2>
                    <p className="mt-3 text-center text-[#777e90]">
                        Chào mừng trở lại. Vui lòng nhập thông tin tài khoản của bạn
                    </p>
                    <form action="" onSubmit={handleLogin} className="mt-7 w-full">
                        <div className="mt-6">
                            <div className="flex h-12 items-center rounded-xl border-2 border-solid border-[#d9d9d9] px-3 focus-within:border-[#77dae6]">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    placeholder="Email"
                                    className="h-full w-full text-base"
                                    autoFocus
                                    pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <img src="/message.svg" alt="" className="ml-3" />
                            </div>
                        </div>
                        <div className="mt-6">
                            <div className="flex h-12 items-center rounded-xl border-2 border-solid border-[#d9d9d9] px-3 focus-within:border-[#77dae6]">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    required
                                    minLength={6}
                                    placeholder="Mật khẩu"
                                    className="h-full w-full"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <img src="/lock.svg" alt="" />
                            </div>
                        </div>
                        <div className="mt-10">
                            <button className="flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-[#0166ff] px-5 text-white">
                                Đăng nhập
                            </button>
                        </div>
                    </form>
                    <p className="mt-7 flex gap-1">
                        Chưa có tài khoản?
                        <a href="/sign-up" className="font-medium text-[#0166ff]">
                            Đăng ký ngay
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
