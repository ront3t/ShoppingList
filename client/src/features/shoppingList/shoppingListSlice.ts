import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';
import { IUser } from '../auth/authSlice';

interface Item {
  _id: string;
  name: string;
  quantity: number;
  purchased: boolean;
  category: string[];
  priority: 'low' | 'medium' | 'high';
  price: number;
  brand: string;
  expiryDate: Date;
  addedBy: string[];
}

interface ShoppingList {
  _id: string;
  name: string;
  user: IUser;
  items: Item[];
  sharedWith: string[];
  isArchived: boolean;
  color: string;
  reminderDate: Date;
  notes: string;
}

interface ShoppingListState {
  lists: ShoppingList[];
  loading: boolean;
  error: string | null;
}

const initialState: ShoppingListState = {
  lists: [],
  loading: false,
  error: null
};

export const fetchLists = createAsyncThunk<ShoppingList[]>(
  'shoppingList/fetchLists',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.get<ShoppingList[]>('/');
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch lists');
    }
  }
);

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLists.pending, (state) => {
        state.loading = true; 
        state.error = null;
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.loading = false;
        state.lists = action.payload;
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export default shoppingListSlice.reducer;
