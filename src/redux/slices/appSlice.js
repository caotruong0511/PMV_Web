import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConnected: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setConnect(state, action) {
      return {
        ...state,
        isConnected: action.payload,
      };
    },
  },
});

export const appReducer = appSlice.reducer;
export const { setConnect } = appSlice.actions;
