import mongoose from 'mongoose';
import { File } from 'src/types';

export interface Product {
  name: string;
  description: string;
  images: File[];
  price: number;
  store: mongoose.Schema.Types.ObjectId;
}

export type ProductDocument = Product & mongoose.Document;
