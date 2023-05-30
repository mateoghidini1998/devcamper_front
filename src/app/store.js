import { configureStore } from '@reduxjs/toolkit'

import authSlice from '../slices/authSlice'
import bootcampsSlice from '../slices/bootcampsSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    bootcamps:  bootcampsSlice,
  },
})