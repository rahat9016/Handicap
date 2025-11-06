
export interface IDashboardStats {
  totalResources: {
    total: number;
    thisMonth: number;
    description: string;
  };
  totalDownloads: {
    total: number;
    thisMonth: number;
    description: string;
  };
  activeUsers: {
    total: number;
    thisWeek: number;
    description: string;
  };
  trainingCompletion: {
    total: number;
    thisMonth: number;
    description: string;
  };
  additionalStats: {
    totalUsers: number;
    totalCourses: number;
    totalOrganizations: number;
    totalCertificates: number;
  };
}


export interface ILanguageText {
  bn: string;
  en: string;
}

export interface IStatField {
  title: ILanguageText;
  value: ILanguageText;
}

export interface IDisabilityStats {
  id: number;
  field1?: IStatField;
  field2?: IStatField;
  field3?: IStatField;
  field4?: IStatField;
  field5?: IStatField;
}

