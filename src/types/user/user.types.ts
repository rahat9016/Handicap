


export interface IUserTableProps {
    table: object;
    isLoading: boolean;
    filtering: string;
    setFiltering: React.Dispatch<React.SetStateAction<string>>;
    filterModalOpen: boolean;
    setFilterModalOpen: (value: boolean) => void;
    allUserData: [];
    refetch: () => void;
}

export interface IGenericTableProps {
    table: object;
    isLoading: boolean;
    filtering: string;
    setFiltering: React.Dispatch<React.SetStateAction<string>>;
    filterModalOpen: boolean;
    setFilterModalOpen: (value: boolean) => void;
    tableData: [];
    refetch: () => void;
    buttonName: string;
    headerName: string;
    userName: string;
    addComponent: React.ReactNode;
}



export interface EditDataProps {
    name: string;
}

// export interface IFilter {
//     headerName: string;
//     filtering: string;
//     setFiltering: React.Dispatch<React.SetStateAction<string>>;
//     table: object;
//     data: [];
//     children: ReactNode;
//     buttonName: string;
//     open: boolean;
//     setOpen: (open: boolean) => void;
//     userName?: string;
//     usersNumber?: number;
// }