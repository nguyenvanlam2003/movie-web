import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { faClose, faFilm, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "@/components/Spinner";
import CircularProgressBar from "@components/CircularProgressBar";
import { useModalContext } from "@context/ModalProvider";
import Comments from "@components/Comments";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import Toast from "@components/Toast/Toast";
import { showSuccessToast } from "@components/Toast/Toast";

const MovieDetail = () => {
    const { id } = useParams();
    const [movieInfo, setMovieInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState("");
    const [isShowModal, setIsShowModal] = useState(false);
    const { handlePlayTrailer } = useModalContext();
    const token = Cookies.get("accessToken");
    // useEffect(() => {
    //     setIsLoading(true);
    //     fetch(`${import.meta.env.VITE_API_HOST}/phim/${slug}`)
    //         .then(async (res) => {
    //             const data = await res.json();
    //             document.title = data.movie.name;
    //             setMovieInfo(data.movie);
    //         })
    //         .catch((err) => console.error(err))
    //         .finally(() => {
    //             setIsLoading(false);
    //         });
    // }, [slug]);
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/movies/${id}`,
                );
                setMovieInfo(response.data);
                if (token) {
                    const decodedToken = jwt_decode(token);
                    setUserId(decodedToken.id);
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu người dùng:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMovie();
    }, [id]);
    const handleAddFavoriteMovie = async (movieIds) => {
        try {
            // Kiểm tra nếu không có token
            if (!token) {
                throw new Error(
                    "Token không tồn tại hoặc người dùng chưa đăng nhập",
                );
            }

            // Gửi yêu cầu POST lên server
            const response = await axios.post(
                "http://localhost:8080/api/favoriteMovies",
                { movieIds }, // Body request chứa movieIds
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Gửi token trong header để xác thực
                    },
                },
            );

            // Xử lý phản hồi từ server
            if (response.status === 201 || response.status === 200) {
                const { userName, movieNames } = response.data;
                console.log(`Người dùng: ${userName}`);
                console.log(
                    "Danh sách phim yêu thích đã cập nhật:",
                    movieNames,
                );
                showSuccessToast(
                    "Thành công",
                    "Bạn đã thêm phim vào danh sách yêu thích",
                );
            }
        } catch (error) {
            console.error("Lỗi khi thêm phim vào danh sách yêu thích:", error);

            // Xử lý các lỗi cụ thể nếu cần, ví dụ:
            if (error.response) {
                if (error.response.status === 400) {
                    console.error("Phim này đã có trong danh sách yêu thích.");
                } else if (error.response.status === 403) {
                    console.error(
                        "Bạn không có quyền thêm phim vào danh sách.",
                    );
                } else if (error.response.status === 500) {
                    console.error("Lỗi máy chủ.");
                }
            }

            // Trả về thông tin lỗi
            return { success: false, error };
        }
    };
    const [commentLoaded, setcommentLoaded] = useState(false);
    console.log("commentLoaded", commentLoaded);
    const handleSidebarLoadComplete = () => {
        setcommentLoaded(true); // Cập nhật trạng thái khi sidebar đã tải xong
    };

    // const [hasPaid, setHasPaid] = useState(false);

    // Kiểm tra thanh toán khi tải trang
    // useEffect(() => {
    //     const checkPaymentStatus = async () => {
    //         if (!token) return;

    //         try {
    //             const decodedToken = jwt_decode(token);
    //             setUserId(decodedToken.id);

    //             const response = await axios.get(
    //                 `http://localhost:8080/api/payment-status/${decodedToken.id}`,
    //             );

    //             setHasPaid(response.data.paid);
    //         } catch (error) {
    //             console.error("Lỗi khi kiểm tra thanh toán:", error);
    //         }
    //     };

    //     checkPaymentStatus();
    // }, [token]); // Chỉ chạy lại nếu token thay đổi

    // // Xử lý sự kiện khi bấm "Xem Ngay"
    // const handleWatchMovie = () => {
    //     if (hasPaid) {
    //         window.location.href = `/watch/${movieInfo._id}`;
    //     } else {
    //         window.location.href = `/payment`;
    //     }
    // };

    const handleWatchMovie = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/payment/payment-status/${userId}`,
            );
            console.log("Kết quả kiểm tra thanh toán:", response.data);
            if (response.data.paid) {
                window.location.href = `/watch/${movieInfo._id}`;
            } else {
                // window.location.href = `/payment`;
                // setIsShowModal(true);
                showPaymentModal();
            }
        } catch (error) {
            console.error("Lỗi khi kiểm tra thanh toán:", error);
            // window.location.href = `/payment`;
            // setIsShowModal(true);
            showPaymentModal();
        }
    };

    const handlePayment = async () => {
        if (!userId) {
            alert("Vui lòng đăng nhập!");
            return;
        }

        setIsLoading(true);
        try {
            const { data } = await axios.post(
                "http://localhost:8080/api/payment/create_payment",
                { userId },
            );
            window.open(data.paymentUrl, "_blank");
        } catch (error) {
            if (error.response?.data?.message) {
                alert(error.response.data.message);
            } else {
                alert("Lỗi kết nối!");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const showPaymentModal = () => {
        document.documentElement.style.overflow = "hidden";
        setIsShowModal(true);
    };

    const hidePaymentModal = () => {
        document.documentElement.style.overflow = "auto";
        setIsShowModal(false);
    };

    return (
        <div className="min-h-[40vh] bg-[#06121d] px-5 py-3 lg:py-5">
            {isLoading ? (
                <Spinner />
            ) : (
                <div className="mx-auto max-w-screen-xl">
                    <div className="relative py-3">
                        <figure className="h-[480px] lg:h-[450px]">
                            <img
                                src={
                                    movieInfo.thumbUrl
                                        ? `http://localhost:8080/images/movies/${movieInfo.thumbUrl}`
                                        : "/img-placeholder.jpg"
                                }
                                width={1280}
                                height={450}
                                className="h-full w-full object-cover brightness-50"
                            />
                        </figure>
                        <figure className="absolute left-5 top-5 h-[285px] w-[200px]">
                            <img
                                src={
                                    movieInfo.posterUrl
                                        ? `http://localhost:8080/images/movies/${movieInfo.posterUrl}`
                                        : "/img-placeholder.jpg"
                                }
                                width={200}
                                height={285}
                                className="h-full w-full object-cover"
                            />
                        </figure>
                        <div className="absolute bottom-5 left-5 sm:bottom-6 md:bottom-7 lg:bottom-9">
                            <div className="flex items-center gap-[10px]">
                                {movieInfo.voteAverage ? (
                                    <div className="flex items-center gap-1">
                                        <CircularProgressBar
                                            percent={Math.round(
                                                movieInfo.voteAverage * 10,
                                            )}
                                        />
                                        <span className="text-white">
                                            Rating
                                        </span>
                                    </div>
                                ) : null}
                                <ul className="flex flex-wrap gap-2">
                                    {(movieInfo.genres || [])
                                        .slice(0, 3)
                                        .map((genre) => (
                                            <li
                                                key={genre._id}
                                                className="rounded-lg bg-white p-[6px] text-sm font-medium text-black"
                                            >
                                                {genre.nameGenre}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                            <div className="left-5 mt-2 flex flex-wrap items-center gap-2 sm:mt-3">
                                <button
                                    className="flex h-10 items-center justify-center gap-2 rounded-full bg-black px-3 font-medium text-white"
                                    onClick={() => {
                                        handlePlayTrailer(
                                            movieInfo?.trailerKey,
                                        );
                                    }}
                                >
                                    <FontAwesomeIcon icon={faFilm} />
                                    Xem Trailer
                                </button>
                                {userId && (
                                    <button
                                        // href={`/watch/${movieInfo._id}`}
                                        onClick={handleWatchMovie}
                                        className="flex h-10 items-center justify-center gap-2 rounded-full bg-[#ffb700] px-5 font-medium text-[#171c28]"
                                    >
                                        <FontAwesomeIcon
                                            icon={faPlay}
                                            className="text-white"
                                        />
                                        Xem ngay
                                    </button>
                                )}
                                {userId && (
                                    <button
                                        className="flex h-10 items-center justify-center gap-2 rounded-full bg-[#ff0000] px-5 text-base text-white"
                                        onClick={() =>
                                            handleAddFavoriteMovie([id])
                                        }
                                    >
                                        <img
                                            src="/heart.svg"
                                            alt=""
                                            className="invert"
                                        />
                                        Thêm vào yêu thích
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 space-y-2 text-base text-white lg:text-lg">
                        <h1 className="text-3xl font-bold lg:text-4xl">
                            {movieInfo?.originName}
                        </h1>
                        <p>
                            <span className="font-medium">Thời gian:</span>{" "}
                            {movieInfo?.time}
                        </p>
                        <p>
                            <span className="font-medium">Năm phát hành:</span>{" "}
                            {movieInfo?.year}
                        </p>
                        <p>
                            <span className="font-medium">Thể loại:</span>{" "}
                            {(movieInfo?.genres || [])
                                .map((genre) => genre.nameGenre)
                                .join(", ")}
                        </p>
                        <p>
                            <span className="font-medium">Nội dung:</span>{" "}
                            {movieInfo?.content}
                        </p>
                        <p>
                            <span className="font-medium">Đạo diễn:</span>{" "}
                            {movieInfo?.director || []}
                        </p>
                        <p>
                            <span className="font-medium">Diễn viên:</span>{" "}
                            {movieInfo?.actor || []}
                        </p>
                    </div>

                    <Comments
                        movieId={movieInfo._id}
                        userId={userId}
                        onLoadComplete={handleSidebarLoadComplete}
                    />

                    <Toast />

                    {isShowModal && (
                        <div className="fixed inset-0 flex items-center justify-center">
                            <div className="absolute z-[99] overflow-hidden rounded-lg bg-white text-black shadow-lg">
                                <div className="flex">
                                    <div className="p-7">
                                        <div className="flex items-center gap-5">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-[50%] bg-black text-center">
                                                <h1 className="text-xs font-bold uppercase text-red-500">
                                                    Mọt chill
                                                </h1>
                                            </div>
                                            <h2 className="text-lg font-semibold text-[#2c2c2c]">
                                                Tài khoản Mọt chill Pro
                                            </h2>
                                        </div>
                                        <div>
                                            <p className="mt-8 text-sm font-semibold">
                                                Bạn nhận được gì khi sở hữu tài
                                                khoản Pro?
                                            </p>
                                            <ul className="ml-5 mt-2 list-disc text-sm">
                                                <li>
                                                    Xem phim với chất lượng, tốc
                                                    độ cao nhất
                                                </li>
                                                <li>
                                                    Tận hưởng tất cả nội dung
                                                    phim mới nhất của chúng tôi
                                                </li>
                                                <li>
                                                    Bạn sẽ được nhiều hơn với số
                                                    tiền bỏ ra!
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="relative min-w-72 flex-shrink-0 bg-[#f5f5f5] p-7">
                                        <h3 className="my-2 font-semibold">
                                            Chi tiết thanh toán
                                        </h3>
                                        <div className="mt-2 h-[1px] bg-[#d5d5d5]"></div>
                                        <p className="mt-2 text-sm font-semibold text-[#2e3441]">
                                            Tài khoản Mọt chill Pro
                                        </p>
                                        <ul className="ml-4 mt-2 space-y-1 text-sm">
                                            <li className="flex justify-between">
                                                <span>Giá gốc</span>
                                                <span className="line-through">
                                                    499.000đ
                                                </span>
                                            </li>
                                            <li className="flex justify-between">
                                                <span>Giá ưu đãi hôm nay</span>
                                                <span>200.000đ</span>
                                            </li>
                                        </ul>
                                        <div className="mt-2 h-[1px] bg-[#d5d5d5]"></div>
                                        <div className="mt-4 flex justify-between">
                                            <span className="font-semibold text-[#2e3441]">
                                                TỔNG
                                            </span>
                                            <span className="font-semibold text-[#2e3441]">
                                                200.000đ
                                            </span>
                                        </div>
                                        <button
                                            onClick={handlePayment}
                                            disabled={isLoading}
                                            className="ml-auto mt-5 flex cursor-pointer items-center justify-center rounded-full bg-[#0265dc] px-6 py-2 text-sm font-semibold text-white hover:opacity-90"
                                        >
                                            {isLoading
                                                ? "Đang xử lý..."
                                                : "Tiếp tục thanh toán"}
                                        </button>
                                        <button
                                            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-[50%] bg-[#16182314] text-[#4c4c4c] opacity-80 transition-opacity hover:opacity-100"
                                            onClick={hidePaymentModal}
                                        >
                                            <FontAwesomeIcon icon={faClose} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="absolute inset-0 bg-[#0009]"
                                onClick={hidePaymentModal}
                            ></div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
export default MovieDetail;
