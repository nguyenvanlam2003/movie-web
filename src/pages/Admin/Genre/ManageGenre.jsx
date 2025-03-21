import Modal from "@components/Modal";
import SideBar from "@components/SideBar";
import {
    faEdit,
    faMagnifyingGlass,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Button, Table } from "antd";
import { useNavigate } from "react-router-dom";

const ManageGenre = () => {
    const [genres, setGenres] = useState([]);
    const token = Cookies.get("accessToken");
    useEffect(() => {
        // Gọi API để lấy dữ liệu
        const fetchGenres = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8080/api/genres",
                );
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
    const navigate = useNavigate();

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

    const columns = [
        {
            title: "STT",
            dataIndex: "index",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Tên thể loại",
            dataIndex: "nameGenre",
            key: "nameGenre",
        },
        {
            title: "Mô tả",
            dataIndex: "desc",
            key: "desc",
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
                            navigate(`/admin/genre/edit/${record._id}`)
                        }
                    >
                        Sửa
                    </Button>
                    <Button
                        danger
                        icon={<FontAwesomeIcon icon={faTrash} />}
                        onClick={() => {
                            setShowModal(true);
                            setDeletedGenreId(record._id);
                            setModalContent(`thể loại "${record.nameGenre}"`);
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

                        <Table
                            dataSource={filteredGenres}
                            columns={columns}
                            components={{
                                header: {
                                    cell: ({ children, ...rest }) => (
                                        <th
                                            {...rest}
                                            style={{
                                                fontWeight: "bolder",
                                                fontSize: "16px",
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
                            content={modalContent}
                            setShowModal={setShowModal}
                            deleteId={deletedGenreId}
                            router={"http://localhost:8080/api/genres/"}
                            token={token}
                        />
                    )}
                </section>
            )}
        </div>
    );
};
export default ManageGenre;
