import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosClient from '../../api/axiosClient';

interface IUser {
  _id: string;
  name: string;
  email: string;
  shoppingLists: string[];
  profilePicture: string;
  preferences: {
    theme: 'light' | 'dark';
  };
  role: 'user' | 'admin';
}


/**
 * The Auth slice state:
 * - token: holds JWT or session token
 * - user: the authenticated user's data
 * - loading: indicates in-flight requests
 * - error: any error message
 */
interface AuthState {
  token: string | null;
  user: IUser | null;
  loading: boolean;
  error: string | null;
}

// Initial state for Auth
const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null
};

/**
 * Async thunk for logging in.
 * Sends { email, password } to /auth/login.
 * Expects { token, user } in response.
 */
export const loginUser = createAsyncThunk<
  { token: string; user: IUser },  // Return type on success
  { email: string; password: string }, // Argument type
  { rejectValue: string }              // Rejection value type
>(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.post<{ token: string; user: IUser }>(
        '/auth/login',
        credentials
      );
      return data; // { token, user }
    } catch (err: any) {
      // If backend sends a specific error message, capture it. Otherwise, use fallback.
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

/**
 * Async thunk for registering a new user.
 * Sends { name, email, password } to /auth/register.
 * Expects { token, user } in response.
 */
export const registerUser = createAsyncThunk<
  { token: string; user: IUser },
  { name: string; email: string; password: string },
  { rejectValue: string }
>(
  'auth/registerUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.post<{ token: string; user: IUser }>(
        '/auth/register',
        credentials
      );
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Registration failed');
    }
  }
);

/**
 * Create the auth slice with reducers and extraReducers handling the async thunks.
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Synchronous logout: clears token and user.
    logout(state) {
      state.token = null;
      state.user = null;
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Register
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

/**
 * Export the logout action for dispatching in components.
 * Export the reducer to include in your Redux store.
 */
export const { logout } = authSlice.actions;
export default authSlice.reducer;
