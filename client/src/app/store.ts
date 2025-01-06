import { configureStore } from '@reduxjs/toolkit';

import shoppingListReducer from '../features/shoppingList/ShoppingListSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth:authReducer,
    shoppingList: shoppingListReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
