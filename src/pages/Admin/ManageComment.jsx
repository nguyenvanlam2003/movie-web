import { useState } from "react";
import SideBar from "@components/SideBar";
import Modal from "@components/Modal";
import { useParams } from "react-router-dom";

const ManageComment = () => {
    const { id } = useParams();
    console.log(id); // Thêm logic hiển thị comment của id phim
    const [comments, setComments] = useState([
        {
            id: crypto.randomUUID(),
            userName: "user1",
            email: "user1@gmail.com",
            content: "Phim hay lắm mọi người ơi",
            createdAt: "2024-08-16T23:00:33.010+02:00",
        },
        {
            id: crypto.randomUUID(),
            userName: "user2",
            email: "user2@gmail.com",
            content: "Xem mãi không thấy chán",
            createdAt: "2023-08-16T23:00:33.010+02:00",
        },
    ]);
    const [showModal, setShowModal] = useState(false);
    const [deletedCommentId, setDeletedCommentId] = useState("");
    const [modalContent, setModalContent] = useState("");

    return (
        <div className="flex">
            <SideBar className="flex-1" />
            <section className="flex-[4]">
                <h1 className="mt-10 bg-[#f4f6f9] px-2 py-2 text-3xl">
                    Quản lý phim
                </h1>
                <div className="mt-3 border border-[#00000020] p-4 shadow-sm shadow-[#00000033]">
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
                                    Email
                                </th>
                                <th className="min-w-32 border-b-2 border-b-[#dee2d6] p-3 align-bottom">
                                    Nội dung
                                </th>
                                <th className="min-w-32 border-b-2 border-b-[#dee2d6] p-3 align-bottom">
                                    Thời gian tạo
                                </th>
                                <th className="min-w-32 border-b-2 border-b-[#dee2d6] p-3 align-bottom">
                                    Chức năng
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {comments.map((comment, index) => (
                                <tr key={comment.id}>
                                    <td className="border-t-2 border-t-[#dee2d6] p-3 align-top">
                                        {index + 1}
                                    </td>
                                    <td className="min-w-32 border-t-2 border-t-[#dee2d6] p-3 align-top">
                                        {comment.userName}
                                    </td>
                                    <td className="min-w-32 border-t-2 border-t-[#dee2d6] p-3 align-top">
                                        {comment.email}
                                    </td>
                                    <td className="min-w-32 border-t-2 border-t-[#dee2d6] p-3 align-top">
                                        <p className="line-clamp-3">
                                            {comment.content}
                                        </p>
                                    </td>
                                    <td className="min-w-32 border-t-2 border-t-[#dee2d6] p-3 align-top">
                                        {new Date(
                                            comment.createdAt,
                                        ).toLocaleString()}
                                    </td>
                                    <td className="min-w-32 border-t-2 border-t-[#dee2d6] p-3 align-top">
                                        <a
                                            href="#!"
                                            className="ml-1 inline-block rounded-md bg-[#dc3545] p-2 text-white"
                                            onClick={() => {
                                                setShowModal(true);
                                                setDeletedCommentId(comment.id);
                                                setModalContent(
                                                    ` bình luận "${comment.content}"`,
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
                        deletedItemId={deletedCommentId}
                        listItem={comments}
                        setListItem={setComments}
                        content={modalContent}
                    />
                )}
            </section>
        </div>
    );
};
export default ManageComment;
