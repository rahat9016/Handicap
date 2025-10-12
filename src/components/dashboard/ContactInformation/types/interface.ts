export interface IContactPerson {
  name: string;
  designation: string;
}

export interface IContactEmail {
  type: string;
  email: string;
}

export interface IContactPhone {
  type: string;
  phone: string;
}

export interface IContactAddress {
  type: string;
  address: string;
}

export interface IUpdatedBy {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IContactInformation {
  id: number;
  contacts: IContactPerson[];
  emails: IContactEmail[];
  phones: IContactPhone[];
  addresses: IContactAddress[];
  officeHours: string;
  facebookUrl?: string | null;
  twitterUrl?: string | null;
  linkedinUrl?: string | null;
  websiteUrl?: string | null;
  mapEmbedUrl?: string | null;
  createdAt: string;
  updatedAt: string;
  updatedById?: number;
  updatedBy?: IUpdatedBy;
}
