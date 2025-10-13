export interface IResourceFile {
  id: number;
  title: string;
  description: string;
  filePath: string;
  fileType: string;
  fileSize: number;
  isActive: boolean;
  downloadCount: number;
  viewCount: number;
  language: {
    id: number;
    code: string;
    name: string;
    nativeName: string;
  };
}
