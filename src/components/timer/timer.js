import { useState } from "react";
import { NavLink } from "react-router-dom";
import s from "./timer.module.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Timer() {
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);

  const localMinutes = window.localStorage.getItem("minutes");
  const parsedMinutes = JSON.parse(localMinutes);

  const [minutes, setMinutes] = useState(parsedMinutes ? parsedMinutes : 25);
  const [seconds, setSeconds] = useState(0);

  const [initialMin, setInitialMin] = useState(
    parsedMinutes ? parsedMinutes : 25
  );
  const [initialSec, setInitialSec] = useState(0);
  ////////////settings for break timer
  const localBreakMinutes = window.localStorage.getItem("break");
  const parsedBreakMinutes = JSON.parse(localBreakMinutes);
  const [breakMinutes, setBreaMinutes] = useState(
    parsedBreakMinutes ? parsedBreakMinutes : 5
  );
  const [breakSeconds, setBreakSeconds] = useState(0);

  const [initialBreakMin, setInitialBreakMin] = useState(
    parsedBreakMinutes ? parsedBreakMinutes : 5
  );

  const start = () => {
    run();
    setStatus(1);
    setInterv(setInterval(run, 1000));
  };

  let updatedS = seconds;
  let updatedM = minutes;

  let updatedBreakM = breakMinutes;
  let updatedBreakS = breakSeconds;

  const run = () => {
    if (updatedS === 0) {
      updatedM--;
      updatedS = 60;
    }
    if (updatedM === -1) {
      setStatus(3);
      clearInterval(interv);
      // setMinutes(initialMin);
      setMinutes(0);

      return;
    }
    updatedS--;
    return setMinutes(updatedM), setSeconds(updatedS);
  };

  const BreakRun = () => {
    if (updatedBreakS === 0) {
      updatedBreakM--;
      updatedBreakS = 60;
    }
    if (updatedBreakM === -1) {
      setStatus(1);
      setBreaMinutes(initialBreakMin);
      // clearInterval(interv);
      return;
    }
    updatedBreakS--;
    return setBreaMinutes(updatedBreakM), setBreakSeconds(updatedBreakS);
  };

  const [breakInterv, setBreakInterv] = useState();

  const BreakStart = () => {
    BreakRun();
    // setStatus(1);
    setBreakInterv(setInterval(run, 1000));
  };

  const stop = () => {
    clearInterval(interv);
    // setInterv();

    setStatus(2);
  };

  const reset = () => {
    clearInterval(interv);
    setStatus(0);
    setMinutes(initialMin);
    setSeconds(initialSec);
  };

  const resume = () => start();

  return (
    <>
      {/* <div>
        <p>{`${breakMinutes}:${breakSeconds}`}</p>
        <button onClick={() => BreakStart()}>Start</button>
      </div> */}
      <div className={s.timerSection}>
        <NavLink to="/addtask" exact className={s.timerBtnAdd}>
          Add Task
        </NavLink>
        <div className={s.timerCotainer}>
          <div className={s.timerProgressContainer}>
            {status === 3 ? (
              <h1 className={s.didIt}>You did it! Take a little break</h1>
            ) : (
              ""
            )}
            <CircularProgressbar
              value={minutes}
              maxValue={initialMin}
              minValue={initialSec}
              counterClockwise={true}
              styles={buildStyles({
                rotation: 1,
                strokeLinecap: "butt",
                pathTransitionDuration: 0.5,
                pathColor: "#d6d6d6",
                textColor: "#f88",
                trailColor: `rgba(255, 136, 136)`,
                backgroundColor: "#3e98c7",
              })}
              text={`${minutes >= 10 ? minutes : "0" + minutes}:${
                seconds >= 10 ? seconds : "0" + seconds
              }`}
            />
          </div>
          <div className={s.timerBtnContainer}>
            {status === 0 ? (
              <div>
                <button className={s.timerBtn} onClick={start}>
                  Start
                </button>
              </div>
            ) : (
              ""
            )}

            {status === 1 ? (
              <div>
                <button className={s.timerBtn} onClick={stop}>
                  Stop
                </button>
                <button className={s.timerResetBtn} onClick={reset}>
                  Reset
                </button>
              </div>
            ) : (
              ""
            )}

            {status === 2 ? (
              <div>
                <button className={s.timerBtn} onClick={resume}>
                  Resume
                </button>
                <button className={s.timerResetBtn} onClick={reset}>
                  Reset
                </button>
              </div>
            ) : (
              ""
            )}
            {status === 3 ? (
              <div>
                {/* <button className={s.timerBtn} onClick={start}>
                  Start
                </button> */}
                <button className={s.timerResetBtn} onClick={reset}>
                  Reset
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}
