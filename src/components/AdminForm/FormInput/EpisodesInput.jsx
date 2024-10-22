import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";

const EpisodesInput = ({ onChange, control }) => {
    const [episodes, setEpisodes] = useState([
        // {
        //     name: "Tập 01",
        //     video: "https://s3.phim1280.tv/20240326/WqZirOhF/index.m3u8",
        // },
        // {
        //     name: "Tập 02",
        //     video: "https://s3.phim1280.tv/20240326/kYvE9gQE/index.m3u8",
        // },
    ]);

    const addEpisode = (e) => {
        e.preventDefault();
        setEpisodes([
            ...episodes,
            {
                name: "",
                video: "",
            },
        ]);
    };

    const handleRemoveEpisode = (key) => {
        const newEpisodes = episodes.filter((episode, index) => {
            return index !== key;
        });
        setEpisodes(newEpisodes);
    };

    const handleEpisodeChange = (index, field, value) => {
        const updatedEpisode = [...episodes];
        episodes[index][field] = value;
        setEpisodes(updatedEpisode);
    };

    const movieType = useWatch({ name: "type", control });

    useEffect(() => {
        if (movieType === "single") {
            setEpisodes([
                {
                    name: "",
                    video: "",
                },
            ]);
        }
        if (movieType === "series") {
            setEpisodes([
                // {
                //     name: "",
                //     video: "",
                // },
                ...episodes,
            ]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [movieType, JSON.stringify(episodes)]);

    return (
        <div
            onChange={() => {
                onChange(episodes);
            }}
        >
            {episodes.map((episode, index) => (
                <div
                    key={index}
                    className="relative border-b-2 border-t-2 border-[#e3e3e9] py-2"
                >
                    <div className="mb-3">
                        <label
                            htmlFor=""
                            className="mb-1 block font-bold"
                        >{`Tập ${index + 1}`}</label>
                        <input
                            type="text"
                            value={episode.name}
                            placeholder="Nhập tên của tập phim"
                            className="h-10 w-full rounded-lg border border-solid border-[#d2d1d6] px-3 focus:border-[#77dae6]"
                            onChange={(e) => {
                                handleEpisodeChange(
                                    index,
                                    "name",
                                    e.target.value,
                                );
                            }}
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor=""
                            className="mb-1 block font-bold"
                        >{`Video tập ${index + 1}`}</label>
                        <input
                            type="url"
                            value={episode.video}
                            placeholder="Nhập link video"
                            className="h-10 w-full rounded-lg border border-solid border-[#d2d1d6] px-3 focus:border-[#77dae6]"
                            onChange={(e) => {
                                handleEpisodeChange(
                                    index,
                                    "video",
                                    e.target.value,
                                );
                            }}
                        />
                    </div>
                    {index !== 0 && (
                        <div
                            className="absolute right-0 top-1 cursor-pointer"
                            onClick={() => handleRemoveEpisode(index)}
                        >
                            <FontAwesomeIcon
                                icon={faCircleXmark}
                                className="h-5 w-5"
                            />
                        </div>
                    )}
                </div>
            ))}
            {movieType === "series" && (
                <button
                    className="mt-2 rounded-lg bg-[#4e3698] px-3 py-2 text-white"
                    onClick={addEpisode}
                >
                    Thêm tập tiếp theo
                </button>
            )}
        </div>
    );
};
export default EpisodesInput;
