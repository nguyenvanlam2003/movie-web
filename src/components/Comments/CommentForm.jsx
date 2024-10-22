import { useState } from "react";

const CommentForm = ({
    handleSubmit,
    submitLabel,
    hasCancelButton = true,
    initialText = "",
    handleCancel,
}) => {
    const [text, setText] = useState(initialText);
    const isTextareaDisabled = text.length === 0;

    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit(text);
        setText("");
    };

    return (
        <form onSubmit={onSubmit} className="mt-1">
            <textarea
                name=""
                id=""
                value={text}
                className="h-16 w-full resize-none rounded-xl bg-white p-4 text-black"
                placeholder="Nhập bình luận"
                onChange={(e) => setText(e.target.value)}
            ></textarea>
            <div className="mt-1 flex gap-2">
                <button
                    className="flex h-9 w-[90px] items-center justify-center rounded-xl bg-[#0d6efd]"
                    disabled={isTextareaDisabled}
                >
                    {submitLabel}
                </button>
                {hasCancelButton && (
                    <button
                        className="flex h-9 w-[90px] items-center justify-center rounded-xl bg-[#6c757d]"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};
export default CommentForm;
