export type FileStatus = 'processing' | 'ready' | 'failed';

export interface Document {
  id: string;
  name: string;
  size: number;
  type: string;
  status: FileStatus;
  createdAt: string;
  updatedAt: string;
}

export interface UploadFile {
  file: File;
  id: string;
  progress: number;
  status: FileStatus;
  error?: string;
}