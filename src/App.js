import React from "react";
import { Route, Routes } from "react-router-dom";
import Homegape from "./Screen/homepage";
import SettingScreen from "./Screen/Setting";
import SystemScreen from "./Screen/System";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homegape />}></Route>
      <Route path="/Setting" element={<SettingScreen />}></Route>
      <Route path="/Setting/System" element={<SystemScreen />}></Route>
    </Routes>
  );
}

export default App;
