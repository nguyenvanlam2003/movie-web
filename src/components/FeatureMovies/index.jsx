import { useEffect, useState } from "react";
import Movie from "./Movie";
import Spinner from "@components/Spinner";
import axios from "axios";

const FeatureMovies = () => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Gửi yêu cầu với Authorization header chứa JWT
                const response = await axios.get(
                    "http://localhost:8080/api/movies",
                );

                setMovies(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching Users:", error);
            } finally {
                () => setIsLoading(false);
            }
        };

        fetchUsers(); // Gọi hàm để lấy dữ liệu khi component mount
    }, []);
    return (
        <div className="bg-[#292e39]">
            {isLoading ? (
                <Spinner />
            ) : (
                <div className="relative hidden text-white md:block">
                    <Movie movies={movies} />
                </div>
            )}
        </div>
    );
};
export default FeatureMovies;
