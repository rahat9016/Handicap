export interface User {
    id: string;
    name: string;
    email: string;
    image: string;
}

export interface Session {
    user: User;
}

export interface IMeta {
    limit: number;
    page: number;
    total: number;
}

export type IGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
    path: string | number;
    message: string;
};

export type ResponseSuccessType = {
    data: unknown;
    meta?: IMeta;
};
