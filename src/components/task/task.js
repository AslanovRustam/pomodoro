import React from "react";
import { useParams } from "react-router-dom";
import Timer from "../timer/timer";
import s from "./task.module.css";

export default function Task() {
  const { taskid } = useParams();

  const localTasks = window.localStorage.getItem("tasks");
  const parsedTasks = JSON.parse(localTasks);
  const currentItem = parsedTasks.find((item) => item.id === taskid);
  return (
    <>
      <div className={s.taskTimeContainer}>
        <h1 className={s.taskName}>{currentItem.name}</h1>
        <span className={s.taskDescription}>{currentItem.description}</span>
      </div>
      <Timer />
    </>
  );
}

// import React, { useState } from "react";
// import s from "./task.module.css";

// export default function Task() {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");

//   const reset = () => {
//     setName("");
//     setDescription("");
//   };

//   const handleSubmitForm = (event) => {
//     event.preventDefault();
//     reset();
//   };

//   return (
//     <div className={s.taskContainer}>
//       <form className={s.formContainer} onSubmit={handleSubmitForm}>
//         <input
//           className={s.input}
//           type="text"
//           name="name"
//           value={name}
//           onChange={(e) => setName(e.currentTarget.value)}
//           placeholder="Name"
//         />
//         <textarea
//           className={s.textArea}
//           rows="5"
//           type="text"
//           name="description"
//           value={description}
//           onChange={(e) => setDescription(e.currentTarget.value)}
//           placeholder="Description"
//         ></textarea>
//         <button type="submit" className={s.buttonAdd}>
//           Add new task
//         </button>
//       </form>
//     </div>
//   );
// }
