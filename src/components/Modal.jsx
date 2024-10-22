const Modal = ({
    content = "",
    setShowModal,
    listItem,
    setListItem,
    deletedItemId,
}) => {
    const handleDeleteItem = (deletedItemId) => {
        const newList = listItem.filter((movie) => {
            return movie.id !== deletedItemId;
        });
        setListItem(newList);
        setShowModal(false);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="z-[99] w-[400px] rounded-3xl bg-white py-8 pl-8 pr-3 shadow-sm">
                <div>
                    <p className="text-lg">
                        {`Bạn có chắc chắn muốn xóa ${content} không?`}
                    </p>
                </div>
                <div className="mt-10 flex flex-wrap items-center justify-end gap-5 pr-3">
                    <button
                        className="flex h-10 items-center justify-center rounded-md border border-solid border-slate-400 px-6 font-medium"
                        onClick={() => setShowModal(false)}
                    >
                        Hủy
                    </button>
                    <button
                        className="flex h-10 items-center justify-center rounded-md bg-[#ed4337] px-6 font-medium text-white"
                        onClick={() => handleDeleteItem(deletedItemId)}
                    >
                        Xóa
                    </button>
                </div>
            </div>
            <div className="absolute inset-0 bg-[#0006]"></div>
        </div>
    );
};
export default Modal;
