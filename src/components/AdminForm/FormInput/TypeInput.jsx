const TypeInput = ({ onChange, value }) => {
    return (
        <div className="flex gap-2 accent-black">
            <div className="flex gap-1">
                <input
                    type="radio"
                    name="movie-type"
                    id="single-type"
                    value="single"
                    checked={value === "single"}
                    onChange={onChange}
                />
                <label htmlFor="single-type">Phim lẻ</label>
            </div>
            <div className="flex gap-1">
                <input
                    type="radio"
                    name="movie-type"
                    id="series-type"
                    value="series"
                    checked={value === "series"}
                    onChange={onChange}
                />
                <label htmlFor="series-type">Phim bộ</label>
            </div>
        </div>
    );
};
export default TypeInput;
