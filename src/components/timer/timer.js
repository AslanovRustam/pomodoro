import { useState } from "react";
import { NavLink } from "react-router-dom";
import s from "./timer.module.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Timer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);

  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);

  const [initialMin, setInitialMin] = useState(25);
  const [initialSec, setInitialSec] = useState(0);

  const start = () => {
    run();
    setStatus(1);
    setInterv(setInterval(run, 1000));
  };

  let updatedS = seconds;
  let updatedM = minutes;

  const run = () => {
    if (updatedS === 0) {
      updatedM--;
      updatedS = 60;
    }
    if (updatedM === -1) {
      setStatus(2);
      setMinutes(0);
      return;
    }
    updatedS--;
    return setMinutes(updatedM), setSeconds(updatedS);
  };

  const stop = () => {
    clearInterval(interv);
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
      <div className={s.timerSection}>
        <NavLink to="/addtask" exact className={s.timerBtnAdd}>
          Add Task
        </NavLink>
        <div className={s.timerCotainer}>
          <div className={s.timerProgressContainer}>
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
              text={`${minutes}:${seconds >= 10 ? seconds : "0" + seconds}`}
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
          </div>
        </div>
      </div>
    </>
  );
}
