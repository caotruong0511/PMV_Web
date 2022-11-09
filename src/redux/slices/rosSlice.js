import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ros: null,
};

const rosSlice = createSlice({
  name: "ros",
  initialState,
  reducers: {
    setRos(state, action) {
      return {
        ...state,
        ros: action.payload,
      };
    },
  },
});

export const rosReducer = rosSlice.reducer;
export const { setRos } = rosSlice.actions;
