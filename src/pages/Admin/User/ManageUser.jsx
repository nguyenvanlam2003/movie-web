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

const ManageUser = () => {
    // Lấy token từ cookies
    const token = Cookies.get("accessToken");
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Gửi yêu cầu với Authorization header chứa JWT
                const response = await axios.get(
                    "http://localhost:8080/api/users",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );

                setUsers(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching Users:", error);
            }
        };

        fetchUsers(); // Gọi hàm để lấy dữ liệu khi component mount
    }, []);
    const [showModal, setShowModal] = useState(false);
    const [deletedUserId, setDeletedUserId] = useState("");
    const [modalContent, setModalContent] = useState("");
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            return user.username.includes(searchText);
        });
    }, [searchText, users]);
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
            title: "Tên người dùng",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Avatar",
            dataIndex: "avatar",
            key: "avatar",
            render: (url) => (
                <img
                    src={
                        url
                            ? `http://localhost:8080/images/avatar/${url}`
                            : "/img-placeholder.jpg"
                    }
                    alt="Avatar"
                    className="h-28 w-28 rounded object-cover"
                />
            ),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Quyền",
            dataIndex: "isAdmin",
            key: "isAdmin",
            render: (isAdmin) => (isAdmin ? "Quản trị" : "Người dùng"),
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
                            navigate(`/admin/user/edit/${record._id}`)
                        }
                    >
                        Sửa
                    </Button>
                    <Button
                        danger
                        icon={<FontAwesomeIcon icon={faTrash} />}
                        onClick={() => {
                            setShowModal(true);
                            setDeletedUserId(record._id);
                            setModalContent(`người dùng "${record.username}"`);
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
                        Quản lý nguời dùng
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
                        </div>

                        <Table
                            dataSource={filteredUsers}
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
                            deleteId={deletedUserId}
                            router={"http://localhost:8080/api/users/"}
                            token={token}
                        />
                    )}
                </section>
            )}
        </div>
    );
};
export default ManageUser;
