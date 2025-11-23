interface ILocalizedField {
  en: string;
  bn: string;
}

export interface IStatField {
  title: ILocalizedField;
  value: ILocalizedField;
}

export interface ILandingPageStats {
  id: number;
  field1?: IStatField;
  field2?: IStatField;
  field3?: IStatField;
  field4?: IStatField;
  field5?: IStatField;
  createdAt: string;
  updatedAt: string;
  updatedBy: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
}
