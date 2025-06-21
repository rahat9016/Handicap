
import FilterTable from "@/components/share/table/FilterTable";
import TableContent from "@/components/share/table/TableContent";
import TablePagination from "@/components/share/table/TablePagination";
import { IGenericTableProps } from "@/types/user/user.types";

const GenericTable = ({
    table,
    isLoading,
    filtering,
    setFiltering,
    filterModalOpen,
    setFilterModalOpen,
    tableData,
    // refetch,
    buttonName,
    headerName,
    userName,
    addComponent,

}: IGenericTableProps) => {
    return (
        <>
            <FilterTable
                filtering={filtering}
                setFiltering={setFiltering}
                data={tableData}
                table={table}
                buttonName={buttonName}
                headerName={headerName}
                open={filterModalOpen}
                setOpen={setFilterModalOpen}
                userName={userName}
                usersNumber={tableData?.length}
            >
                {addComponent}
            </FilterTable>

            {isLoading ? <div>Loading...</div> : <TableContent table={table} />}

            {!isLoading && <TablePagination table={table} />}
        </>
    );
};

export default GenericTable;