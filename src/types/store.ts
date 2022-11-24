import mongoose from 'mongoose';
import { File } from 'src/types';

export interface Store {
  owner: mongoose.Schema.Types.ObjectId;
  tittle: string;
  description: string;
  keyWords: string[];
  favIcon: File;
  logo: File;
  globalCss: string;
  globalJs: string;
  images: File[];
  videos: File[];
  files: File[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  isDeleted: boolean;
}

export type StoreDocument = Store & mongoose.Document;
