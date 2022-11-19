import { Document } from 'mongoose';
import { PublicFile } from 'src/files/schemas/public-file.schema';

export interface File {
  url: string;
  key: string;
}

export type FileDocument = PublicFile & Document;
