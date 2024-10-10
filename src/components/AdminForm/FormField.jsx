import { Controller } from "react-hook-form";

const FormField = ({ label, name, control, Component }) => {
    return (
        <div>
            <label htmlFor="" className="mb-1 block font-bold">
                {label}
            </label>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value, name } }) => {
                    return (
                        <Component
                            onChange={onChange}
                            value={value}
                            name={name}
                            control={control}
                        />
                    );
                }}
            />
        </div>
    );
};
export default FormField;
