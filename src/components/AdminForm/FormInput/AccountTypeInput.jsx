const AccountTypeInput = ({ onChange, value }) => {
    return (
        <div className="flex gap-2 accent-black">
            <div className="flex gap-1">
                <input
                    type="radio"
                    name="isAdmin"
                    id="admin-type"
                    value={true}
                    // checked={value === true}
                    onChange={onChange}
                />
                <label htmlFor="admin-type">Admin</label>
            </div>
            <div className="flex gap-1">
                <input
                    type="radio"
                    name="isAdmin"
                    id="user-type"
                    value={false}
                    // checked={!value}
                    onChange={onChange}
                />
                <label htmlFor="user-type">User</label>
            </div>
        </div>
    );
};
export default AccountTypeInput;
