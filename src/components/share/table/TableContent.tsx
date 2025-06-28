/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useState } from "react";
import { flexRender } from "@tanstack/react-table";
import { CiSearch } from "react-icons/ci";
import {
    TiArrowSortedDown,
    TiArrowSortedUp,
    TiArrowUnsorted,
} from "react-icons/ti";
import { ITable } from "@/types/table/table.types";

export default function TableContent({ table }: ITable) {
    const [selectedRows,] = useState<string[]>([]);
    return (
        <div className="rounded-md px-2">
            <div className="max-w-full overflow-x-auto">
                <table className="w-full border-2 border-[var(--color-secondary)]">
                    <thead>
                        {table
                            .getHeaderGroups()
                            .map((headerGroup: { id: string; headers: any[] }) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            className="p-4 bg-[var(--color-background-light)] border-r border-b border-[var(--color-secondary)]"
                                        >
                                            <div onClick={header.column.getToggleSortingHandler()}>
                                                <div className="flex items-center gap-2 justify-start cursor-pointer select-none">
                                                    <div className="text-base text-[var(--color-primary)]">
                                                        {flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                    </div>
                                                    {header.column.getCanSort() &&
                                                        (header.column.getIsSorted() === "asc" ? (
                                                            <TiArrowSortedUp className="inline" />
                                                        ) : header.column.getIsSorted() === "desc" ? (
                                                            <TiArrowSortedDown className="inline" />
                                                        ) : (
                                                            <TiArrowUnsorted className="inline" />
                                                        ))}
                                                </div>
                                            </div>
                                            {header.column.getCanFilter() ? (
                                                <div className="relative">
                                                    <CiSearch className="absolute text-xl top-3 left-2 text-[var(--color-accent)]" />
                                                    <input
                                                        type="text"
                                                        className="my-1 px-8 py-1 w-full column-filter bg-[var(--color-background-light)] border border-[var(--color-secondary)] outline-none rounded-md"
                                                        onChange={(e) =>
                                                            header.column.setFilterValue(e.target.value)
                                                        }
                                                    />
                                                </div>
                                            ) : null}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                    </thead>

                    <tbody>
                        {table
                            .getRowModel()
                            .rows.map(
                                (row: { id: string; getVisibleCells: () => any[] }, index: number) => (
                                    <tr
                                        key={row.id}
                                        className={`border border-[var(--color-secondary)] ${selectedRows.includes(row.id) ? "bg-[var(--color-accent)]" : ""} ${index % 2 === 1 ? "bg-[var(--color-background-light)]" : "bg-gray-50"}`}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <td
                                                key={cell.id}
                                                className="px-4 text-[var(--color-primary)] py-2 border-r border-[var(--color-secondary)]"
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                )
                            )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

