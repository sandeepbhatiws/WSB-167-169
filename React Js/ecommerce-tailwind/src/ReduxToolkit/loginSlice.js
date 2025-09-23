import { createSlice } from '@reduxjs/toolkit'

var userLogin = localStorage.getItem('userLogin');

const initialState = {
  value: userLogin ?? 0,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state) => {
      state.value = 1
      localStorage.setItem('userLogin',1)
    },
    logout: (state) => {
      state.value = 0
      localStorage.setItem('userLogin',0)
    },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = loginSlice.actions

export default loginSlice.reducer