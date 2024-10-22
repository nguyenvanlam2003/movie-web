import Modal from "@components/Modal";
import SideBar from "@components/SideBar";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo, useState } from "react";

const ManageUser = () => {
    const [users, setUsers] = useState([
        {
            id: crypto.randomUUID(),
            userName: "user1",
            fullName: "User Test 1",
            avatar: "https://images.vexels.com/content/145908/preview/male-avatar-maker-2a7919.png",
            email: "user1@gmail.com",
            isAdmin: true,
        },
        {
            id: crypto.randomUUID(),
            userName: "user2",
            fullName: "User Test 2",
            avatar: "https://images.vexels.com/content/145908/preview/male-avatar-maker-2a7919.png",
            email: "user2@gmail.com",
            isAdmin: false,
        },
    ]);
    const [showModal, setShowModal] = useState(false);
    const [deletedUserId, setDeletedUserId] = useState("");
    const [modalContent, setModalContent] = useState("");
    const [searchText, setSearchText] = useState("");

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            return user.userName.includes(searchText);
        });
    }, [searchText, users]);
    return (
        <div className="flex">
            <SideBar className="flex-1" />
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

                    <table className="w-full border-collapse overflow-x-auto text-left">
                        <thead>
                            <tr>
                                <th className="border-b-2 border-b-[#dee2d6] p-3 align-bottom">
                                    STT
                                </th>
                                <th className="min-w-32 border-b-2 border-b-[#dee2d6] p-3 align-bottom">
                                    Tên người dùng
                                </th>
                                <th className="min-w-32 border-b-2 border-b-[#dee2d6] p-3 align-bottom">
                                    Avatar
                                </th>
                                <th className="min-w-32 border-b-2 border-b-[#dee2d6] p-3 align-bottom">
                                    Email
                                </th>
                                <th className="min-w-32 border-b-2 border-b-[#dee2d6] p-3 align-bottom">
                                    Quyền
                                </th>
                                <th className="min-w-32 border-b-2 border-b-[#dee2d6] p-3 align-bottom">
                                    Chức năng
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, index) => (
                                <tr key={user.id}>
                                    <td className="border-t-2 border-t-[#dee2d6] p-3 align-top">
                                        {index + 1}
                                    </td>
                                    <td className="min-w-32 border-t-2 border-t-[#dee2d6] p-3 align-top">
                                        {user.userName}
                                    </td>
                                    <td className="min-w-32 border-t-2 border-t-[#dee2d6] p-3 align-top">
                                        <img
                                            src={user.avatar}
                                            alt=""
                                            className="h-28 w-28 rounded-lg object-cover"
                                        />
                                    </td>
                                    <td className="min-w-32 border-t-2 border-t-[#dee2d6] p-3 align-top">
                                        {user.email}
                                    </td>
                                    <td className="min-w-32 border-t-2 border-t-[#dee2d6] p-3 align-top">
                                        {user.isAdmin
                                            ? "Quản trị"
                                            : "Người dùng"}
                                    </td>
                                    <td className="min-w-32 border-t-2 border-t-[#dee2d6] p-3 align-top">
                                        <a
                                            href="/admin/user/edit"
                                            className="inline-block rounded-md bg-[#007bff] p-2 text-white"
                                        >
                                            Sửa
                                        </a>
                                        <a
                                            href="#!"
                                            className="ml-1 inline-block rounded-md bg-[#dc3545] p-2 text-white"
                                            onClick={() => {
                                                setShowModal(true);
                                                setDeletedUserId(user.id);
                                                setModalContent(
                                                    `người dùng "${user.userName}"`,
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
                        deletedItemId={deletedUserId}
                        listItem={users}
                        setListItem={setUsers}
                        content={modalContent}
                    />
                )}
            </section>
        </div>
    );
};
export default ManageUser;
