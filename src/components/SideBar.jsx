import { faCircle, faFilm, faRightFromBracket, faTableList, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SideBar = () => {
    return (
        <aside className="fixed top-0 left-0 bottom-0 shadow-sm shadow-slate-700 bg-[#343a40] text-white px-10 py-2">
            <a href="#!">
                <h1 className="text-2xl font-bold uppercase text-red-500">MỌT PHIM</h1>
            </a>
            <div className="flex items-center gap-2 my-4 py-2 border border-t-[#4f5962] border-transparent border-b-[#4f5962]">
                <img
                    src="https://www.speak2university.com/assets/admin/dist/img/user-avatar.png"
                    className="w-8 h-8 rounded-full"
                    alt=""
                />
                <p className="text-xl">Admin</p>
            </div>
            <nav className="text-lg">
                <ul className="space-y-5">
                    <li>
                        <a href="#!" className="flex items-center gap-2">
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
                                <FontAwesomeIcon icon={faCircle} className="w-2 h-2" />
                                <a href="#!">Tài khoản Admin</a>
                            </li>
                            <li className="flex items-center gap-2 py-2">
                                <FontAwesomeIcon icon={faCircle} className="w-2 h-2" />
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
