const GENRES = [
    {
        id: "37a7b38b6184a5ebd3c43015aa20709d",
        name: "Chính Kịch",
        slug: "chinh-kich",
    },
    {
        id: "ba6fd52e5a3aca80eaaf1a3b50a182db",
        name: "Hài Hước",
        slug: "hai-huoc",
    },
    {
        id: "46a6df48b64935df845cf8ad4f448d4c",
        name: "Tình Cảm",
        slug: "tinh-cam",
    },
    {
        id: "1a18f0d42e4e66060dbf1fd7cb25d11a",
        name: "Tâm Lý",
        slug: "tam-ly",
    },
];

const GenresInput = ({
    onChange,
    value = ["37a7b38b6184a5ebd3c43015aa20709d"],
}) => {
    return (
        <div className="flex flex-wrap gap-2">
            {GENRES.map((genre) => (
                <div key={genre.id}>
                    {/* <input
                type="checkbox"
                id={genre.slug}
                value={genre.slug}
                name="genres"
            />
            <label
                htmlFor={genre.slug}
                className="ml-1"
            >
                {genre.name}
            </label> */}
                    <p
                        className={`cursor-pointer rounded-md border px-2 py-1 ${value.includes(genre.id) ? "bg-black text-white" : ""}`}
                        onClick={() => {
                            let currentValue = [...value];
                            if (value.includes(genre.id)) {
                                currentValue = currentValue.filter(
                                    (g) => g !== genre.id,
                                );
                            } else {
                                currentValue = [...value, genre.id];
                            }
                            onChange(currentValue);
                        }}
                    >
                        {genre.name}
                    </p>
                </div>
            ))}
        </div>
    );
};
export default GenresInput;
