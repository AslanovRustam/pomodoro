import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Timer from "../timer/timer";
import s from "./task.module.css";

export default function Task() {
  const { taskid } = useParams();

  const localTasks = window.localStorage.getItem("tasks");
  const parsedTasks = JSON.parse(localTasks);
  const currentItem = parsedTasks.find((item) => item.id === taskid);

  const [tasks, setTasks] = useState(parsedTasks);
  window.localStorage.setItem("tasks", JSON.stringify(tasks));

  const toggleCompleted = (currentItem) => {
    setTasks(
      tasks.map((task) => {
        if (currentItem.id === task.id) {
          return (task = {
            id: task.id,
            name: currentItem.name,
            description: currentItem.description,
            checked: !currentItem.checked,
          });
        }
        return task;
      })
    );
  };

  return (
    <>
      <div className={s.taskTimeContainer}>
        <div className={s.taskInfoContainer}>
          <h1 className={s.taskName}>{currentItem.name}</h1>
          <span className={s.taskDescription}>{currentItem.description}</span>
        </div>
        <input
          className={s.checked}
          type="checkbox"
          checked={currentItem.checked}
          onChange={() => toggleCompleted(currentItem)}
        />
      </div>
      <Timer currentItem={currentItem} />
    </>
  );
}
