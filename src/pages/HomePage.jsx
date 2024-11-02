import FeatureMovies from "../components/FeatureMovies";
import MediaList from "@components/MediaList";
import axios from "axios";
import { useEffect, useState } from "react";

function HomePage() {
    const [movies, setMovies] = useState([]);
    const [filteredMovieSingles, setFilteredMovieSingles] = useState([]);
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
        // Lọc phim có type là "single"
        const filterSingle = movies.filter(movie => movie.type === "single");
        setFilteredMovieSingles(filterSingle); // Lưu danh sách phim đã lọc
        const fillterSeries = movies.filter(movie => movie.type === "series");
        setFilteredMovieSeries(fillterSeries)
        console.log("phim le ", filteredMovieSingles);

    }, [movies]);
    return (
        <div>
            <FeatureMovies />
            <MediaList movies={filteredMovieSingles} title={`Phim lẻ đề cử`} />
            <MediaList movies={filteredMovieSeries} title={`Phim bộ đề cử`} />
            {/* <MediaList tab={TABS[2]} />
            <MediaList tab={TABS[3]} /> */}
        </div>
    );
}

export default HomePage;
