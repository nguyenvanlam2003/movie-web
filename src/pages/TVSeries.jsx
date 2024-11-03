import MediaList from "@components/MediaList";
import { MEDIA_TABS } from "@libs/constants";
import axios from "axios";
import { useEffect, useState } from "react";

const TVSeries = () => {
    const [movies, setMovies] = useState([]);
    const [filteredMovieSeries, setFilteredMovieSeries] = useState([]);
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                // Gửi yêu cầu để lấy toàn bộ danh sách phim
                const response = await axios.get("http://localhost:8080/api/movies");
                setMovies(response.data); // Lưu toàn bộ danh sách phim
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies(); // Gọi hàm để lấy dữ liệu khi component mount
    }, []);
    useEffect(() => {
        const fillterSeries = movies.filter(movie => movie.type === "series");
        setFilteredMovieSeries(fillterSeries)

    }, [movies]);
    return (
        <div className="min-h-screen bg-[#292e39]">
            <MediaList movies={filteredMovieSeries} title={`Phim bộ`} />
        </div>
    );
};
export default TVSeries;
