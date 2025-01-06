import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  shoppingLists: Schema.Types.ObjectId[];
  profilePicture: string;
  preferences: {
    theme: string;
    language: string;
    notificationsEnabled: boolean;
  };
  role: 'user' | 'admin';
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    shoppingLists: [{ type: Schema.Types.ObjectId, ref: 'ShoppingList' }],
    profilePicture: { type: String },
    preferences: {
      theme: { type: String, default: 'light' },
      language: { type: String, default: 'en' },
      notificationsEnabled: { type: Boolean, default: true }
    }
  },
  { timestamps: true }
);

export const User = model<IUser>('User', UserSchema);
