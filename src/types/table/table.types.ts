/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";

export interface IFilter {
    headerName: string;
    filtering: string;
    setFiltering: React.Dispatch<React.SetStateAction<string>>;
    table: object;
    data: [];
    children: ReactNode;
    buttonName: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    userName?: string;
    usersNumber?: number;
}

export interface ITable {
    table: any;
};

export interface TableHeadingProps {
    name: string;
}
