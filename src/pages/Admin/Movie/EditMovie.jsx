import FormField from "@components/AdminForm/FormField";
import EpisodesInput from "@components/AdminForm/FormInput/EpisodesInput";
import GenresInput from "@components/AdminForm/FormInput/GenresInput";
import TypeInput from "@components/AdminForm/FormInput/TypeInput";
import SideBar from "@components/SideBar";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useForm } from "react-hook-form";

const EditMovie = () => {
    const { handleSubmit, register, control, setValue } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    const [name, setName] = useState("Beckham");
    const [originName, setOriginName] = useState("Beckham");
    const [slug, setSlug] = useState("beckham");
    const [content, setContent] = useState(
        "Có các thước phim chưa từng công bố trước đây, loạt phim tài liệu này dõi theo hành trình trỗi dậy mạnh mẽ của David Beckham từ khởi đầu khiêm tốn đến ngôi sao bóng đá toàn cầu.",
    );
    const [posterPreview, setPosterPreview] = useState("/img-placeholder.jpg");
    const [thumbPreview, setThumbPreview] = useState("/img-placeholder.jpg");
    const [voteAverage, setVoteAverage] = useState(9);
    const [time, setTime] = useState("71 phút/tập");
    const [year, setYear] = useState(2023);
    const [director, setDirector] = useState("Đang cập nhật");
    const [actor, setActor] = useState("Beckham");
    const [trailerKey, setTrailerKey] = useState("TEST");

    // const handleChangePoster = () => {
    //     const posterImg = document.getElementById("poster-img");
    //     const previewPoster = document.getElementById("poster-preview");
    //     previewPoster.src = window.URL.createObjectURL(posterImg.files[0]);
    // };

    // const handleChangeThumb = () => {
    //     const thumbImg = document.getElementById("thumb-img");
    //     const previewThumb = document.getElementById("thumb-preview");
    //     previewThumb.src = window.URL.createObjectURL(thumbImg.files[0]);
    // };

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
                    Cập nhật thông tin phim
                </h1>
                <div className="mx-2 mt-4 rounded-md bg-white pb-4 shadow-md shadow-slate-400">
                    <h2 className="px-2 py-2 text-lg font-medium">
                        Thông tin cập nhật Phim
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
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                                {...register("origin-name")}
                                type="text"
                                placeholder="Nhập tên gốc phim"
                                value={originName}
                                onChange={(e) => setOriginName(e.target.value)}
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
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
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
                            {/* <label
                                htmlFor="typeSelect"
                                className="mb-1 block font-bold"
                            >
                                Chọn loại phim
                            </label>
                            <select
                                {...register("type")}
                                id="typeSelect"
                                className="block w-full rounded-lg border border-solid border-[#ced4da] bg-white px-3 py-2 focus:border-[#77dae6]"
                                value={movieType}
                                onChange={handleChangeMovieType}
                            >
                                <option value="">---Chọn loại phim---</option>
                                <option value="single">Phim lẻ</option>
                                <option value="series">Phim bộ</option>
                            </select> */}
                            <FormField
                                label="Chọn loại phim"
                                name="type"
                                control={control}
                                Component={TypeInput}
                            />
                        </div>

                        <div className="mb-3">
                            <FormField
                                label="Thể loại"
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
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
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
                                {...register("vote-average")}
                                type="number"
                                placeholder="Nhập điểm đánh giá"
                                value={voteAverage}
                                onChange={(e) => setVoteAverage(e.target.value)}
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
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
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
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
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
                                value={director}
                                onChange={(e) => setDirector(e.target.value)}
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
                                value={actor}
                                onChange={(e) => setActor(e.target.value)}
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
                                value={trailerKey}
                                onChange={(e) => setTrailerKey(e.target.value)}
                                className="h-10 w-full rounded-lg border border-solid border-[#d2d1d6] px-3 focus:border-[#77dae6]"
                            />
                        </div>

                        {/* {episodes.map((episode, index) => (
                            <div
                                key={index}
                                className="border-b-2 border-t-2 border-[#e3e3e9]"
                            >
                                <div className="mb-3">
                                    <label
                                        htmlFor=""
                                        className="mb-1 block font-bold"
                                    >{`Tập ${index + 1}`}</label>
                                    <input
                                        type="text"
                                        value={episode.name}
                                        placeholder="Nhập tên của tập phim"
                                        className="h-10 w-full rounded-lg border border-solid border-[#d2d1d6] px-3 focus:border-[#77dae6]"
                                        name="ten-tap"
                                        onChange={(e) => {
                                            handleEpisodeChange(
                                                index,
                                                "name",
                                                e.target.value,
                                            );
                                        }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor=""
                                        className="mb-1 block font-bold"
                                    >{`Video tập ${index + 1}`}</label>
                                    <input
                                        type="url"
                                        value={episode.video}
                                        placeholder="Nhập link video"
                                        className="h-10 w-full rounded-lg border border-solid border-[#d2d1d6] px-3 focus:border-[#77dae6]"
                                        name="video"
                                        onChange={(e) => {
                                            handleEpisodeChange(
                                                index,
                                                "video",
                                                e.target.value,
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                        ))}

                        {movieType === "series" && (
                            <button
                                className="mt-2 rounded-lg bg-[#4e3698] px-3 py-2 text-white"
                                onClick={addEpisode}
                            >
                                Thêm tập tiếp theo
                            </button>
                        )} */}

                        <FormField
                            name="episodes"
                            control={control}
                            Component={EpisodesInput}
                        />

                        <div className="mt-4 flex justify-between">
                            <button className="rounded-lg bg-[#28a745] px-4 py-3 text-white">
                                Cập nhật phim
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

export default EditMovie;
