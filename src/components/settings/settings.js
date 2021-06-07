import React, { useState } from "react";
import s from "./settings.module.css";
import "react-toastify/dist/ReactToastify.css";

export default function Settings() {
  const localMinutes = window.localStorage.getItem("minutes");
  const parsedMinutes = JSON.parse(localMinutes);
  const [initialMin, setInitialMin] = useState(parsedMinutes);
  window.localStorage.setItem("minutes", JSON.stringify(initialMin));

  const handleSubmitForm = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleSubmitForm}>
        <label>
          Set your time up to 60 min
          <input onChange={(e) => setInitialMin(e.currentTarget.value)}></input>
        </label>
        <button type="submit">Set</button>
      </form>
    </>
  );
}
