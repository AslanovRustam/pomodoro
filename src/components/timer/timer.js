import { useState } from "react";
import { NavLink } from "react-router-dom";
import s from "./timer.module.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Timer({ currentItem = false }) {
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);

  const localMinutes = window.localStorage.getItem("minutes");
  const parsedMinutes = JSON.parse(localMinutes);

  const [minutes, setMinutes] = useState(parsedMinutes ? parsedMinutes : 25);
  const [seconds, setSeconds] = useState(0);

  const [initialMin] = useState(parsedMinutes ? parsedMinutes : 25);
  const [initialSec] = useState(0);
  ////////////settings for break timer
  const localBreakMinutes = window.localStorage.getItem("break");
  const parsedBreakMinutes = JSON.parse(localBreakMinutes);
  const [breakMinutes, setBreakMinutes] = useState(
    parsedBreakMinutes ? parsedBreakMinutes : 5
  );
  const [initialBreakMin] = useState(
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

  const run = () => {
    if (updatedS === 0) {
      updatedM--;
      updatedS = 60;
    }
    if (updatedM === -1) {
      setStatus(3);
      clearInterval(interv);
      setMinutes(updatedBreakM);
      setBreakMinutes(minutes);
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
    setBreakMinutes(initialBreakMin);
  };

  const resume = () => start();

  return (
    <>
      <div className={s.timerSection}>
        {currentItem.checked ? (
          <>
            <h1 className={s.didIt}>Great job! You did it!</h1>
            <NavLink to="/pomodoro" exact>
              <button className={s.backBtn} type="button">
                Back to Home
              </button>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/addtask" exact className={s.timerBtnAdd}>
              Add Task
            </NavLink>
            <div className={s.timerCotainer}>
              {status === 3 ? <h1 className={s.didIt}>Well done!</h1> : ""}

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
                    <button className={s.timerBtn} onClick={stop}>
                      Stop
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
