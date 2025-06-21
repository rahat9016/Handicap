import { TableHeadingProps } from "@/types/table/table.types";

export default function TableHeading({ name }: TableHeadingProps) {
    return (
        <p className="underline text-5xl font-bold text-sky-900">{name}</p>
    )
}
