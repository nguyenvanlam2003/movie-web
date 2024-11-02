import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { faFilm, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Spinner from "@/components/Spinner";
import CircularProgressBar from "@components/CircularProgressBar";
import { useModalContext } from "@context/ModalProvider";
import Comments from "@components/Comments";
import axios from "axios";

const MovieDetail = () => {
    const { id } = useParams();
    const [movieInfo, setMovieInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const { handlePlayTrailer } = useModalContext();

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
                const response = await axios.get(`http://localhost:8080/api/movies/${id}`);
                setMovieInfo(response.data)
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu người dùng:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMovie();
    }, [id]);
    return (
        <div className="min-h-[40vh] bg-[#06121d] px-5 py-3 lg:py-5">
            {isLoading ? (
                <Spinner />
            ) : (
                <div className="mx-auto max-w-screen-xl">
                    <div className="relative py-3">
                        <figure className="h-[480px] lg:h-[450px]">
                            <img
                                src={movieInfo.thumbUrl ? `http://localhost:8080/images/movies/${movieInfo.thumbUrl}` : "/img-placeholder.jpg"}
                                width={1280}
                                height={450}
                                className="h-full w-full object-cover brightness-50"
                            />
                        </figure>
                        <figure className="absolute left-5 top-5 h-[285px] w-[200px]">
                            <img
                                src={movieInfo.posterUrl ? `http://localhost:8080/images/movies/${movieInfo.posterUrl}` : "/img-placeholder.jpg"}
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
                                                movieInfo.voteAverage *
                                                10,
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
                                                key={genre.id}
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
                                <a
                                    href={`/watch/${movieInfo._id}`}
                                    className="flex h-10 items-center justify-center gap-2 rounded-full bg-[#ffb700] px-5 font-medium text-[#171c28]"
                                >
                                    <FontAwesomeIcon
                                        icon={faPlay}
                                        className="text-white"
                                    />
                                    Xem ngay
                                </a>
                                <button className="flex h-10 items-center justify-center gap-2 rounded-full bg-[#ff0000] px-5 text-base text-white">
                                    <img
                                        src="/heart.svg"
                                        alt=""
                                        className="invert"
                                    />
                                    Thêm vào yêu thích
                                </button>
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
                            {(movieInfo?.director || [])}
                        </p>
                        <p>
                            <span className="font-medium">Diễn viên:</span>{" "}
                            {(movieInfo?.actor || [])}
                        </p>
                    </div>

                    <Comments />
                </div>
            )}
        </div>
    );
};
export default MovieDetail;
