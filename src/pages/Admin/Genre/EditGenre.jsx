import { useState } from "react";
import { useForm } from "react-hook-form";
import SideBar from "@components/SideBar";

const EditGenre = () => {
    const { handleSubmit, register, reset } = useForm();

    const onSubmit = (data) => {
        console.log({ formData: data });
        reset();
    };

    const [nameGenre, setNameGenre] = useState("Hành động");
    const [desc, setDesc] = useState("hanh-dong");

    return (
        <div className="flex bg-[#f9f9fb]">
            <SideBar className="flex-1" />
            <section className="flex-[4]">
                <h1
                    className="mt-10 bg-[#f4f6f9] px-2 py-2 text-3xl"
                    id="heading-top"
                >
                    Cập nhật thông tin thể loại
                </h1>
                <div className="mx-2 mt-4 rounded-md bg-white pb-4 shadow-md shadow-slate-400">
                    <h2 className="px-2 py-2 text-lg font-medium">
                        Thông tin cập nhật Thể loại
                    </h2>
                    <form
                        action=""
                        className="border-2 border-[#e3e3e9] border-l-transparent border-r-transparent p-4"
                        autoComplete="off"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="mb-3">
                            <label
                                htmlFor="nameGenre"
                                className="mb-1 block font-bold"
                            >
                                Tên thể loại
                            </label>
                            <input
                                id="nameGenre"
                                {...register("nameGenre")}
                                type="text"
                                value={nameGenre}
                                onChange={(e) => setNameGenre(e.target.value)}
                                placeholder="Nhập tên thể loại"
                                className="h-10 w-full rounded-lg border border-solid border-[#d2d1d6] px-3 focus:border-[#77dae6]"
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="desc"
                                className="mb-1 block font-bold"
                            >
                                Mô tả
                            </label>
                            <input
                                id="desc"
                                {...register("desc")}
                                type="text"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                placeholder="Nhập mô tả"
                                className="h-10 w-full rounded-lg border border-solid border-[#d2d1d6] px-3 focus:border-[#77dae6]"
                            />
                        </div>

                        <div className="mt-4 flex justify-between">
                            <button
                                className="rounded-lg bg-[#28a745] px-4 py-3 text-white"
                                type="submit"
                            >
                                Cập nhật thể loại
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};
export default EditGenre;
