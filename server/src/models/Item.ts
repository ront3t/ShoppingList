import { Schema, model, Document } from 'mongoose';

export interface IItem extends Document {
  name: string;
  quantity: number;
  purchased: boolean;
  category: Schema.Types.ObjectId;
  priority: 'low' | 'medium' | 'high';
  price: number;
  brand: string;
  expiryDate: Date;
  addedBy: Schema.Types.ObjectId;
}

const ItemSchema = new Schema<IItem>(
  {
    name: { type: String, required: true },
    quantity: { type: Number, default: 1 },
    purchased: { type: Boolean, default: false },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    price: { type: Number, default: 0 },
    brand: { type: String },
    expiryDate: { type: Date },
    addedBy: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

export const Item = model<IItem>('Item', ItemSchema);
