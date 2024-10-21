import CommentForm from "./CommentForm";

const Comment = ({
    comment,
    activeComment,
    setActiveComment,
    replies,
    addComment,
    updateComment,
    deleteComment,
    currentUserId,
    parentId = null,
}) => {
    const isReplying =
        activeComment?.id &&
        activeComment.id === comment.id &&
        activeComment.type === "replying";
    const isEditing =
        activeComment?.id &&
        activeComment.id === comment.id &&
        activeComment.type === "editing";
    const canReply = !!currentUserId;
    const canEdit = currentUserId === comment.userId;
    const canDelete = currentUserId === comment.userId && replies.length === 0;

    return (
        <div className="mb-6 flex gap-3">
            <img
                src="https://static.vecteezy.com/system/resources/previews/011/675/374/original/man-avatar-image-for-profile-png.png"
                alt=""
                className="h-14 w-14 rounded-[50%] object-cover"
            />
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <p className="text-lg font-medium">{comment.userName}</p>
                    <p>{new Date(comment.createdAt).toLocaleDateString()}</p>
                </div>
                {!isEditing && <p className="mt-1">{comment.body}</p>}
                {isEditing && (
                    <CommentForm
                        submitLabel="Cập nhật"
                        hasCancelButton
                        initialText={comment.body}
                        handleSubmit={(text) => updateComment(text, comment.id)}
                        handleCancel={() => setActiveComment(null)}
                    />
                )}
                <div className="flex gap-1">
                    {canReply && (
                        <p
                            className="mt-1 cursor-pointer px-1 text-[#0071dc] hover:underline"
                            onClick={() =>
                                setActiveComment({
                                    id: comment.id,
                                    type: "replying",
                                })
                            }
                        >
                            Trả lời
                        </p>
                    )}
                    {canEdit && (
                        <p
                            className="mt-1 cursor-pointer px-1 text-[#0071dc] hover:underline"
                            onClick={() =>
                                setActiveComment({
                                    id: comment.id,
                                    type: "editing",
                                })
                            }
                        >
                            Sửa
                        </p>
                    )}
                    {canDelete && (
                        <p
                            className="mt-1 cursor-pointer px-1 text-[#0071dc] hover:underline"
                            onClick={() => deleteComment(comment.id)}
                        >
                            Xóa
                        </p>
                    )}
                </div>

                {isReplying && (
                    <CommentForm
                        handleSubmit={(text) =>
                            addComment(text, parentId ? parentId : comment.id)
                        }
                        submitLabel="Bình luận"
                    />
                )}

                {/* Replies */}
                {replies.length > 0 && (
                    <div className="mt-5">
                        {replies.map((reply) => (
                            <Comment
                                key={reply.id}
                                comment={reply}
                                activeComment={activeComment}
                                setActiveComment={setActiveComment}
                                replies={[]}
                                addComment={addComment}
                                updateComment={updateComment}
                                deleteComment={deleteComment}
                                currentUserId={currentUserId}
                                parentId={comment.id}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
export default Comment;
