import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import s from "./addtask.module.css";
// import Modal from "../modal/modal";
// import initialTasks from "../tasks.json";
import shortid from "shortid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TaskList() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [currentPost, setCurrentPost] = useState("");

  const localTasks = window.localStorage.getItem("tasks");
  const parsedTasks = JSON.parse(localTasks);
  console.log("currentPost", currentPost);
  const [tasks, setTasks] = useState(parsedTasks);
  window.localStorage.setItem("tasks", JSON.stringify(tasks));

  const notify = () =>
    toast.error("Please, fill in name and description of your new task", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const newTask = {
    id: shortid.generate(),
    name,
    description,
    checked: false,
  };

  const addTask = (task) => {
    if (name && description) {
      setTasks([task, ...tasks]);
      setName("");
      setDescription("");
      return;
    }

    notify();
  };

  return (
    <>
      <div className={s.taskListContainer}>
        <div className={s.addTaskContainer}>
          <div className={s.navContainer}>
            <NavLink to="/" exact>
              <button className={s.backBtn} type="button">
                Home
              </button>
            </NavLink>
            <NavLink to="/tasks" exact>
              <button className={s.forwardBtn} type="button">
                To all Tasks
              </button>
            </NavLink>
          </div>
          <form>
            <input
              className={s.input}
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              placeholder="Name"
            />
            <textarea
              className={s.textArea}
              rows="5"
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
              placeholder="Description"
            ></textarea>
          </form>
          <button
            className={s.buttonAdd}
            type="button"
            onClick={() => addTask(newTask)}
          >
            Add Task
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
