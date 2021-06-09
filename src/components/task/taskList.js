import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import s from "./task.module.css";
import Modal from "../modal/modal";
import initialTasks from "../tasks.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TaskList() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowmodal] = useState(false);
  const [currentPost, setCurrentPost] = useState("");

  const localTasks = window.localStorage.getItem("tasks");
  const parsedTasks = JSON.parse(localTasks);
  const [tasks, setTasks] = useState(
    parsedTasks === null ? initialTasks : parsedTasks
  );
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

  const toggleModal = (task) => {
    setShowmodal(!showModal);
    setCurrentPost(task);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
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

  const editTask = (updTask) => {
    setTasks(
      tasks.map((task) => {
        if (updTask.id === task.id) {
          return (task = {
            id: task.id,
            name: updTask.name,
            description: updTask.description,
          });
        }
        return task;
      })
    );

    setShowmodal(!showModal);
  };
  const toggleCompleted = (toggledTusk) => {
    setTasks(
      tasks.map((task) => {
        if (toggledTusk.id === task.id) {
          return (task = {
            id: task.id,
            name: task.name,
            description: task.description,
            checked: !task.checked,
          });
        }
        return task;
      })
    );
  };

  return (
    <>
      <div className={s.taskListContainer}>
        <div className={s.navBtn}>
          <NavLink to="/pomodoro" exact>
            <button className={s.backBtn} type="button">
              Back to Home
            </button>
          </NavLink>
          <NavLink to="/addtask" exact>
            <button className={s.backBtn} type="button">
              Add Task
            </button>
          </NavLink>
        </div>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className={s.taskContainer}>
              <div className={s.taskInfo}>
                <div>
                  <h1 className={s.taskName}>{task.name}</h1>
                  <span className={s.taskDescription}>{task.description}</span>
                </div>
                <div className={s.statusContainer}>
                  <input
                    className={s.checked}
                    type="checkbox"
                    checked={task.checked}
                    onChange={() => toggleCompleted(task)}
                  />
                  <Link to={`/tasks/${task.id}`} className={s.menuLink}>
                    <button className={s.startBtn} type="button">
                      Start
                    </button>
                  </Link>
                </div>
              </div>
              <button
                className={s.buttonEdit}
                type="button"
                onClick={() => toggleModal(task)}
              >
                Edit
              </button>
              <button
                className={s.buttonDelete}
                type="button"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      {showModal && (
        <Modal
          onClose={toggleModal}
          task={currentPost}
          editTask={editTask}
          addTask={addTask}
        />
      )}
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
