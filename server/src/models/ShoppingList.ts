import { Schema, model, Document } from 'mongoose';

export interface IShoppingList extends Document {
  name: string;
  user: Schema.Types.ObjectId;
  items: Schema.Types.ObjectId[];
  sharedWith: Schema.Types.ObjectId[];
  isArchived: boolean;
  color: string;
  reminderDate: Date;
  notes: string;
}

const ShoppingListSchema = new Schema<IShoppingList>(
  {
    name: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    sharedWith: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    isArchived: { type: Boolean, default: false },
    color: { type: String },
    reminderDate: { type: Date },
    notes: { type: String }
  },
  { timestamps: true }
);

export const ShoppingList = model<IShoppingList>('ShoppingList', ShoppingListSchema);
