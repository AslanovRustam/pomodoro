import { useState } from "react";

export default function Timer() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(5);

  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);

  const [initialMin, setInitialMin] = useState(20);
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
      setStatus(0);
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
    <div className="main-section">
      <div className="clock-holder">
        <div className="stopwatch">
          <div>
            <span>{minutes >= 10 ? minutes : "0" + minutes}:</span>
            <span>{seconds >= 10 ? seconds : "0" + seconds}</span>
          </div>
          <div>
            {status === 0 ? <button onClick={start}>Start</button> : ""}

            {status === 1 ? (
              <div>
                <button onClick={stop}>Stop</button>
                <button onClick={reset}>Reset</button>
              </div>
            ) : (
              ""
            )}

            {status === 2 ? (
              <div>
                <button onClick={resume}>Resume</button>
                <button onClick={reset}>Reset</button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// import { useState } from "react";

// export default function Timer() {
//   const [minutes, setMinutes] = useState(0);
//   const [seconds, setSeconds] = useState(0);

//   const [interv, setInterv] = useState();
//   const [status, setStatus] = useState(0);

//   const start = () => {
//     run();
//     setStatus(1);
//     setInterv(setInterval(run, 1000));
//   };

//   let updatedS = seconds;
//   let updatedM = minutes;

//   const run = () => {
//     if (updatedS === 60) {
//       updatedM++;
//       updatedS = 0;
//     }
//     updatedS++;
//     return setMinutes(updatedM), setSeconds(updatedS);
//   };

//   const stop = () => {
//     clearInterval(interv);
//     setStatus(2);
//   };

//   const reset = () => {
//     clearInterval(interv);
//     setStatus(0);
//     setMinutes(0);
//     setSeconds(0);
//   };

//   const resume = () => start();

//   return (
//     <div className="main-section">
//       <div className="clock-holder">
//         <div className="stopwatch">
//           <div>
//             <span>{minutes >= 10 ? minutes : "0" + minutes}:</span>
//             <span>{seconds >= 10 ? seconds : "0" + seconds}</span>
//           </div>
//           <div>
//             {status === 0 ? <button onClick={start}>Start</button> : ""}

//             {status === 1 ? (
//               <div>
//                 <button onClick={stop}>Stop</button>
//                 <button onClick={reset}>Reset</button>
//               </div>
//             ) : (
//               ""
//             )}

//             {status === 2 ? (
//               <div>
//                 <button onClick={resume}>Resume</button>
//                 <button onClick={reset}>Reset</button>
//               </div>
//             ) : (
//               ""
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
