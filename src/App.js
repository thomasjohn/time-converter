import { useEffect, useState, useRef } from "react";
import { getZoneTimeString, getCurrentDate } from "./js/helper.js";
import Clock from "./components/Clock";

const LOCAL_TIME = "local time";
const ERROR_CLOCK_EXIST = "Clock already exist.";
const ERROR_WRONG_TIME = "Wrong time.";
const ERROR_WRONG_CALC_TIME = "Wrong calculated time.";

// main component
function App() {
  const [reRender, setReRender] = useState(0);
  const zoneRef = useRef();
  const data = useRef({
    clocks: [
      {
        zone: undefined,
        time: "",
      },
      {
        zone: "utc",
        time: "",
      },
    ],
    timeEditing: false,
    showCurrentTime: true,
    userTime: undefined,
  }).current;

  // timer
  const updateClocks = () => {
    let t;
    if (data.showCurrentTime) {
      // set current time
      t = new Date();
    } else {
      // set user time
      t = data.userTime;
    }
    data.clocks.forEach((item) => {
      try {
        const time = getZoneTimeString(t, item.zone);
        item.time = time;
      } catch (err) {}
    });
    setReRender((r) => r + 1);
  };
  const timer = () => {
    if (!data.timeEditing) {
      updateClocks();
    }
    setTimeout(timer, 1000);
  };

  // handlers
  const onTimeFocus = (e) => {
    data.timeEditing = true;
    data.oldTimeValue = e.target.value;
  };
  const onTimeChange = (e, idx) => {
    const newTime = e.target.value;
    data.clocks[idx].time = newTime;
    setReRender(reRender + 1);
  };
  const onTimeBlur = (e, idx) => {
    const timeValue = e.target.value;
    if (timeValue === data.oldTimeValue) return;
    const timeParts = timeValue.split(":");
    const h = timeParts[0];
    const m = timeParts[1];
    // mamy czas, musimy teraz
    try {
      const newTime = new Date();
      newTime.setHours(h);
      newTime.setMinutes(m);
      newTime.setSeconds(0);
      if (newTime.toString() === "Invalid Date") throw ERROR_WRONG_TIME;
      const currentDate = getCurrentDate(newTime, data.clocks[idx].zone);
      if (currentDate.toString() === "Invalid Date")
        throw ERROR_WRONG_CALC_TIME;
      data.userTime = currentDate;
      data.showCurrentTime = false;
      updateClocks();
    } catch (err) {}
    data.timeEditing = false;
  };

  const onShowCurrentTime = () => {
    data.showCurrentTime = true;
  };

  const onAddTimeZone = (e) => {
    const zone = zoneRef.current.value;
    if (data.clocks.find((item) => item.zone === zone)) {
      alert(ERROR_CLOCK_EXIST);
      return;
    }
    const time = "";
    data.clocks.push({
      zone,
      time,
    });
    zoneRef.current.value = "";
    setReRender(reRender + 1);
  };

  // effects
  useEffect(() => {
    timer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // render
  return (
    <div className="container-fluid mt-5">
      <h1>Time zones</h1>
      <div className="row mt-3">
        {data.clocks.map((item, idx) => (
          <div className="col col-sm-4 mt-3" key={"time-" + idx}>
            <Clock
              time={item.time}
              onTimeFocus={onTimeFocus}
              onTimeChange={(e) => {
                onTimeChange(e, idx);
              }}
              onTimeBlur={(e) => {
                onTimeBlur(e, idx);
              }}
              label={item.zone ?? LOCAL_TIME}
            />
          </div>
        ))}
      </div>
      {!data.showCurrentTime ? (
        <div className="row mt-3">
          <div className="col">
            <button
              className="btn btn-sm btn-secondary"
              onClick={onShowCurrentTime}
            >
              Show current time
            </button>
          </div>
        </div>
      ) : null}
      <hr />
      <h5>New time zone</h5>
      <div className="row mt-4">
        <div className="col col-sm-10">
          <input
            className="form-control"
            placeholder="timezone name"
            data-testid="id-new-clock"
            defaultValue="asia/jakarta"
            ref={zoneRef}
          ></input>
        </div>
        <div className="col col-sm-2 text-end">
          <button
            className="btn btn-secondary"
            onClick={onAddTimeZone}
            data-testid="id-add-zone"
          >
            Add
          </button>
        </div>
      </div>
      <div className="row mt-3">
        <small>Examples: "asia/jakarta", "australia/perth"</small>
      </div>
    </div>
  );
}

export default App;
