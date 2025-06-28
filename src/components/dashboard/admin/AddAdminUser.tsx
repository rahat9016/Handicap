import FormButton from "@/components/share/button/Formbutton";
import { Input } from "@/components/share/form";
import { usePost } from "@/hooks/usePost";
import { UserFormData, UserSchema } from "@/schemas/user/user";
import { IAddComponentProps } from "@/types/global/global.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";


export default function AddAdminUser({ setOpen, refetch }: IAddComponentProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UserFormData>({
        resolver: zodResolver(UserSchema),
    });

    const { mutate: userPost, isPending } = usePost("/users", (data) => {
        console.log("User Created:", data);
        refetch()
        reset();
        setOpen(false);
    });

    const onSubmit: SubmitHandler<UserFormData> = (data) => {
        userPost(data);
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid  grid-cols-2 gap-6">
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
                <Input
                    inputType="password"
                    labelName="Password"
                    placeholderText="Enter your password"
                    name="password"
                    errors={errors}
                    register={register}
                />
            </div>

            <div>
                <FormButton isPending={isPending} buttonText="Add User" />
            </div>

        </form>
    )
}
