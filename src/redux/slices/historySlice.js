import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { as } from "../../utils";

const initialState = [];

export const fetchHistory = createAsyncThunk(
  "history/fetch",
  async (arg, { getState }) => {
    try {
      const history = getState().history;
      const historyStorage = await as.getItem("history");
      if (!historyStorage) {
        await as.setItem("history", history);
        return history;
      }
      return historyStorage;
    } catch (error) {}
  }
);

export const add = createAsyncThunk(
  "history/add",
  async (data, { getState }) => {
    try {
      const history = getState().history;
      const newHistory = [...history, data];
      await as.updateObj("history", () => newHistory);
      return newHistory;
    } catch (error) {}
  }
);

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchHistory.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(add.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const historyReducer = historySlice.reducer;
