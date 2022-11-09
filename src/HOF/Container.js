import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { SCREEN_WIDTH, SCREEN_HEIGHT } from "../const/constant";
import { fetchHistory } from "../redux/slices/historySlice";

export function calculateTime() {
  let now = new Date();
  let hour = now.getHours();
  let min = now.getMinutes();
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (min < 10) {
    min = "0" + min;
  }

  return hour + ":" + min;
}

export default function Container({ Component, ...rest }) {
  const timerRef = useRef();
  const [timeFormat, setTimeFormat] = useState(calculateTime());

  const history = useSelector((state) => state.history);
  console.log(history);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeFormat(calculateTime());
    }, 60000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div>
      <div
        style={{
          flex: 0.5,
        }}
      >
        <span>{timeFormat}</span>
      </div>
      <div
        style={{
          flex: 3.5,
        }}
      >
        <Component {...rest} />
      </div>
      <div>
        <div
          style={{ height: "100%" }}
          //   ref={divRef}
          //   nestedScrollEnabled={true}
          //   onContentSizeChange={(contentWidth, contentHeight) => {
          //     divRef.current?.scrollTo({y: contentHeight});
          //   }}
        >
          <span>Logging:</span>
          <div>
            {history.map((item, index) => (
              <div key={index}>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
