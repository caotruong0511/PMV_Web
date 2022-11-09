import React, { useEffect, useMemo } from "react";
import { add } from "../redux/slices/historySlice";
import { useDispatch, useSelector } from "react-redux";
import { setConnect } from "../redux/slices/appSlice";
import ROSLIB from "roslib";
import { fetchSetting, setState } from "../redux/slices/settingSlice";
import { setRos } from "../redux/slices/rosSlice";
import { calculateTime } from "../HOF/Container.js";
import { useNavigate } from "react-router-dom";

function Homepage({ navigation, route }) {
  const dispatch = useDispatch();
  const app = useSelector((state) => state.app);
  const system = useSelector((state) => state.setting.system);
  const ros = useMemo(() => new ROSLIB.Ros(), []);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSetting());
    dispatch(setRos(ros));
  }, [dispatch, ros]);

  useEffect(() => {
    ros.on("connection", async function () {
      dispatch(setConnect(true));
      const mes = calculateTime() + " Connected";
      dispatch(add(mes));
    });

    ros.on("close", async function () {
      dispatch(setConnect(false));
      const mes = calculateTime() + " Disconnected";
      dispatch(add(mes));
      dispatch(setState("Start"));
    });

    ros.on("error", function (error) {
      alert(error.message);
    });
    return () => {
      ros.close();
    };
  }, [dispatch, ros]);

  return (
    <div>
      <div>
        <button
          onClick={() => {
            if (!system.url) {
              return alert("Please setup url in system");
            }
            if (app?.isConnected) {
              ros.close();
            } else {
              ros.connect(system.url);
            }
          }}
        >
          {app?.isConnected ? "Disconnect" : "Connect"}
        </button>
        <button
          onClick={() => {
            navigate("Setting");
          }}
        >
          Setting
        </button>
      </div>
      {/* <Container /> */}
    </div>
  );
}

export default Homepage;
