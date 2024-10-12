import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useForm } from "react-hook-form";

const UserProfile = () => {
    const { handleSubmit, register, setValue } = useForm();

    const changeTypePassword = (inputId, btnInd) => {
        const currentPassword = document.getElementById(inputId);
        const changeTypeBtn = document.getElementById(btnInd);
        currentPassword.type =
            currentPassword.type === "text" ? "password" : "text";
        changeTypeBtn.src =
            currentPassword.type === "text" ? "/show.svg" : "/hide.svg";
    };

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/img-placeholder.jpg");

    const handleChangeAvatar = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setAvatarPreview(previewUrl);
            setValue("avatarUrl", file, { shouldValidate: true });
        }
    };

    const handleClearData = () => {
        setNewPassword("");
        setConfirmPassword("");
    };

    const onSubmit = (data) => {
        if (newPassword !== confirmPassword) {
            setErrorMessage(
                "Mật khẩu xác nhận không trùng khớp. Vui lòng kiểm tra lại!",
            );
            return;
        } else {
            setErrorMessage("");
            console.log({ formData: data });
        }
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
                                User
                            </h2>
                            <p className="mt-1 text-lg text-[#384d6c]">
                                usertest@gmail.com
                            </p>
                        </div>
                        <div className="ml-auto flex flex-wrap gap-5">
                            <a
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
                                htmlFor="full-name"
                            >
                                Họ và tên
                            </label>
                            <div className="mt-3 flex h-[48px] w-full items-center rounded-lg border border-solid border-[#d1d5db] bg-white px-3 italic focus-within:border-[#77dae6]">
                                <input
                                    {...register("full-name")}
                                    id="full-name"
                                    name="full-name"
                                    type="text"
                                    placeholder="Nhập tên đầy đủ của bạn"
                                    className="h-full w-full"
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <label
                                className="font-bold text-[#384d6c]"
                                htmlFor="user-name"
                            >
                                Tên người dùng
                            </label>
                            <div className="mt-3 flex h-[48px] w-full items-center rounded-lg border border-solid border-[#d1d5db] bg-white px-3 italic focus-within:border-[#77dae6]">
                                <input
                                    {...register("user-name")}
                                    id="user-name"
                                    name="user-name"
                                    type="text"
                                    placeholder="Nhập tên người dùng của bạn"
                                    className="h-full w-full"
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
                                    value="usertest@gmail.com"
                                    readOnly
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
                                    {...register("current-password")}
                                    className="h-full w-full"
                                    type="password"
                                    name="current-password"
                                    id="current-password"
                                    value={"12345"}
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
                                    {...register("new-password")}
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
                                    {...register("confirm-password")}
                                    className="h-full w-full"
                                    type="password"
                                    name="confirm-password"
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
