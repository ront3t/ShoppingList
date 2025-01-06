import { Schema, model, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  description: string;
  icon: string;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    description: { type: String },
    icon: { type: String }
  },
  { timestamps: true }
);

export const Category = model<ICategory>('Category', CategorySchema);
