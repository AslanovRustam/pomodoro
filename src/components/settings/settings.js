import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import s from "./settings.module.css";
import "react-toastify/dist/ReactToastify.css";

export default function Settings() {
  const localMinutes = window.localStorage.getItem("minutes");
  const parsedMinutes = JSON.parse(localMinutes);
  const [initialMin, setInitialMin] = useState(parsedMinutes);
  window.localStorage.setItem("minutes", JSON.stringify(initialMin));

  const localBreakMinutes = window.localStorage.getItem("break");
  const parsedBreakMinutes = JSON.parse(localBreakMinutes);

  const [initialBreakMin, setInitialBreakMin] = useState(parsedBreakMinutes);
  window.localStorage.setItem("break", JSON.stringify(initialBreakMin));

  const handleSubmitForm = (event) => {
    event.preventDefault();
    //   ^[1-9][0-9]*$
  };

  return (
    <>
      <form className={s.formContainer} onSubmit={handleSubmitForm}>
        <h1 className={s.settingsTitle}>
          Please, set a time for the task in minutes
        </h1>
        <input
          className={s.input}
          type="number"
          placeholder="Set your Task time"
          onChange={(e) => setInitialMin(e.currentTarget.value)}
        ></input>
        <h1 className={s.settingsTitle}>
          Please, set a break time before next task
        </h1>
        <input
          className={s.input}
          type="number"
          placeholder="Set your Break time"
          onChange={(e) => setInitialBreakMin(e.currentTarget.value)}
        ></input>
        <NavLink to="/" exact>
          <button className={s.setBtn} type="submit">
            Set
          </button>
        </NavLink>
      </form>
    </>
  );
}
