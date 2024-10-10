import SideBar from "@components/SideBar";

const ManageMovie = () => {
    return (
        <div className="flex">
            <SideBar className="flex-1" />
            <section className="flex-[4]">
                <h1 className="mt-10 bg-[#f4f6f9] px-2 py-2 text-3xl">
                    Quản lý phim
                </h1>
                <div className="mt-3 border border-[#00000020] p-4 shadow-sm shadow-[#00000033]">
                    <div className="flex justify-between border border-transparent border-b-[#00000020] pb-6">
                        <form action="" className="flex items-center gap-1">
                            <div className="flex h-10 w-64 items-center rounded-lg border border-[#d2d1d6] px-3 focus-within:border-[#77dae6]">
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="Nhập từ khóa tìm kiếm"
                                    className="h-full w-full"
                                />
                            </div>
                            <button className="h-10 rounded-lg bg-[#007bff] px-2 text-white">
                                Tìm kiếm
                            </button>
                        </form>
                        <div className="flex gap-2">
                            <a
                                href="#!"
                                className="flex h-10 items-center justify-center rounded-lg bg-[#007bff] px-2 text-white"
                            >
                                Thêm mới
                            </a>
                            <a
                                href="#!"
                                className="flex h-10 items-center justify-center rounded-lg bg-[#dc3545] px-2 text-white"
                            >
                                Xóa
                            </a>
                        </div>
                    </div>

                    <table className="w-full border-collapse overflow-x-auto text-left">
                        <thead>
                            <tr>
                                <th className="min-w-32 border-b-2 border-b-[#dee2d6] p-3 align-bottom">
                                    <input type="checkbox" name="" id="" />
                                </th>
                                <th className="min-w-32 border-b-2 border-b-[#dee2d6] p-3 align-bottom">
                                    STT
                                </th>
                                <th className="min-w-32 border-b-2 border-b-[#dee2d6] p-3 align-bottom">
                                    Tên phim
                                </th>
                                <th className="min-w-32 border-b-2 border-b-[#dee2d6] p-3 align-bottom">
                                    Poster
                                </th>
                                <th className="min-w-32 border-b-2 border-b-[#dee2d6] p-3 align-bottom">
                                    Thời gian
                                </th>
                                <th className="min-w-32 border-b-2 border-b-[#dee2d6] p-3 align-bottom">
                                    Năm phát hành
                                </th>
                                <th className="min-w-32 border-b-2 border-b-[#dee2d6] p-3 align-bottom">
                                    Thể loại
                                </th>
                                <th className="min-w-32 border-b-2 border-b-[#dee2d6] p-3 align-bottom">
                                    Đạo diễn
                                </th>
                                <th className="min-w-32 border-b-2 border-b-[#dee2d6] p-3 align-bottom">
                                    Chức năng
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="min-w-32 border-t-2 border-t-[#dee2d6] p-3 align-top">
                                    <input type="checkbox" name="" id="" />
                                </td>
                                <td className="min-w-32 border-t-2 border-t-[#dee2d6] p-3 align-top">
                                    1
                                </td>
                                <td className="min-w-32 border-t-2 border-t-[#dee2d6] p-3 align-top">
                                    Avengers: Cuộc Chiến Vô Cực
                                </td>
                                <td className="min-w-32 border-t-2 border-t-[#dee2d6] p-3 align-top">
                                    <img
                                        src="https://phimimg.com/upload/vod/20231017-1/10f639784f3649266cb10a285280011a.jpg"
                                        alt=""
                                        className="h-32 w-32 object-cover"
                                    />
                                </td>
                                <td className="min-w-32 border-t-2 border-t-[#dee2d6] p-3 align-top">
                                    149 phút
                                </td>
                                <td className="min-w-32 border-t-2 border-t-[#dee2d6] p-3 align-top">
                                    2018
                                </td>
                                <td className="min-w-32 border-t-2 border-t-[#dee2d6] p-3 align-top">
                                    Phiêu lưu, Hành động, Khoa học
                                </td>
                                <td className="min-w-32 border-t-2 border-t-[#dee2d6] p-3 align-top">
                                    Anthony Russo
                                </td>
                                <td className="min-w-32 border-t-2 border-t-[#dee2d6] p-3 align-top">
                                    <a
                                        href="#!"
                                        className="rounded-md bg-[#007bff] p-2 text-white"
                                    >
                                        Sửa
                                    </a>
                                    <a
                                        href="#!"
                                        className="ml-1 inline-block rounded-md bg-[#dc3545] p-2 text-white"
                                    >
                                        Xóa
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td className="min-w-32 border-t-2 border-t-[#dee2d6] p-3 align-top">
                                    <input type="checkbox" name="" id="" />
                                </td>
                                <td className="min-w-32 border-t-2 border-t-[#dee2d6] p-3 align-top">
                                    2
                                </td>
                                <td className="min-w-32 border-t-2 border-t-[#dee2d6] p-3 align-top">
                                    Sự Trả Thù Của Nàng Bạch Tuyết
                                </td>
                                <td className="min-w-32 border-t-2 border-t-[#dee2d6] p-3 align-top">
                                    <img
                                        src="https://phimimg.com/upload/vod/20241003-1/97e19e6a4261278ddd5fa8f4da5c4e49.jpg"
                                        alt=""
                                        className="h-32 w-32 object-cover"
                                    />
                                </td>
                                <td className="min-w-32 border-t-2 border-t-[#dee2d6] p-3 align-top">
                                    33 phút/tập
                                </td>
                                <td className="min-w-32 border-t-2 border-t-[#dee2d6] p-3 align-top">
                                    2024
                                </td>
                                <td className="min-w-32 border-t-2 border-t-[#dee2d6] p-3 align-top">
                                    Chính kịch, Gia đình, Tình cảm, tâm lý
                                </td>
                                <td className="min-w-32 border-t-2 border-t-[#dee2d6] p-3 align-top">
                                    Choi Ji-young
                                </td>
                                <td className="min-w-32 border-t-2 border-t-[#dee2d6] p-3 align-top">
                                    <a
                                        href="#!"
                                        className="rounded-md bg-[#007bff] p-2 text-white"
                                    >
                                        Sửa
                                    </a>
                                    <a
                                        href="#!"
                                        className="ml-1 inline-block rounded-md bg-[#dc3545] p-2 text-white"
                                    >
                                        Xóa
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};
export default ManageMovie;
