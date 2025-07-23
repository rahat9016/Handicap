"use client";

import CustomDialog from "@/components/share/dialog/CustomDialog";
import { getUserColumns } from "@/lib/constants/tableColumns";
import { rowValue } from "@/lib/redux/features/user/userSlice";
import { useAppDispatch } from "@/lib/redux/hooks";
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import EditUser from "./EditUser";
// import UserTable from "./UserTable";
import GenericTable from "@/components/share/table/GenericTable";
import TableHeading from "@/components/share/table/TableHeading";
import { EditDataProps } from "@/types/user/user.types";
import AddUser from "./AddUser";

const User = () => {
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [filtering, setFiltering] = useState("");
    const [columnVisibility, setColumnVisibility] = useState({});
    const dispatch = useAppDispatch();

    // const { isLoading, data: allUserData, refetch } = useUserData();

    // Define handleEdit function
    const handleEdit = (rowData: EditDataProps) => {
        dispatch(rowValue(rowData));
        setEditModalOpen(true);
    };

    // Get columns with handleEdit passed as a parameter
    const columns = getUserColumns(handleEdit);

    const table = useReactTable({
        data: [],
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
            <TableHeading name="User" />

            {/* <UserTable
                table={table}
                isLoading={isLoading}
                filtering={filtering}
                setFiltering={setFiltering}
                filterModalOpen={filterModalOpen}
                setFilterModalOpen={setFilterModalOpen}
                allUserData={allUserData}
                refetch={refetch}
            /> */}

            <GenericTable
                table={table}
                isLoading={false}
                filtering={filtering}
                setFiltering={setFiltering}
                filterModalOpen={filterModalOpen}
                setFilterModalOpen={setFilterModalOpen}
                tableData={[]}
                refetch={() => {}}
                buttonName="Add"
                headerName="Add User Information"
                userName="User"
                addComponent={<AddUser setOpen={setFilterModalOpen} refetch={() => {}} />}
            />

            <CustomDialog
                open={editModalOpen}
                onOpenChange={setEditModalOpen}
                title="User Information Edit"
            >
                <EditUser setEditModalOpen={setEditModalOpen} refetch={() => {}} />
            </CustomDialog>

        </div>

    );
};

export default User;