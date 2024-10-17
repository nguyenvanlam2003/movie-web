import {
    faCircle,
    faFilm,
    faRightFromBracket,
    faTableList,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SideBar = () => {
    return (
        <aside className="min-h-screen bg-[#343a40] px-10 py-2 text-white shadow-sm shadow-slate-700">
            <a href="#!">
                <h1 className="text-2xl font-bold uppercase text-red-500">
                    MỌT PHIM
                </h1>
            </a>
            <div className="my-4 flex items-center gap-2 border border-transparent border-b-[#4f5962] border-t-[#4f5962] py-2">
                <img
                    src="https://www.speak2university.com/assets/admin/dist/img/user-avatar.png"
                    className="h-8 w-8 rounded-full"
                    alt=""
                />
                <p className="text-xl">Admin</p>
            </div>
            <nav className="text-lg">
                <ul className="space-y-5">
                    <li>
                        <a
                            href="/admin/movie"
                            className="flex items-center gap-2"
                        >
                            <FontAwesomeIcon icon={faFilm} />
                            <p>Quản lý phim</p>
                        </a>
                    </li>
                    <li>
                        <a href="#!" className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faTableList} />
                            <p>Quản lý thể loại</p>
                        </a>
                    </li>
                    <li>
                        <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faUser} />
                            <p>Quản lý tài khoản</p>
                        </div>
                        <ul className="ml-4">
                            <li className="flex items-center gap-2 py-2">
                                <FontAwesomeIcon
                                    icon={faCircle}
                                    className="h-2 w-2"
                                />
                                <a href="#!">Tài khoản Admin</a>
                            </li>
                            <li className="flex items-center gap-2 py-2">
                                <FontAwesomeIcon
                                    icon={faCircle}
                                    className="h-2 w-2"
                                />
                                <a href="#!">Tài khoản User</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#!" className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faRightFromBracket} />
                            <p>Đăng xuất</p>
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default SideBar;
