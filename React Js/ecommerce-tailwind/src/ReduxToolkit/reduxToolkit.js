import { configureStore } from '@reduxjs/toolkit'
import  cartSlice from './cartSlice'
import loginSlice from './loginSlice'

export const store = configureStore({
  reducer: {
    cart : cartSlice,
    login : loginSlice
  },
})