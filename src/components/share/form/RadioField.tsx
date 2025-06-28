import { IRadioFieldProps } from "@/types/form/form.types";

export default function RadioField({
    labelName,
    inputName,
    errorMessage,
    register,
    isRequired,
    data,
    gridCols = 3,
}: IRadioFieldProps) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-black text-base pl-2 mb-1">
                {labelName}
                {isRequired && <span className="text-red-500"> *</span>}
            </label>
            <div className={`grid grid-cols-${gridCols}`}>
                {data.map((datum, index) => (
                    <label key={index} className="flex items-center justify-center gap-2 w-fit px-3">
                        <input
                            className="outline-none bg-greySecondary font-normal placeholder:text-textPrimary text-sm py-2.5 px-6 rounded-md w-full"
                            type="radio"
                            value={datum.valueId}
                            {...register(inputName)}
                        />
                        <span className="mb-1">{datum.valueLabel}</span>
                    </label>
                ))}
            </div>
            {errorMessage && <p className="text-red-500 text-sm mt-1 px-6">{errorMessage}</p>}
        </div>
    );
}