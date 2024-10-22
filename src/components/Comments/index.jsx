import { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import {
    getComments as getCommentsApi,
    createComment as createCommentApi,
    updateComment as updateCommentApi,
    deleteComment as deleteCommentApi,
} from "@libs/api.js";
import Comment from "./Comment";

const Comments = () => {
    const [backendComments, setBackendComments] = useState([]);
    const [activeComment, setActiveComment] = useState(null);
    const rootComments = backendComments.filter(
        (backendComment) => backendComment.parentId === null,
    );

    const getReplies = (commentId) =>
        backendComments
            .filter((backendComment) => backendComment.parentId === commentId)
            .sort(
                (a, b) =>
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime(),
            );

    const addComment = (text, parentId) => {
        createCommentApi(text, parentId).then((comment) => {
            setBackendComments([comment, ...backendComments]);
            setActiveComment(null);
        });
    };

    const updateComment = (text, commentId) => {
        updateCommentApi(text).then(() => {
            const updatedBackendComments = backendComments.map(
                (backendComment) => {
                    if (backendComment.id === commentId) {
                        return { ...backendComment, body: text };
                    }
                    return backendComment;
                },
            );
            setBackendComments(updatedBackendComments);
            setActiveComment(null);
        });
    };

    const deleteComment = (commentId) => {
        if (window.confirm("Are you sure you want to remove comment?")) {
            deleteCommentApi().then(() => {
                const updatedBackendComments = backendComments.filter(
                    (backendComment) => backendComment.id !== commentId,
                );
                setBackendComments(updatedBackendComments);
            });
        }
    };

    useEffect(() => {
        getCommentsApi().then((data) => {
            setBackendComments(data);
        });
    }, []);

    return (
        <div className="mt-6 text-white">
            <h2 className="text-3xl font-medium">Danh sách bình luận</h2>
            <p className="mb-2 mt-3 text-xl">Để lại bình luận của bạn</p>

            <CommentForm handleSubmit={addComment} submitLabel="Bình luận" />

            <div className="mt-8">
                {(rootComments || []).map((rootComment) => (
                    <Comment
                        key={rootComment.id}
                        comment={rootComment}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                        replies={getReplies(rootComment.id)}
                        addComment={addComment}
                        updateComment={updateComment}
                        deleteComment={deleteComment}
                        currentUserId={"2"}
                    />
                ))}
            </div>
        </div>
    );
};
export default Comments;
