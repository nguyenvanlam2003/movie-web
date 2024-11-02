import Modal from "@components/Modal";
import SideBar from "@components/SideBar";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useState, useEffect } from "react";
import axios from 'axios';
import Cookies from "js-cookie";

const ManageGenre = () => {
    const [genres, setGenres] = useState([
        // {
        //     id: crypto.randomUUID(),
        //     nameGenre: "Chính kịch",
        //     desc: "chinh-kich",
        // },
        // {
        //     id: crypto.randomUUID(),
        //     nameGenre: "Hành động",
        //     desc: "hanh-dong",
        // },
    ]);
    const token = Cookies.get("accessToken");
    useEffect(() => {
        // Gọi API để lấy dữ liệu
        const fetchGenres = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/genres');
                setGenres(response.data); // Thay thế toàn bộ state bằng dữ liệu từ API
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };

        fetchGenres(); // Gọi hàm để lấy dữ liệu khi component mount
    }, []);

    console.log(genres);
    const [showModal, setShowModal] = useState(false);

    const [deletedGenreId, setDeletedGenreId] = useState("");
    const [modalContent, setModalContent] = useState("");

    const [searchText, setSearchText] = useState("");

    const filteredGenres = useMemo(() => {
        return (genres || []).filter((genre) => {
            return (genre?.nameGenre ?? "").includes(searchText);
        });
    }, [searchText, genres]);
    const [sidebarLoaded, setSidebarLoaded] = useState(false);

    const handleSidebarLoadComplete = () => {
        setSidebarLoaded(true); // Cập nhật trạng thái khi sidebar đã tải xong
    };
    return (
        <div className="flex">
            <SideBar onLoadComplete={handleSidebarLoadComplete} className="flex-1" />
            {sidebarLoaded && (
                <section className="flex-[4]">
                    <h1 className="mt-10 bg-[#f4f6f9] px-2 py-2 text-3xl">
                        Quản lý thể loại
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
                            </form>
                            <div className="flex gap-2">
                                <a
                                    href="/admin/genre/create"
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
                                        Tên thể loại
                                    </th>
                                    <th className="min-w-32 border-b-2 border-b-[#dee2d6] p-3 align-bottom">
                                        Mô tả
                                    </th>
                                    <th className="min-w-32 border-b-2 border-b-[#dee2d6] p-3 align-bottom">
                                        Chức năng
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {(filteredGenres || []).map((genre, index) => (
                                    <tr key={genre._id}>
                                        <td className="border-t-2 border-t-[#dee2d6] p-3 align-top">
                                            {index + 1}
                                        </td>
                                        <td className="min-w-32 border-t-2 border-t-[#dee2d6] p-3 align-top">
                                            {genre.nameGenre}
                                        </td>
                                        <td className="min-w-32 border-t-2 border-t-[#dee2d6] p-3 align-top">
                                            {genre.desc}
                                        </td>
                                        <td className="min-w-32 border-t-2 border-t-[#dee2d6] p-3 align-top">
                                            <a
                                                href={`/admin/genre/edit/${genre._id}`}
                                                className="inline-block rounded-md bg-[#007bff] p-2 text-white"
                                            >
                                                Sửa
                                            </a>
                                            <a
                                                href="#!"
                                                className="ml-1 inline-block rounded-md bg-[#dc3545] p-2 text-white"
                                                onClick={() => {
                                                    setShowModal(true);
                                                    setDeletedGenreId(genre._id);
                                                    setModalContent(
                                                        `thể loại "${genre.nameGenre}"`,
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
                            content={modalContent}
                            setShowModal={setShowModal}
                            deleteId={deletedGenreId}
                            router={"http://localhost:8080/api/genres/"}
                            token={token}
                        />
                    )}
                </section>)}
        </div>
    );
};
export default ManageGenre;
