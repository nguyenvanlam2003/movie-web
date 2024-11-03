import MovieCard from "@components/MediaList/MovieCard";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const FavoriteList = () => {
    const [movieList, setMovieList] = useState([
        // {
        //     _id: "f6ec706c08a1f5eb01539dafdc14b4a3",
        //     name: "Deadpool và Wolverine",
        //     poster_url:
        //         "/upload/vod/20240728-1/201d7ad36c2f38804ea00636f5d793ee.jpg",
        //     year: 2024,
        //     time: "128 phút",
        //     type: "single",
        //     slug: "deadpool-va-wolverine",
        // },
        // {
        //     _id: "3e9e39fed3b8369ed940f52cf300cf88",
        //     name: "Avengers: Hồi Kết",
        //     poster_url:
        //         "/upload/vod/20231018-1/88c1ee81bbfcd39a73db1f83203b5501.jpg",
        //     year: 2019,
        //     time: "180 phút",
        //     type: "single",
        //     slug: "avengers-hoi-ket",
        // },
    ]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Hàm bất đồng bộ để lấy dữ liệu từ API
        const fetchFavoriteMovies = async () => {
            try {
                // Gửi yêu cầu GET để lấy danh sách phim yêu thích
                const response = await axios.get('http://localhost:8080/api/favoriteMovies', {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('accessToken')}` // Đảm bảo token đã được lưu trong localStorage
                    }
                });
                setMovieList(response.data.movieNames);
            } catch (err) {
                console.error("Error fetching favorite movies:", err);
                setError("Đã xảy ra lỗi khi lấy danh sách yêu thích!");
            } finally {
                setLoading(false); // Dừng trạng thái loading khi hoàn tất
            }
        };

        fetchFavoriteMovies();
    }, []);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    // const deleteFavoriteMovie = (id) => {
    //     // console.log(id);
    //     // const updatedMediaList = movieList.filter((movie) => {
    //     //     return movie._id !== id;
    //     // });
    //     // setMovieList(updatedMediaList);
    // };
    const deleteFavoriteMovie = async (id) => {
        try {
            // Gọi API xóa phim khỏi danh sách yêu thích
            const response = await axios.delete(`http://localhost:8080/api/favoriteMovies/deleteMovieId/${id}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('accessToken')}` // Đảm bảo token được lưu ở localStorage
                }
            });
            const updatedMediaList = movieList.filter((movie) => {
                return movie._id !== id;
            });
            setMovieList(updatedMediaList);

        } catch (error) {
            console.error("Error deleting favorite movie:", error);
            alert("Xóa phim không thành công!"); // Hiển thị thông báo lỗi cho người dùng
        }
    };
    return (
        <div className="bg-[#292e39] px-5 py-6 text-white lg:px-8 lg:py-10">
            <div className="mx-auto max-w-screen-2xl">
                <h1 className="mb-8 rounded-xl bg-red-500 py-4 text-center text-xl font-medium text-white">
                    Danh sách yêu thích
                </h1>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                    {movieList.map((movie) => (
                        <div key={movie._id} className="relative">
                            <MovieCard
                                name={movie.name}
                                posterUrl={movie.posterUrl ? `http://localhost:8080/images/movies/${movie.posterUrl}` : "/img-placeholder.jpg"}
                                year={movie.year}
                                time={movie.time}
                                type={movie.type}
                                slug={movie.slug}
                            />
                            <button
                                className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-[50%] bg-[#fd5465] hover:bg-[#f7941e]"
                                onClick={() => {
                                    deleteFavoriteMovie(movie?._id);
                                }}
                            >
                                <div className="h-1 w-4 rounded-sm bg-white"></div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default FavoriteList;
