import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSystem } from "../redux/slices/settingSlice";

function SystemScreen() {
  const system = useSelector((state) => state.setting.system);
  const [url, setUrl] = useState(system.url);
  const [h, setH] = useState(system.h);
  const [w, setW] = useState(system.w);
  const dispatch = useDispatch();

  const handleSaveSystem = () => {
    const newSystem = {
      ...system,
      url,
      h: Number(h),
      w: Number(w),
    };
    dispatch(setSystem(newSystem));
    alert("Saved success");
  };

  return (
    <div>
      <div>
        <input
          placeholder="Url"
          defaultValue={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />{" "}
        <br />
        <input
          placeholder="Height"
          defaultValue={`${h}`}
          onChange={(e) => {
            setH(e.target.value);
          }}
        />{" "}
        <br />
        <input
          placeholder="Width"
          defaultValue={`${w}`}
          onChange={(e) => {
            setW(e.target.value);
          }}
        />{" "}
        <br />
      </div>
      <div>
        <button onClick={handleSaveSystem}>Save</button>
      </div>
    </div>
  );
}

export default SystemScreen;
