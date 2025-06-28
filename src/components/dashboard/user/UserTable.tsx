import { IUserTableProps } from "@/types/user/user.types";
import AddUser from "./AddUser";
import FilterTable from "@/components/share/table/FilterTable";
import TableContent from "@/components/share/table/TableContent";
import TablePagination from "@/components/share/table/TablePagination";

const UserTable = ({
    table,
    isLoading,
    filtering,
    setFiltering,
    filterModalOpen,
    setFilterModalOpen,
    allUserData,
    refetch,
}: IUserTableProps) => {
    return (
        <>
            <FilterTable
                filtering={filtering}
                setFiltering={setFiltering}
                data={allUserData}
                table={table}
                buttonName="Add"
                headerName="Add User Information"
                open={filterModalOpen}
                setOpen={setFilterModalOpen}
                userName="User"
                usersNumber={allUserData?.length}
            >
                <AddUser setOpen={setFilterModalOpen} refetch={refetch} />
            </FilterTable>

            {isLoading ? <div>Loading...</div> : <TableContent table={table} />}

            {!isLoading && <TablePagination table={table} />}
        </>
    );
};

export default UserTable;