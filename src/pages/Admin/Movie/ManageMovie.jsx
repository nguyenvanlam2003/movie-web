import { useMemo, useState } from "react";
import Modal from "@components/Modal";
import SideBar from "@components/SideBar";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ManageMovie = () => {
    
    const [movies, setMovies] = useState([
        {
            id: crypto.randomUUID(),
            name: "Deadpool và Wolverine",
            posterUrl:
                "https://phimimg.com/upload/vod/20240728-1/201d7ad36c2f38804ea00636f5d793ee.jpg",
            time: "128 phút",
            year: 2024,
            genres: [
                {
                    id: "0bcf4077916678de9b48c89221fcf8ae",
                    name: "Khoa Học",
                    slug: "khoa-hoc",
                },
                {
                    id: "68564911f00849030f9c9c144ea1b931",
                    name: "Viễn Tưởng",
                    slug: "vien-tuong",
                },
                {
                    id: "9822be111d2ccc29c7172c78b8af8ff5",
                    name: "Hành Động",
                    slug: "hanh-dong",
                },
                {
                    id: "ba6fd52e5a3aca80eaaf1a3b50a182db",
                    name: "Hài Hước",
                    slug: "hai-huoc",
                },
            ],
            director: ["Shawn Levy"],
        },
        {
            id: crypto.randomUUID(),
            name: "Avengers: Endgame",
            posterUrl:
                "https://phimimg.com/upload/vod/20231018-1/88c1ee81bbfcd39a73db1f83203b5501.jpg",
            time: "180 phút",
            year: 2019,
            genres: [
                {
                    id: "66c78b23908113d478d8d85390a244b4",
                    name: "Phiêu Lưu",
                    slug: "phieu-luu",
                },
                {
                    id: "0bcf4077916678de9b48c89221fcf8ae",
                    name: "Khoa Học",
                    slug: "khoa-hoc",
                },
                {
                    id: "9822be111d2ccc29c7172c78b8af8ff5",
                    name: "Hành Động",
                    slug: "hanh-dong",
                },
            ],
            director: ["Joe Russo", "Anthony Russo"],
        },
        {
            id: crypto.randomUUID(),
            name: "Độc Đạo",
            posterUrl:
                "https://phimimg.com/upload/vod/20240912-1/0db8ef07872e0c69b0f1a68546066585.webp",
            time: "50 phút/tập",
            year: 2024,
            genres: [
                {
                    id: "35f2b21717ff9e6e817a5ffcbf03bee2",
                    name: "Hình Sự",
                    slug: "hinh-su",
                },
                {
                    id: "5060cc424f1d7d870f294cc4cf89d5c4",
                    name: "Hành Động",
                    slug: "hanh-dong",
                },
            ],
            director: ["Nguyễn Khải Anh"],
        },
        {
            id: crypto.randomUUID(),
            name: "Black Myth: Wukong",
            posterUrl:
                "https://phimimg.com/upload/vod/20240917-1/2528691ab9c3fbb348732a685f2ece0b.jpg",
            time: "6 phút/tập",
            year: 2024,
            genres: [
                {
                    id: "66c78b23908113d478d8d85390a244b4",
                    name: "Phiêu Lưu",
                    slug: "phieu-luu",
                },
                {
                    id: "0fcf63d85bf8ff2319725225a72579d5",
                    name: "Thần Thoại",
                    slug: "than-thoai",
                },
            ],
            director: ["Đang cập nhật"],
        },
        {
            id: crypto.randomUUID(),
            name: "Thor 4: Love And Thunder",
            posterUrl:
                "https://phimimg.com/upload/vod/20240711-1/be42cbe0b908894c7a3f2b55dada89a2.jpg",
            time: "115 phút",
            year: 2022,
            genres: [
                {
                    id: "9822be111d2ccc29c7172c78b8af8ff5",
                    name: "Hành Động",
                    slug: "hanh-dong",
                },
                {
                    id: "68564911f00849030f9c9c144ea1b931",
                    name: "Viễn Tưởng",
                    slug: "vien-tuong",
                },
                {
                    id: "66c78b23908113d478d8d85390a244b4",
                    name: "Phiêu Lưu",
                    slug: "phieu-luu",
                },
            ],
            director: ["Taika Waititi"],
        },
    ]);
    const [showModal, setShowModal] = useState(false);
    const [deletedMovieId, setDeletedMovieId] = useState("");
    const [modalContent, setModalContent] = useState("");
    const [searchText, setSearchText] = useState("");

    const filteredMovies = useMemo(() => {
        return movies.filter((movie) => {
            return movie.name.includes(searchText);
        });
    }, [searchText, movies]);

    return (
        <div className="flex">
            <SideBar className="flex-1" />
            <section className="flex-[4]">
                <h1 className="mt-10 bg-[#f4f6f9] px-2 py-2 text-3xl">
                    Quản lý phim
                </h1>
                <div className="mt-3 border border-[#00000020] p-4 shadow-sm shadow-[#00000033]">
                    <div className="flex justify-between border border-transparent border-b-[#00000020] pb-6">
                        <form action="" className="flex items-center gap-1">
                            <div className="flex h-10 w-64 items-center justify-between rounded-lg border border-[#d2d1d6] px-3 focus-within:border-[#77dae6]">
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="Nhập từ khóa tìm kiếm"
                                    className="h-full w-full"
                                    value={searchText}
                                    onChange={(e) => {
                                        setSearchText(e.target.value);
                                    }}
                                />
                                <FontAwesomeIcon
                                    icon={faMagnifyingGlass}
                                    className="ml-2"
                                />
                            </div>
                            {/* <button className="h-10 rounded-lg bg-[#007bff] px-2 text-white">
                                Tìm kiếm
                            </button> */}
                        </form>
                        <div className="flex gap-2">
                            <a
                                href="/admin/movie/create"
                                className="flex h-10 items-center justify-center rounded-lg bg-[#007bff] px-2 text-white"
                            >
                                Thêm mới
                            </a>
                        </div>
                    </div>

                    <table className="w-full border-collapse overflow-x-auto text-left">
                        <thead>
                            <tr>
                                <th className="border-b-2 border-b-[#dee2d6] p-3 align-bottom">
                                    STT
                                </th>
                                <th className="min-w-32 border-b-2 border-b-[#dee2d6] p-3 align-bottom">
                                    Tên phim
                                </th>
                                <th className="min-w-32 border-b-2 border-b-[#dee2d6] p-3 align-bottom">
                                    Poster
                                </th>
                                <th className="min-w-32 border-b-2 border-b-[#dee2d6] p-3 align-bottom">
                                    Thời gian
                                </th>
                                <th className="min-w-32 border-b-2 border-b-[#dee2d6] p-3 align-bottom">
                                    Năm phát hành
                                </th>
                                <th className="min-w-32 border-b-2 border-b-[#dee2d6] p-3 align-bottom">
                                    Thể loại
                                </th>
                                <th className="min-w-32 border-b-2 border-b-[#dee2d6] p-3 align-bottom">
                                    Đạo diễn
                                </th>
                                <th className="min-w-32 border-b-2 border-b-[#dee2d6] p-3 align-bottom">
                                    Bình luận
                                </th>
                                <th className="min-w-32 border-b-2 border-b-[#dee2d6] p-3 align-bottom">
                                    Chức năng
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMovies.map((movie, index) => (
                                <tr key={movie.id}>
                                    <td className="border-t-2 border-t-[#dee2d6] p-3 align-top">
                                        {index + 1}
                                    </td>
                                    <td className="min-w-32 border-t-2 border-t-[#dee2d6] p-3 align-top">
                                        {movie.name}
                                    </td>
                                    <td className="min-w-32 border-t-2 border-t-[#dee2d6] p-3 align-top">
                                        <img
                                            src={movie.posterUrl}
                                            alt=""
                                            className="h-32 w-32 object-cover"
                                        />
                                    </td>
                                    <td className="min-w-32 border-t-2 border-t-[#dee2d6] p-3 align-top">
                                        {movie.time}
                                    </td>
                                    <td className="min-w-32 border-t-2 border-t-[#dee2d6] p-3 align-top">
                                        {movie.year}
                                    </td>
                                    <td className="min-w-32 border-t-2 border-t-[#dee2d6] p-3 align-top">
                                        {(movie.genres || [])
                                            .map((item) => item.name)
                                            .join(", ")}
                                    </td>
                                    <td className="min-w-32 border-t-2 border-t-[#dee2d6] p-3 align-top">
                                        {(movie.director || []).join(", ")}
                                    </td>
                                    <td className="min-w-32 border-t-2 border-t-[#dee2d6] p-3 align-top">
                                        <a
                                            href={`/comment/${movie.id}`}
                                            className="text-red-500"
                                        >
                                            Chi tiết(2)
                                        </a>
                                    </td>
                                    <td className="min-w-32 border-t-2 border-t-[#dee2d6] p-3 align-top">
                                        <a
                                            href="/admin/movie/edit"
                                            className="inline-block rounded-md bg-[#007bff] p-2 text-white"
                                        >
                                            Sửa
                                        </a>
                                        <a
                                            href="#!"
                                            className="ml-1 inline-block rounded-md bg-[#dc3545] p-2 text-white"
                                            onClick={() => {
                                                setShowModal(true);
                                                setDeletedMovieId(movie.id);
                                                setModalContent(
                                                    `phim "${movie.name}"`,
                                                );
                                            }}
                                        >
                                            Xóa
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {showModal && (
                    <Modal
                        setShowModal={setShowModal}
                        deletedItemId={deletedMovieId}
                        listItem={movies}
                        setListItem={setMovies}
                        content={modalContent}
                    />
                )}
            </section>
        </div>
    );
};
export default ManageMovie;
