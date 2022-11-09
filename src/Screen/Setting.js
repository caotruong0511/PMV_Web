import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setState } from "../redux/slices/settingSlice";
import { calculateTime } from "../HOF/Container";
import { add } from "../redux/slices/historySlice";
import ROSLIB from "roslib";
import { useNavigate } from "react-router-dom";

function SettingScreen({ navigation, route }) {
  const setting = useSelector((state) => state.setting);
  const app = useSelector((state) => state.app);
  const ros = useSelector((state) => state.ros.ros);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cmdVel = new ROSLIB.Topic({
    ros: ros,
    name: "/cmd_vel",
    messageType: "geometry_msgs/Twist",
  });

  return (
    <div>
      <div>
        <button
          onClick={() => {
            navigate("System");
          }}
        >
          System
        </button>
        <button
          textContent="Goal"
          onClick={() => {
            navigation.navigate("Goal");
          }}
        >
          Goal
        </button>
        <button
          textContent="Speed"
          onClick={() => {
            navigation.navigate("Speed");
          }}
        >
          Speed
        </button>
        <button
          onClick={() => {
            if (app.isConnected) {
              const mes =
                calculateTime() +
                ` ${setting.state === "Stop" ? "Stop" : "Start"}`;
              dispatch(add(mes));
              if (setting.state === "Start") {
                const twist = new ROSLIB.Message({
                  linear: {
                    x: setting.speed,
                    y: 0,
                    z: 0,
                  },
                  angular: {
                    x: setting.goal[0],
                    y: setting.goal[1],
                    z: 0,
                  },
                });
                cmdVel.publish(twist);
                dispatch(setState("Stop"));
              } else {
                const twist = new ROSLIB.Message({
                  linear: {
                    x: 0,
                    y: 0,
                    z: 0,
                  },
                  angular: {
                    x: 0,
                    y: 0,
                    z: 0,
                  },
                });
                cmdVel.publish(twist);
                dispatch(setState("Start"));
              }
            } else {
              alert("You need to connect.");
            }
          }}
        >
          {setting.state}
        </button>
      </div>
    </div>
  );
}

export default SettingScreen;
