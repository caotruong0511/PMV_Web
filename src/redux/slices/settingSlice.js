import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { as } from "../../utils";

const initialState = {
  goal: [0, 0],
  speed: 10,
  state: "Start",
  system: {
    url: "ws://10.2.11.138:9090",
    h: 4,
    w: 4,
  },
};

export const fetchSetting = createAsyncThunk(
  "setting/fetch",
  async (arg, { getState }) => {
    try {
      const setting = getState().setting;
      const settingStorage = await as.getItem("setting");
      if (!settingStorage) {
        await as.setItem("setting", setting);
        return setting;
      }
      return settingStorage;
    } catch (error) {}
  }
);

export const setGoal = createAsyncThunk(
  "setting/setGoal",
  async (data, { getState }) => {
    try {
      const setting = getState().setting;
      const newSetting = {
        ...setting,
        goal: data,
      };
      await as.updateObj("setting", () => newSetting);
      return newSetting;
    } catch (error) {}
  }
);

export const setSpeed = createAsyncThunk(
  "setting/setSpeed",
  async (data, { getState }) => {
    try {
      const setting = getState().setting;
      const newSetting = {
        ...setting,
        speed: data,
      };
      await as.updateObj("setting", () => newSetting);
      return newSetting;
    } catch (error) {}
  }
);

export const setSystem = createAsyncThunk(
  "setting/setSystem",
  async (data, { getState }) => {
    try {
      const setting = getState().setting;
      const newSetting = {
        ...setting,
        system: data,
      };
      await as.updateObj("setting", () => newSetting);
      return newSetting;
    } catch (error) {}
  }
);

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setState(state, action) {
      return {
        ...state,
        state: action.payload,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchSetting.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(setGoal.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(setSpeed.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(setSystem.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const settingReducer = settingSlice.reducer;
export const { setState } = settingSlice.actions;
