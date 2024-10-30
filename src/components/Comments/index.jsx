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
    const addComment = (text, parentId) => {
        createCommentApi(text, parentId, backendComments).then((comment) => {
            if (parentId) {
                const newComments = backendComments.map((backendComment) => {
                    if (backendComment.id === parentId) {
                        return {
                            ...backendComment,
                            replies: [...backendComment.replies, comment],
                        };
                    }
                    return backendComment;
                });
                setBackendComments(newComments);
            } else {
                setBackendComments([comment, ...backendComments]);
            }
            setActiveComment(null);
        });
    };

    const updateComment = (text, commentId, parentId = null) => {
        updateCommentApi(text).then(() => {
            if (parentId) {
                const rootComment = backendComments.find(
                    (backendComment) => backendComment.id === parentId,
                );
                rootComment.replies = rootComment.replies.map((comment) => {
                    if (comment.id === commentId) {
                        return { ...comment, content: text };
                    }
                    return comment;
                });
                setBackendComments(backendComments);
            } else {
                const updatedBackendComments = backendComments.map(
                    (backendComment) => {
                        if (backendComment.id === commentId) {
                            return { ...backendComment, content: text };
                        }
                        return backendComment;
                    },
                );
                setBackendComments(updatedBackendComments);
            }
            setActiveComment(null);
        });
    };

    const deleteComment = (commentId, parentId = null) => {
        if (window.confirm("Are you sure you want to remove comment?")) {
            deleteCommentApi().then(() => {
                if (parentId) {
                    const rootComment = backendComments.find(
                        (backendComment) => backendComment.id === parentId,
                    );
                    rootComment.replies = rootComment.replies.filter(
                        (comment) => comment.id !== commentId,
                    );
                    const updatedBackendComments = backendComments.map(
                        (backendComment) => {
                            if (backendComment.id === rootComment.id) {
                                return rootComment;
                            }
                            return backendComment;
                        },
                    );
                    setBackendComments(updatedBackendComments);
                } else {
                    const updatedBackendComments = backendComments.filter(
                        (backendComment) => backendComment.id !== commentId,
                    );
                    setBackendComments(updatedBackendComments);
                }
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
                {(backendComments || []).map((rootComment) => (
                    <Comment
                        key={rootComment.id}
                        comment={rootComment}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                        replies={rootComment?.replies}
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
