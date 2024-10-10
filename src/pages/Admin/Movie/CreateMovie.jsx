import FormField from "@components/AdminForm/FormField";
import EpisodesInput from "@components/AdminForm/FormInput/EpisodesInput";
import GenresInput from "@components/AdminForm/FormInput/GenresInput";
import TypeInput from "@components/AdminForm/FormInput/TypeInput";
import SideBar from "@components/SideBar";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useForm } from "react-hook-form";

const CreateMovie = () => {
    const { handleSubmit, control, register, setValue } = useForm({
        defaultValues: {
            type: "single",
        },
    });
    const [posterPreview, setPosterPreview] = useState("/img-placeholder.jpg");
    const [thumbPreview, setThumbPreview] = useState("/img-placeholder.jpg");

    const onSubmit = (data) => {
        console.log({ formData: data });
    };

    const handleChangePoster = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setPosterPreview(previewUrl);
            setValue("posterUrl", file, { shouldValidate: true });
        }
    };

    const handleChangeThumb = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setThumbPreview(previewUrl);
            setValue("thumbUrl", file, { shouldValidate: true });
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
                    Thêm mới phim
                </h1>
                <div className="mx-2 mt-4 rounded-md bg-white pb-4 shadow-md shadow-slate-400">
                    <h2 className="px-2 py-2 text-lg font-medium">
                        Thông tin thêm mới Phim
                    </h2>
                    <form
                        action=""
                        className="border-2 border-[#e3e3e9] border-l-transparent border-r-transparent p-4"
                        autoComplete="off"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="mb-3">
                            <label
                                htmlFor="name"
                                className="mb-1 block font-bold"
                            >
                                Tên phim
                            </label>
                            <input
                                id="name"
                                {...register("name")}
                                type="text"
                                placeholder="Nhập tên phim"
                                className="h-10 w-full rounded-lg border border-solid border-[#d2d1d6] px-3 focus:border-[#77dae6]"
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="origin-name"
                                className="mb-1 block font-bold"
                            >
                                Tên gốc
                            </label>
                            <input
                                id="origin-name"
                                {...register("originName")}
                                type="text"
                                placeholder="Nhập tên gốc phim"
                                className="h-10 w-full rounded-lg border border-solid border-[#d2d1d6] px-3 focus:border-[#77dae6]"
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="slug"
                                className="mb-1 block font-bold"
                            >
                                Slug
                            </label>
                            <input
                                id="slug"
                                {...register("slug")}
                                type="text"
                                placeholder="Nhập slug"
                                className="h-10 w-full rounded-lg border border-solid border-[#d2d1d6] px-3 focus:border-[#77dae6]"
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="poster-img"
                                className="mb-1 font-bold"
                            >
                                Chọn ảnh Poster
                            </label>
                            <input
                                type="file"
                                name="poster"
                                id="poster-img"
                                accept="image/*"
                                hidden
                                onChange={handleChangePoster}
                            />
                            <label htmlFor="poster-img">
                                <img
                                    id="poster-preview"
                                    src={posterPreview}
                                    alt=""
                                    className="mt-1 h-32 w-32 cursor-pointer rounded-xl object-cover"
                                />
                            </label>
                        </div>

                        <div className="mb-3">
                            <label
                                htmlFor="thumb-img"
                                className="mb-1 font-bold"
                            >
                                Chọn ảnh Thumb
                            </label>
                            <input
                                type="file"
                                name="thumb"
                                id="thumb-img"
                                accept="image/*"
                                hidden
                                onChange={handleChangeThumb}
                            />
                            <label htmlFor="thumb-img">
                                <img
                                    id="thumb-preview"
                                    src={thumbPreview}
                                    alt=""
                                    className="mt-1 h-32 w-32 cursor-pointer rounded-xl object-cover"
                                />
                            </label>
                        </div>

                        <div className="mb-3">
                            <FormField
                                label="Chọn loại phim"
                                name="type"
                                control={control}
                                Component={TypeInput}
                            />
                        </div>

                        <div className="mb-3">
                            <FormField
                                label="Chọn thể loại"
                                name="genres"
                                control={control}
                                Component={GenresInput}
                            />
                        </div>

                        <div className="mb-3">
                            <label
                                htmlFor="content"
                                className="mb-1 block font-bold"
                            >
                                Nội dung phim
                            </label>
                            <textarea
                                {...register("content")}
                                id="content"
                                className="w-full resize-none rounded-lg border border-solid border-[#d2d1d6] px-3 py-2 focus:border-[#77dae6]"
                                rows={4}
                            ></textarea>
                        </div>

                        <div className="mb-3">
                            <label
                                htmlFor="vote-average"
                                className="mb-1 block font-bold"
                            >
                                Điểm đánh giá
                            </label>
                            <input
                                id="vote-average"
                                {...register("voteAverage")}
                                type="text"
                                placeholder="Nhập điểm đánh giá"
                                className="h-10 w-full rounded-lg border border-solid border-[#d2d1d6] px-3 focus:border-[#77dae6]"
                            />
                        </div>

                        <div className="mb-3">
                            <label
                                htmlFor="time"
                                className="mb-1 block font-bold"
                            >
                                Thời gian
                            </label>
                            <input
                                id="time"
                                {...register("time")}
                                type="text"
                                placeholder="Nhập thời gian"
                                className="h-10 w-full rounded-lg border border-solid border-[#d2d1d6] px-3 focus:border-[#77dae6]"
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="year"
                                className="mb-1 block font-bold"
                            >
                                Năm phát hành
                            </label>
                            <input
                                id="year"
                                {...register("year")}
                                type="text"
                                placeholder="Nhập năm phát hành"
                                className="h-10 w-full rounded-lg border border-solid border-[#d2d1d6] px-3 focus:border-[#77dae6]"
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="director"
                                className="mb-1 block font-bold"
                            >
                                Đạo diễn
                            </label>
                            <input
                                id="director"
                                {...register("director")}
                                type="text"
                                placeholder="Nhập đạo diễn"
                                className="h-10 w-full rounded-lg border border-solid border-[#d2d1d6] px-3 focus:border-[#77dae6]"
                            />
                        </div>
                        <div className="mb-3">
                            <label
                                htmlFor="actor"
                                className="mb-1 block font-bold"
                            >
                                Diễn viên
                            </label>
                            <input
                                id="actor"
                                {...register("actor")}
                                type="text"
                                placeholder="Nhập diễn viên"
                                className="h-10 w-full rounded-lg border border-solid border-[#d2d1d6] px-3 focus:border-[#77dae6]"
                            />
                        </div>

                        <div className="mb-3">
                            <label
                                htmlFor="trailer-key"
                                className="mb-1 block font-bold"
                            >
                                Trailer
                            </label>
                            <input
                                id="trailer-key"
                                {...register("trailer")}
                                type="text"
                                placeholder="Nhập trailer key"
                                className="h-10 w-full rounded-lg border border-solid border-[#d2d1d6] px-3 focus:border-[#77dae6]"
                            />
                        </div>

                        <FormField
                            name="episodes"
                            control={control}
                            Component={EpisodesInput}
                        />

                        <div className="mt-4 flex justify-between">
                            <button
                                className="rounded-lg bg-[#28a745] px-4 py-3 text-white"
                                type="submit"
                            >
                                Thêm mới
                            </button>
                            <a
                                href="#heading-top"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#779b96]"
                            >
                                <FontAwesomeIcon
                                    icon={faArrowUp}
                                    className="text-white"
                                />
                            </a>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default CreateMovie;
