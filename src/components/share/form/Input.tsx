import { FieldInfo } from "@/types/form/form.types";

export default function Input({
    labelName,
    inputType,
    placeholderText,
    name,
    errors,
    register,
    disabled,
    defaultValue,
    isRequired,
}: FieldInfo) {
    return (
        <div className="lg:px-3">
            <label className="text-[#2D0C3E] text-basic pl-2 mb-1">
                {labelName}
                {isRequired && <span className="text-red-500"> *</span>}
            </label>
            <input
                className="block outline-none placeholder:text-[#afacac] text-base py-2 pl-6 border-2 border-[#D4D4D4] rounded-md w-full"
                type={inputType}
                placeholder={placeholderText}
                defaultValue={defaultValue}
                {...register(name)}
                disabled={disabled}
            />
            {errors[name] && (
                <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
            )}
        </div>
    );
}