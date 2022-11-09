import { combineReducers } from "@reduxjs/toolkit";
import { appReducer } from "./slices/appSlice";
import { historyReducer } from "./slices/historySlice";
import { rosReducer } from "./slices/rosSlice";
import { settingReducer } from "./slices/settingSlice";

const rootReducer = combineReducers({
  setting: settingReducer,

  history: historyReducer,
  app: appReducer,
  ros: rosReducer,
});

export default rootReducer;
