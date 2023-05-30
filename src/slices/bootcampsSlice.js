import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


const initialState = {
    bootcamps: [],
    loading: false,
    error: null
}

export const getBootcamps = createAsyncThunk('bootcamps/getBootcamps', async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/v1/bootcamps');
      return res.data.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  });

export const bootcampsSlice = createSlice({
    name: 'bootcamps',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getBootcamps.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(getBootcamps.fulfilled, (state, action) => {
            state.loading = false;
            state.bootcamps = action.payload;
            state.error = null;
        })
        .addCase(getBootcamps.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
});

export const {  } = bootcampsSlice.actions;

export default bootcampsSlice.reducer;