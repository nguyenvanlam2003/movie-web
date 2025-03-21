import { useMemo, useState, useEffect } from "react";
import Modal from "@components/Modal";
import SideBar from "@components/SideBar";
import {
    faEdit,
    faMagnifyingGlass,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Cookies from "js-cookie";
import { Button, Table } from "antd";
import { useNavigate } from "react-router-dom";

const ManageMovie = () => {
    const token = Cookies.get("accessToken");
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Gửi yêu cầu với Authorization header chứa JWT
                const response = await axios.get(
                    "http://localhost:8080/api/movies",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );

                setMovies(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching Users:", error);
            }
        };

        fetchUsers(); // Gọi hàm để lấy dữ liệu khi component mount
    }, []);
    const [showModal, setShowModal] = useState(false);
    const [deletedMovieId, setDeletedMovieId] = useState("");
    const [modalContent, setModalContent] = useState("");
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();

    const filteredMovies = useMemo(() => {
        return movies.filter((movie) => {
            return (movie?.originName ?? "").includes(searchText);
        });
    }, [searchText, movies]);

    const [sidebarLoaded, setSidebarLoaded] = useState(false);

    const handleSidebarLoadComplete = () => {
        setSidebarLoaded(true); // Cập nhật trạng thái khi sidebar đã tải xong
    };

    const columns = [
        {
            title: "STT",
            dataIndex: "index",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Tên phim",
            dataIndex: "originName",
            key: "originName",
        },
        {
            title: "Poster",
            dataIndex: "posterUrl",
            key: "posterUrl",
            render: (url) =>
                url ? (
                    <img
                        src={`http://localhost:8080/images/movies/${url}`}
                        alt="Poster"
                        className="h-28 w-28 rounded object-cover"
                    />
                ) : (
                    "/img-placeholder.jpg"
                ),
        },
        {
            title: "Thời gian",
            dataIndex: "time",
            key: "time",
        },
        {
            title: "Năm phát hành",
            dataIndex: "year",
            key: "year",
        },
        {
            title: "Thể loại",
            dataIndex: "genres",
            key: "genres",
            render: (genres) => genres.map((g) => g.nameGenre).join(", "),
        },
        {
            title: "Đạo diễn",
            dataIndex: "director",
            key: "director",
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <div className="flex gap-2">
                    <Button
                        type="primary"
                        icon={<FontAwesomeIcon icon={faEdit} />}
                        onClick={() =>
                            navigate(`/admin/movie/edit/${record._id}`)
                        }
                    >
                        Sửa
                    </Button>
                    <Button
                        danger
                        icon={<FontAwesomeIcon icon={faTrash} />}
                        onClick={() => {
                            setShowModal(true);
                            setDeletedMovieId(record._id);
                            setModalContent(`phim "${record.originName}"`);
                        }}
                    >
                        Xóa
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="flex">
            <SideBar
                onLoadComplete={handleSidebarLoadComplete}
                className="flex-1"
            />
            {sidebarLoaded && (
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

                        <Table
                            dataSource={filteredMovies}
                            columns={columns}
                            components={{
                                header: {
                                    cell: ({ children, ...rest }) => (
                                        <th
                                            {...rest}
                                            style={{
                                                fontWeight: "bolder",
                                                fontSize: "16px",
                                                textWrap: "nowrap",
                                            }}
                                        >
                                            {children}
                                        </th>
                                    ),
                                },
                                body: {
                                    cell: ({ children, ...rest }) => (
                                        <td
                                            {...rest}
                                            style={{ fontSize: "16px" }}
                                        >
                                            {children}
                                        </td>
                                    ),
                                },
                            }}
                            pagination={{
                                pageSize: 5,
                            }}
                        />
                    </div>

                    {showModal && (
                        <Modal
                            setShowModal={setShowModal}
                            deleteId={deletedMovieId}
                            content={modalContent}
                            router={"http://localhost:8080/api/movies/"}
                            token={token}
                        />
                    )}
                </section>
            )}
        </div>
    );
};
export default ManageMovie;
