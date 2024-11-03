import axios from 'axios';
const Modal = ({
    content = "",
    setShowModal,
    router,
    deleteId,
    token
}) => {
    const handleDeleteItem = async () => {
        // const newList = listItem.filter((movie) => {
        //     return movie.id !== deletedItemId;
        // });
        // setListItem(newList);
        // setShowModal(false);
        console.log(router, deleteId, token);

        try {
            const response = await axios.delete(
                `${router + deleteId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            );
            setShowModal(false);
            window.location.reload();
        } catch (error) {
            console.error("Error deleting genre:", error);
        }
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
                        onClick={() => handleDeleteItem(router, deleteId, token)}
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
