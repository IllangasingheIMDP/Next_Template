"use client";

import { createSlice } from "@reduxjs/toolkit";

export interface UserState{
    username:string,
    email:string,
    role:string
}

const initialState:UserState = {
  username: "",
  email: "",
  role: "",
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.username = "";
      state.email = "";
      state.role = "";
    },
  },
});

export const {login,logout}=userSlice.actions;
export default userSlice.reducer;