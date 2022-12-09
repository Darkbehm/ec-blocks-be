import mongoose from 'mongoose';

export interface Page {
  name: string;
  store: mongoose.Schema.Types.ObjectId;
  blocks: Block[];
}

export interface Block {
  name: string;
  color: string;
  cssCode?: string;
  htmlCode?: string;
  jsCode?: string;
  components?: any[];
}

export type PageDocument = Page & mongoose.Document;
