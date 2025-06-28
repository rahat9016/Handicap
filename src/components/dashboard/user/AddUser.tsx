"use client"

import { Input } from "@/components/share/form";
import { UserFormData, UserSchema } from "@/schemas/user/user";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IAddComponentProps } from "@/types/global/global.types";
// import { employeeTypes, genderData } from "@/lib/constants/formData";

export default function AddUser({ setOpen, refetch }: IAddComponentProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        // resetField,
        // control,
    } = useForm<UserFormData>({
        resolver: zodResolver(UserSchema),
    });

    const onSubmit = (data: UserFormData) => {
        alert(JSON.stringify(data));
        setIsLoading(true);
        reset();
        refetch();
        setOpen(false);
        setIsLoading(false);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-6">
                    <Input
                        inputType="text"
                        labelName="Name"
                        placeholderText="Enter your name"
                        name="name"
                        errors={errors}
                        register={register}
                    />
                    <Input
                        inputType="email"
                        labelName="Email"
                        placeholderText="Enter your email"
                        name="email"
                        errors={errors}
                        register={register}
                    />
                    {/* <SelectField
                        control={control}
                        name="gender"
                        data={genderData}
                        label="Gender"
                        placeholder="-Select Gender-"
                        error={errors.gender?.message}
                        labelKey="label"
                        valueKey="value"
                        resetField={resetField}
                        resetFieldName1=""
                        resetFieldName2=""
                        disabledValue="1"
                        isLoading={false}
                    />
                    <RadioField
                        labelName="Employee Type"
                        inputName="employeeType"
                        errorMessage={errors?.employeeType?.message}
                        register={register}
                        data={employeeTypes}
                        gridCols={3}
                    /> */}
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#388E3C] text-bgPrimary text-sm font-medium px-8 py-3 rounded-md mt-6"
                >
                    {isLoading ? "Loading..." : "Add"}
                </button>
            </form>
        </div>
    )
}
