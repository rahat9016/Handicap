"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { IFilter } from "@/types/table/table.types";
import { MdAdd } from "react-icons/md";

export default function FilterTable({
    headerName,
    filtering,
    setFiltering,
    buttonName,
    children,
    open,
    setOpen,
    userName,
    usersNumber,
}: IFilter) {
    return (
        <section className="my-5 mx-2">
            <div className="flex justify-between items-center">
                <div>
                    <input
                        type="text"
                        placeholder="search .."
                        value={filtering || ""}
                        onChange={(e) => setFiltering(e.target.value)}
                        className="bg-background-light text-secondary text-sm placeholder:text-sm placeholder:text-secondary outline-none border border-border w-80 px-4 py-2.5 rounded-md"
                    />
                </div>
                {userName && usersNumber !== undefined && (
                    <p className="text-xl">
                        {userName} : <span className="font-semibold">{usersNumber}</span> users
                    </p>
                )}
                <div className="flex items-center gap-2">
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger>
                            <div className="bg-primary rounded-md text-base text-background-light font-medium px-8 py-2 border-4 flex justify-center items-center gap-2">
                                <MdAdd fontSize={20} />
                                {buttonName}
                            </div>
                        </DialogTrigger>
                        <DialogContent className="bg-background w-[80vw] max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>{headerName}</DialogTitle>
                            </DialogHeader>
                            {children}
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </section>
    );
};
