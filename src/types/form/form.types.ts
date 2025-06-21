/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormRegister, Control, UseFormResetField } from "react-hook-form";

export interface FieldError {
    message?: string;
}

export interface FormErrors {
    [key: string]: FieldError | undefined;
}

export interface FieldInfo {
    inputType: string;
    placeholderText: string;
    name: string;
    errors: FormErrors;
    labelName: string;
    register: UseFormRegister<any>;
    disabled?: boolean;
    isRequired?: boolean;
    defaultValue?: string;
}

export interface IOptions {
    valueId: string;
    valueLabel: string;
}

export interface IRadioFieldProps {
    labelName?: string;
    inputName: string;
    errorMessage?: string;
    register: UseFormRegister<any>;
    disabled?: boolean;
    isRequired?: boolean;
    defaultValue?: string;
    data: IOptions[];
    gridCols?: number;
}

export interface SelectFieldProps<T> {
    control: Control<any>;
    resetField: UseFormResetField<any>;
    name: string;
    data: T[];
    label: string;
    placeholder: string;
    error?: string;
    labelKey: keyof T;
    valueKey: keyof T;
    resetFieldName1: string;
    resetFieldName2: string;
    disabledValue?: string | number;
    makeDisable?: boolean;
    isLoading: boolean;
    onChange?: (value: string) => void;
    defaultValue?: T[keyof T];
}