import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MdOutlineEdit } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";

interface IAdd {
    name: string;
}

export default function TooltipDiv({ name }: IAdd) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <label
                        htmlFor="show data"
                        className="cursor-pointer bg-[#FF7332] p-2 rounded-md"
                    >
                        {name === "Edit" && <MdOutlineEdit fontSize={16} color="#FFF" />}
                        {name === "View" && <IoEyeOutline fontSize={16} color="#FFF" />}
                    </label>
                </TooltipTrigger>
                <TooltipContent className="border border-[#FF7332]">
                    <p>{name}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
