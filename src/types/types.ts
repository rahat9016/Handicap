interface IContactPerson {
  name: string;
  designation: string;
}

interface IEmail {
  email: string;
  type: string;
}

interface IPhone {
  phone: string;
  type: string;
}

interface IAddress {
  address: string;
  type: string;
}

export interface IContactInfo {
  id: string | number;
  contacts: IContactPerson[];
  emails: IEmail[];
  phones: IPhone[];
  addresses: IAddress[];
  officeHours: string;
  facebookUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  websiteUrl: string;
  mapEmbedUrl: string;
}
