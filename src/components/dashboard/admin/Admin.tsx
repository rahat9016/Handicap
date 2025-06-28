"use client";
import GenericTable from "@/components/share/table/GenericTable";
import TableHeading from "@/components/share/table/TableHeading";
import { getAdminColumns } from "@/lib/constants/tableColumns";
import { rowValue } from "@/lib/redux/features/user/userSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import AddAdminUser from "./AddAdminUser";
import CustomDialog from "@/components/share/dialog/CustomDialog";
import EditAdminUser from "./EditAdminUser";
import { useGet } from "@/hooks/useGet";
import { EditDataProps } from "@/types/user/user.types";

export default function Admin() {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [filtering, setFiltering] = useState("");
    const [columnVisibility, setColumnVisibility] = useState({});
    const dispatch = useAppDispatch();

    const { isLoading, data: allAdminUserData, refetch } = useGet<[]>("/users", ["allUserAdminData"]);

    const handleEdit = (rowData: EditDataProps) => {
        dispatch(rowValue(rowData));
        setEditModalOpen(true);
    };

    const columns = getAdminColumns(handleEdit);
    const table = useReactTable({
        data: allAdminUserData ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            globalFilter: filtering,
            columnVisibility,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
        onColumnVisibilityChange: setColumnVisibility,
    });
    return (
        <div className="">
            <TableHeading name="Admin" />
            <GenericTable
                table={table}
                isLoading={isLoading}
                filtering={filtering}
                setFiltering={setFiltering}
                filterModalOpen={filterModalOpen}
                setFilterModalOpen={setFilterModalOpen}
                tableData={allAdminUserData ?? []}
                refetch={refetch}
                buttonName="Add"
                headerName="Add User Information"
                userName="User"
                addComponent={<AddAdminUser setOpen={setFilterModalOpen} refetch={refetch} />}
            />

            <CustomDialog
                open={editModalOpen}
                onOpenChange={setEditModalOpen}
                title="User Information Edit"
            >
                <EditAdminUser setEditModalOpen={setEditModalOpen} refetch={refetch} />
            </CustomDialog>
        </div>
    )
}