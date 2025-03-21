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
                const response = await axios.get(
                    "http://localhost:8080/api/movies",
                );
                setMovies(response?.data);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, [JSON.stringify(movies)]);
    useEffect(() => {
        const filterSingle = movies.filter((movie) => movie.type === "single");
        setFilteredMovieSingles(filterSingle);
        const fillterSeries = movies.filter((movie) => movie.type === "series");
        setFilteredMovieSeries(fillterSeries);
    }, [JSON.stringify(movies)]);
    return (
        <div>
            <FeatureMovies />
            <MediaList movies={filteredMovieSingles} title={`Phim lẻ đề cử`} />
            <MediaList movies={filteredMovieSeries} title={`Phim bộ đề cử`} />
        </div>
    );
}

export default HomePage;
