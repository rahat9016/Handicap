/* eslint-disable @typescript-eslint/no-explicit-any */

import {
    BsFillSkipBackwardFill,
    BsFillSkipEndFill,
    BsFillSkipForwardFill,
    BsFillSkipStartFill,
} from "react-icons/bs";


export default function TablePagination({ table }: any) {
    const pageIndex = table.getState().pagination.pageIndex;
    const pageCount = table.getPageCount();
    return (
        <div className="">
            {table?.getRowModel().rows?.length > 0 && (
                <div className="mx-2 flex flex-col items-center justify-between pagination-container p-4 gap-4 md:flex-row bg-background-light border-b-2 border-x-2 border-border">
                    <div className="flex items-center gap-4">
                        <p className="text-base text-secondary">Show:</p>
                        <select
                            className="w-16 px-1 py-2 border border-border bg-background !outline-none"
                            value={table.getState().pagination.pageSize}
                            onChange={(e) => {
                                table.setPageSize(Number(e.target.value));
                            }}
                        >
                            {[5, 10].map((pageSize) => (
                                <option
                                    className="text-base text-secondary"
                                    key={pageSize}
                                    value={pageSize}
                                >
                                    {pageSize}
                                </option>
                            ))}
                            <option value={table.getCoreRowModel().rows.length}>
                                All show
                            </option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="text-base text-secondary">Go to page:</p>
                        <input
                            type="number"
                            min={1}
                            max={pageCount}
                            defaultValue={pageIndex + 1}
                            onChange={(e) => {
                                const newPage = e.target.value ? Number(e.target.value) - 1 : 0;
                                if (newPage >= 0 && newPage < pageCount) {
                                    table.setPageIndex(newPage);
                                }
                            }}
                            className="border border-border p-1 w-16 !outline-none"
                        />
                    </div>

                    <div className="flex gap-2">
                        <button
                            disabled={!table.getCanPreviousPage()}
                            onClick={() => table.setPageIndex(0)}
                            className="disabled:opacity-25 disabled:cursor-not-allowed text-xl rounded-full p-2 bg-primary"
                        >
                            <BsFillSkipBackwardFill fontSize={18} className="text-white" />
                        </button>

                        <button
                            disabled={!table.getCanPreviousPage()}
                            onClick={() => table.previousPage()}
                            className="disabled:opacity-25 disabled:cursor-not-allowed text-xl rounded-full p-2 bg-primary"
                        >
                            <BsFillSkipStartFill fontSize={18} className="text-white" />
                        </button>

                        <button
                            disabled={!table.getCanNextPage()}
                            onClick={() => table.nextPage()}
                            className="disabled:opacity-25 disabled:cursor-not-allowed text-xl rounded-full p-2 bg-primary"
                        >
                            <BsFillSkipEndFill fontSize={18} className="text-white" />
                        </button>

                        <button
                            disabled={!table.getCanNextPage()}
                            onClick={() => table.setPageIndex(pageCount - 1)}
                            className="disabled:opacity-25 disabled:cursor-not-allowed text-xl rounded-full p-2 bg-primary"
                        >
                            <BsFillSkipForwardFill fontSize={18} className="text-white" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
