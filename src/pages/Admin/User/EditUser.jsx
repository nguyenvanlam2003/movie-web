import { useState } from "react";
import { useForm } from "react-hook-form";
import FormField from "@components/AdminForm/FormField";
import AccountTypeInput from "@components/AdminForm/FormInput/AccountTypeInput";
import SideBar from "@components/SideBar";

const EditUser = () => {
    const { handleSubmit, register, control, setValue } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    const [userName, setUserName] = useState("user name");
    const [fullName, setFullName] = useState("Full Name");
    const [email, setEmail] = useState("test@gmail.com");

    const [avatarPreview, setAvatarPreview] = useState("/img-placeholder.jpg");

    const handleChangeAvatar = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setAvatarPreview(previewUrl);
            setValue("avatar", file, { shouldValidate: true });
        }
    };

    return (
        <div className="flex bg-[#f9f9fb]">
            <SideBar className="flex-1" />
            <section className="flex-[4]">
                <h1
                    className="mt-10 bg-[#f4f6f9] px-2 py-2 text-3xl"
                    id="heading-top"
                >
                    Cập nhật thông tin người dùng
                </h1>
                <div className="mx-2 mt-4 rounded-md bg-white pb-4 shadow-md shadow-slate-400">
                    <h2 className="px-2 py-2 text-lg font-medium">
                        Thông tin cập nhật Người dùng
                    </h2>
                    <form
                        action=""
                        className="border-2 border-[#e3e3e9] border-l-transparent border-r-transparent p-4"
                        autoComplete="off"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="mb-3">
                            <label
                                htmlFor="user-name"
                                className="mb-1 block font-bold"
                            >
                                Tên người dùng
                            </label>
                            <input
                                id="user-name"
                                {...register("user-name")}
                                type="text"
                                placeholder="Nhập tên người dùng"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className="h-10 w-full rounded-lg border border-solid border-[#d2d1d6] px-3 focus:border-[#77dae6]"
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="full-name"
                                className="mb-1 block font-bold"
                            >
                                Tên đầy đủ
                            </label>
                            <input
                                id="full-name"
                                {...register("fullName")}
                                type="text"
                                placeholder="Nhập tên gốc phim"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="h-10 w-full rounded-lg border border-solid border-[#d2d1d6] px-3 focus:border-[#77dae6]"
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="email"
                                className="mb-1 block font-bold"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                {...register("email")}
                                type="email"
                                placeholder="Nhập email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-10 w-full rounded-lg border border-solid border-[#d2d1d6] px-3 focus:border-[#77dae6]"
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="avatar-img"
                                className="mb-1 font-bold"
                            >
                                Chọn ảnh Avatar
                            </label>
                            <input
                                type="file"
                                id="avatar-img"
                                accept="image/*"
                                hidden
                                onChange={handleChangeAvatar}
                            />
                            <label htmlFor="avatar-img">
                                <img
                                    id="avatar-preview"
                                    src={avatarPreview}
                                    alt=""
                                    className="mt-1 h-32 w-32 cursor-pointer rounded-xl object-cover"
                                />
                            </label>
                        </div>

                        <div className="mb-3">
                            <FormField
                                label="Quyền"
                                name="isAdmin"
                                control={control}
                                Component={AccountTypeInput}
                            />
                        </div>

                        <div className="mt-4">
                            <button className="rounded-lg bg-[#28a745] px-4 py-3 text-white">
                                Cập nhật người dùng
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};
export default EditUser;
