import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import setAuthToken from "../utils/setAuthToken";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null
}

export const loadUser = createAsyncThunk(
    'auth/loadUser',
    async (_,{ rejectWithValue }) => {
  
      if(localStorage.token){
        setAuthToken(localStorage.token);
      }
  
      try {
        const res = await axios.get('http://localhost:5000/api/v1/auth/me');
        return res.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  )
  
  export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (newUser, { dispatch, rejectWithValue }) => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const body = JSON.stringify(newUser);
        const response = await axios.post(
          'http://localhost:5000/api/v1/auth/register',
          body,
          config
        );
        dispatch(loadUser(newUser));
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  
  export const loginUser = createAsyncThunk('auth/login', async ({ email, password }, { dispatch, rejectWithValue }) => {
    const body = { email, password };
  
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    try {
      const res = await axios.post('http://localhost:5000/api/v1/auth/login', body, config);
  
      dispatch(loadUser(res.data));
      console.log(body)
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  });




export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        logoutUser:(state, action) => {
            state.token = null;
            localStorage.removeItem('token');
            state.isAuthenticated = false;
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadUser.pending, (state) => {
                state.isLoading =true;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(loadUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                console.log(action.payload);
            })
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.token = localStorage.setItem('token', action.payload.token);
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                console.log(action.payload);
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.isLoading = false;
                state.user = action.payload;
                state.token = localStorage.setItem('token', action.payload.token);
            })
            .addCase(loginUser.rejected, (state) => {
                state.isAuthenticated = false;
                state.isLoading = false;
                state.user = null;
            })
    }
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;