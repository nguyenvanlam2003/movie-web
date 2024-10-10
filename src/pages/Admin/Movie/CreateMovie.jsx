import SideBar from "@components/SideBar";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const GENRES = [
    {
        id: "37a7b38b6184a5ebd3c43015aa20709d",
        name: "Chính Kịch",
        slug: "chinh-kich",
    },
    {
        id: "ba6fd52e5a3aca80eaaf1a3b50a182db",
        name: "Hài Hước",
        slug: "hai-huoc",
    },
    {
        id: "46a6df48b64935df845cf8ad4f448d4c",
        name: "Tình Cảm",
        slug: "tinh-cam",
    },
    {
        id: "1a18f0d42e4e66060dbf1fd7cb25d11a",
        name: "Tâm Lý",
        slug: "tam-ly",
    },
];

const CreateMovie = () => {
    const [movieType, setMovieType] = useState("");
    const [episodes, setEpisodes] = useState([]);

    const handleChangeMovieType = (e) => {
        setMovieType(e.target.value);
        if (movieType === "single") {
            setEpisodes([
                {
                    name: "",
                    video: "",
                },
            ]);
        } else {
            setEpisodes([
                {
                    name: "",
                    video: "",
                },
            ]);
        }
    };

    const addEpisode = (e) => {
        e.preventDefault();
        setEpisodes([
            ...episodes,
            {
                name: "",
                video: "",
            },
        ]);
    };

    const handleEpisodeChange = (index, field, value) => {
        const updatedEpisode = [...episodes];
        episodes[index][field] = value;
        setEpisodes(updatedEpisode);
    };

    const handleChangePoster = () => {
        const posterImg = document.getElementById("poster-img");
        const previewPoster = document.getElementById("poster-preview");
        previewPoster.src = window.URL.createObjectURL(posterImg.files[0]);
    };

    const handleChangeThumb = () => {
        const thumbImg = document.getElementById("thumb-img");
        const previewThumb = document.getElementById("thumb-preview");
        previewThumb.src = window.URL.createObjectURL(thumbImg.files[0]);
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
                                name="name"
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
                                name="origin-name"
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
                                name="slug"
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
                                    src="/img-placeholder.jpg"
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
                                    src="/img-placeholder.jpg"
                                    alt=""
                                    className="mt-1 h-32 w-32 cursor-pointer rounded-xl object-cover"
                                />
                            </label>
                        </div>

                        <div className="mb-3">
                            <label
                                htmlFor="typeSelect"
                                className="mb-1 block font-bold"
                            >
                                Chọn loại phim
                            </label>
                            <select
                                name="type"
                                id="typeSelect"
                                className="block w-full rounded-lg border border-solid border-[#ced4da] bg-white px-3 py-2 focus:border-[#77dae6]"
                                onChange={handleChangeMovieType}
                            >
                                <option value="">---Chọn loại phim---</option>
                                <option value="single">Phim lẻ</option>
                                <option value="series">Phim bộ</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="" className="mb-1 block font-bold">
                                Thể loại
                            </label>
                            {/* <select
                                name="genres"
                                id="genresSelect"
                                className="block w-full rounded-lg border border-solid border-[#ced4da] bg-white px-3 py-2 focus:border-[#77dae6]"
                            >
                                <option value="">
                                    ---Chọn thể loại phim---
                                </option>
                                <option value="chinh-kich">Chính kịch</option>
                                <option value="hanh-dong">Hành động</option>
                                <option value="gia-dinh">Gia đình</option>
                            </select> */}
                            <div className="flex flex-wrap gap-2">
                                {GENRES.map((genre) => (
                                    <div key={genre.id}>
                                        <input
                                            type="checkbox"
                                            id={genre.slug}
                                            value={genre.slug}
                                            name="genres"
                                        />
                                        <label
                                            htmlFor={genre.slug}
                                            className="ml-1"
                                        >
                                            {genre.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label
                                htmlFor="content"
                                className="mb-1 block font-bold"
                            >
                                Nội dung phim
                            </label>
                            <textarea
                                name="content"
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
                                name="vote-average"
                                type="number"
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
                                name="time"
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
                                name="year"
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
                                name="director"
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
                                name="actor"
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
                                name="trailer"
                                type="text"
                                placeholder="Nhập trailer key"
                                className="h-10 w-full rounded-lg border border-solid border-[#d2d1d6] px-3 focus:border-[#77dae6]"
                            />
                        </div>

                        {episodes.map((episode, index) => (
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
                        )}

                        <div className="mt-4 flex justify-between">
                            <button className="rounded-lg bg-[#28a745] px-4 py-3 text-white">
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
