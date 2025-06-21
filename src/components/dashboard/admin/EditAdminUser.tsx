import FormButton from "@/components/share/button/Formbutton";
import { Input } from "@/components/share/form";
import { usePatch } from "@/hooks/usePatch";
import { useAppSelector } from "@/lib/redux/hooks"
import { EditUserFormData, EditUserSchema } from "@/schemas/user/user";
import { IEditComponentProps } from "@/types/global/global.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

export default function EditAdminUser({ setEditModalOpen, refetch }: IEditComponentProps) {
    const { val: editData } = useAppSelector(state => state.user)

    const { id, name } = editData as { id: string; name: string };


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<EditUserFormData>({
        resolver: zodResolver(EditUserSchema),
    });

    const { mutate: updateUser, isPending } = usePatch(`/users/${id}`, (data) => {
        console.log("User Updated:", data);
        refetch();
        reset();
        setEditModalOpen(false);
    });

    const onSubmit: SubmitHandler<EditUserFormData> = (data) => {
        console.log("data:", data);

        updateUser(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid  grid-cols-2 gap-6">

                <Input
                    inputType="text"
                    labelName="Name"
                    placeholderText="Enter your name"
                    name="name"
                    defaultValue={name}
                    errors={errors}
                    register={register}
                />





            </div>
            <FormButton isPending={isPending} buttonText="Edit User" />
        </form>
    )
}
