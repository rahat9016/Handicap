export interface IResourceUpdate {
  id: number | undefined;
  title: string | undefined;
  titleBn: string | undefined;
  description: string | undefined;
  descriptionBn: string | undefined;
  organization: number | undefined;
  isPrivate: boolean | undefined;
  languageId: number | undefined;
  categoryId: number | undefined;
  keywordIds: number[] | undefined;
}
interface Language {
  id: number;
  code: string;
  name: string;
  nativeName: string;
}

export interface IFileResource {
  filePath: string;
  id: number;
  title: string;
  description: string;
  language: Language;
  fileType: string;
  fileSize: number;
  isActive: boolean;
  downloadCount: number;
  viewCount: number;
}